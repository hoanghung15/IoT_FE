import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartSensor = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Kết nối WebSocket thành công!");

        stompClient.subscribe("/topic/sensor/top7", (message) => {
          const response = JSON.parse(message.body);

          if (response.data && Array.isArray(response.data)) {
            const chartData = response.data
              .map((item) => ({
                timestamp: item.timestamp,
                humidity: item.humidity,
                temperature: item.temperature,
                light: item.light,
              }))
              .reverse();

            setSensorData(chartData);
          }
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
    <div className="w-[1070px] pt-[20px] mt-[20px] h-[450px] bg-white rounded-3xl  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sensorData} margin={{ top: 40, right: 10, left: 10 }}>
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={0}
            textAnchor="middle"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="humidity" fill="#2F8ED4" name="Độ ẩm" />
          <Bar dataKey="temperature" fill="#E52020" name="Nhiệt độ" />
          <Bar dataKey="light" fill="#FBA518" name="Ánh sáng" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSensor;
