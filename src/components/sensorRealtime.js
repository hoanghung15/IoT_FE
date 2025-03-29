import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import iconTemp from "../assets/iconTemp.svg";
import iconHumi from "../assets/iconHumi.svg";
import iconLight from "../assets/iconLight.svg";
import iconTime from "../assets/iconTime.svg";

const SensorRealtime = () => {
  const [sensorData, setSensorData] = useState({
    temperature: "--",
    humidity: "--",
    light: "--",
    timestamp: "--",
  });

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Kết nối WebSocket thành công!");

        // Sub dữ liệu mới nhất
        stompClient.subscribe("/topic/sensor/latest", (message) => {
          // console.log(message);
          const data = JSON.parse(message.body);
          setSensorData({
            temperature: data.temperature || "--",
            humidity: data.humidity || "--",
            light: data.light || "--",
            timestamp: data.timestamp || "--",
          });
        });
      },
      onStompError: (error) => {
        console.error("Lỗi STOMP: ", error);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log("Đã ngắt kết nối WebSocket!");
    };
  }, []);

  return (
    <div className="mt-[20px]">
      <div className="w-full flex items-center">
        <div className="custom-shadow px-[20px] py-[10px] w-full h-[120px] bg-[#f9f9f9] rounded-[12px] shadow-lg">
          <p className="text-[#0b4c7c] text-[12px] font-bold">Cảm biến</p>
          <div className="w-full flex justify-between mt-[4px]">
            {/* Nhiệt độ */}
            <div
              className="w-[270px] mt-[12px] px-[32px] h-[60px] bg-[#f4f4f4] rounded-[18px] flex justify-between items-center"
              style={{
                boxShadow:
                  "inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -4px 0px rgba(255,255,255,1)",
              }}
            >
              <div className="text-[#E52020]">
                <p className="text-[12px] mt-[4px] font-semibold">Nhiệt độ:</p>
                <p className="text-[#e52020] text-[18px] font-bold">
                  {sensorData.temperature} °C
                </p>
              </div>
              <img
                src={iconTemp}
                alt="Nhiệt độ"
                className="w-[36px] h-[36px]"
              />
            </div>

            {/* Độ ẩm */}
            <div
              className="w-[270px] mt-[12px] px-[32px] h-[60px] bg-[#f4f4f4] rounded-[18px] flex justify-between items-center"
              style={{
                boxShadow:
                  "inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -4px 0px rgba(255,255,255,1)",
              }}
            >
              <div className="text-[#2F8ED4]">
                <p className="text-[12px] mt-[4px] font-semibold">Độ ẩm:</p>
                <p className="text-[20px] font-bold">{sensorData.humidity} %</p>
              </div>
              <img src={iconHumi} alt="Độ ẩm" className="w-[36px] h-[36px]" />
            </div>

            {/* Ánh sáng */}
            <div
              className="w-[270px] mt-[12px] px-[32px] h-[60px] bg-[#f4f4f4] rounded-[18px] flex justify-between items-center"
              style={{
                boxShadow:
                  "inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -4px 0px rgba(255,255,255,1)",
              }}
            >
              <div className="text-[#FBA518]">
                <p className="text-[12px] mt-[4px] font-semibold">Ánh sáng:</p>
                <p className="text-[20px] font-bold">{sensorData.light} cd</p>
              </div>
              <img
                src={iconLight}
                alt="Ánh sáng"
                className="w-[36px] h-[36px]"
              />
            </div>

            {/* Thời gian */}
            <div
              className="w-[366px] mt-[12px] px-[32px] h-[60px] bg-[#f4f4f4] rounded-[18px] flex justify-between items-center"
              style={{
                boxShadow:
                  "inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -4px 0px rgba(255, 255, 255, 1)",
              }}
            >
              <div className="text-[#0C4D7D] w-[60%]">
                <p className="text-[12px] mt-[4px] font-semibold">Thời gian:</p>
                <p className="text-[18px] font-bold">{sensorData.timestamp}</p>
              </div>
              <img
                src={iconTime}
                alt="Thời gian"
                className="w-[36px] h-[36px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorRealtime;
