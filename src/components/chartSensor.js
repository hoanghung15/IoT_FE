import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChartSensor = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Thay URL này bằng URL WebSocket của bạn
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Kết nối WebSocket thành công!");

        // Subscribe dữ liệu top 7
        stompClient.subscribe("/topic/sensor/top7", (message) => {
          // console.log("Nhận dữ liệu từ /topic/sensor/top7", message.body);
          const response = JSON.parse(message.body);

          if (response.data && Array.isArray(response.data)) {
            const chartData = response.data.map((item) => [
              item.timestamp,
              item.humidity,
              item.temperature,
              item.light,
            ]);

            // Thêm tiêu đề cột
            chartData.unshift(["Thời gian", "Độ ẩm", "Nhiệt độ", "Ánh sáng"]);

            setSensorData(chartData);
            drawChart(chartData);
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

  // Hàm vẽ biểu đồ
  const drawChart = (chartData) => {
    if (!chartData || chartData.length === 0) return;

    var data = window.google.visualization.arrayToDataTable(chartData);

    var options = {
      chart: {
        title: "Biểu đồ cảm biến",
        subtitle: "Dữ liệu cảm biến theo thời gian thực",
      },
      hAxis: {
        slantedText: true, // Xoay nhãn nếu cần để tránh trùng lặp
        slantedTextAngle: 45, // Góc xoay nhãn (điều chỉnh theo ý muốn)
        showTextEvery: 1, // Hiển thị tất cả các nhãn timestamp
      },
    };

    var chart = new window.google.charts.Bar(
      document.getElementById("columnchart_material")
    );
    chart.draw(data, window.google.charts.Bar.convertOptions(options));
  };

  useEffect(() => {
    const loadGoogleCharts = () => {
      window.google.charts.load("current", { packages: ["bar"] });
      window.google.charts.setOnLoadCallback(() => drawChart(sensorData));
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.async = true;
      script.onload = loadGoogleCharts;
      document.body.appendChild(script);
    } else {
      loadGoogleCharts();
    }
  }, [sensorData]);

  return (
    <div>
      <div className="w-[985px] mt-[20px] h-[450px] bg-white rounded-3xl px-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div
          className="w-full h-[420px] pt-[30px]"
          id="columnchart_material"
        ></div>
      </div>
    </div>
  );
};

export default ChartSensor;
