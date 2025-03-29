import React, { useEffect, useState } from "react";
import light from "../assets/mage_light-bulb.svg";
import "./App.css";
import axios from "axios";

const RemoteUI = () => {
  const [lightStatus1, setLightStatus1] = useState(0);
  const [lightStatus2, setLightStatus2] = useState(0);
  const [lightStatus3, setLightStatus3] = useState(0);
  const [lightStatus4, setLightStatus4] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/history/statusDevice`
        );

        const deviceData = response.data.result.data;
        deviceData.forEach((device) => {
          switch (device.deviceCode) {
            case "light1":
              setLightStatus1(device.status);
              break;
            case "light2":
              setLightStatus2(device.status);
              break;
            case "light3":
              setLightStatus3(device.status);
              break;
            case "light4":
              setLightStatus4(device.status);
              break;
            default:
              break;
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-[20px]">
      <div className="w-[385px] p-[32px] h-[450px] bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <p className="text-[#0b4c7c] text-[14px] font-bold">Điều khiển</p>

        <div className="w-full flex justify-between mt-[60px]">
          {/* Đèn 1 */}
          <div className="w-[151px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus1}
                    onChange={() => setLightStatus1(lightStatus1 === 1 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 1</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>

          {/* Đèn 2 */}
          <div className="w-[151px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus2 === 1}
                    onChange={() => setLightStatus2(lightStatus2 === 1 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 2</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>
        </div>

        <div className="w-full flex justify-between mt-[60px]">
          {/* Đèn 3 */}
          <div className="w-[151px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus3 === 1}
                    onChange={() => setLightStatus3(lightStatus3 === 1 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 3</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>

          {/* Đèn 4 */}
          <div className="w-[151px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus4 === 1}
                    onChange={() => setLightStatus4(lightStatus4 === 1 ? 0 : 1)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 4</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteUI;
