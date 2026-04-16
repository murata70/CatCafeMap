import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// --- Leafletのアイコンバグ修正 兼 カスタムアイコン（肉球）設定 ---
import L from 'leaflet';

// publicフォルダに入れた「肉球.png」を読み込みます
let catPawIcon = L.icon({
    iconUrl: '/肉球.png',      // 保存したファイル名
    iconSize: [35, 35],       // 肉球の大きさ
    iconAnchor: [17, 17],     // 画像の中心を地点に合わせる
    popupAnchor: [0, -15]     // ポップアップが出る位置を調整
});

// デフォルトのアイコンとして設定
L.Marker.prototype.options.icon = catPawIcon;
// ----------------------------------------------------

import cafeData from "./cafes.json"; // 作成したデータを読み込む

function App() {
  // 地図の初期位置（大阪駅付近：緯度34.70, 経度135.50）
  const position = [34.7024, 135.4959];

  // Google Mapsでルートを開く関数
  const openRoute = (lat, lng) => {
    // 目的地を指定してGoogle Mapsのルート検索を開くURL
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* タイトルバー */}
      <div style={{
        position: "absolute", 
        top: "10px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "8px 15px",     // 上下左右の余白を少しスリムに
        borderRadius: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        pointerEvents: "none",
        width: "auto",            // 幅は中身に合わせる
        maxWidth: "90%",          // 画面からはみ出さない最大幅
        textAlign: "center"
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "16px",       // 文字サイズを少し小さく
          color: "#ff9900",
          whiteSpace: "nowrap",   // ★改行を禁止して1行にする
          overflow: "hidden",     // 万が一はみ出しても隠す
          textOverflow: "ellipsis" // 万が一はみ出したら「...」にする
        }}>
          🐾 cat cafe map 🐾
        </h1>
      </div>
      
      {/* 地図コンテナ */}
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        {/* Voyagerデザインの地図タイル */}
        <TileLayer
          attribution='© <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* JSONデータから肉球ピンを自動生成 */}
        {cafeData.map((cafe) => (
          <Marker key={cafe.id} position={[cafe.lat, cafe.lng]}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ margin: "0 0 5px 0" }}>{cafe.name}</h3>
                <p style={{ fontSize: "12px", margin: "5px 0" }}>{cafe.address}</p>
                <button 
                  onClick={() => openRoute(cafe.lat, cafe.lng)}
                  style={{
                    backgroundColor: "#ff9900",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "5px",
                    fontWeight: "bold"
                  }}
                >
                  ここへ行く
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;