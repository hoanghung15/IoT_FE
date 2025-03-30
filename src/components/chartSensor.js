import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
            const chartData = response.data.map((item) => ({
              timestamp: item.timestamp,
              humidity: item.humidity,
              temperature: item.temperature,
              light: item.light,
            }));

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
    <div className="w-[1070px] mt-[20px] h-[450px] bg-white rounded-3xl px-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sensorData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="humidity" fill="#8884d8" name="Độ ẩm" />
          <Bar dataKey="temperature" fill="#82ca9d" name="Nhiệt độ" />
          <Bar dataKey="light" fill="#ffc658" name="Ánh sáng" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSensor;
