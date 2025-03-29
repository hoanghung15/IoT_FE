import React from "react";
import SensorRealTime from "../components/sensorRealtime";
import ChartSensor from "../components/chartSensor";
import RemoteUI from "../components/remoteUI";

const dashboard = () => {
  return (
    <div className="w-full px-[80px]">
      <SensorRealTime />
      <div className="flex justify-between mt-[8px]">
        <ChartSensor />
        <RemoteUI />
      </div>
    </div>
  );
};

export default dashboard;
