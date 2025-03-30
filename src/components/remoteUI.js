import React, { useEffect, useState } from "react";
import light from "../assets/mage_light-bulb.svg";
import "./App.css";
import axios from "axios";

const RemoteUI = () => {
  const [lightStatus1, setLightStatus1] = useState(0);
  const [lightStatus2, setLightStatus2] = useState(0);
  const [lightStatus3, setLightStatus3] = useState(0);
  const [lightStatus4, setLightStatus4] = useState(0);
  const [loadingLight, setLoadingLight] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/history/statusDevice`
        );

        const deviceData = response.data.result.data;
        deviceData.forEach((device) => {
          switch (device.deviceCode) {
            case "led1":
              setLightStatus1(device.status);
              break;
            case "led2":
              setLightStatus2(device.status);
              break;
            case "led3":
              setLightStatus3(device.status);
              break;
            case "led4":
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

  const getMessageResponse = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/mqtt/status`);
      const rawData = response.data;

      if (Array.isArray(rawData) && rawData.length > 0) {
        const parsedData = JSON.parse(rawData[0]);

        // Tasch JSON
        Object.entries(parsedData).forEach(([key, value]) => {
          const status = value === "ON_SUCCESS" ? 1 : 0;

          switch (key) {
            case "led1":
              setLightStatus1(status);
              break;
            case "led2":
              setLightStatus2(status);
              break;
            case "led3":
              setLightStatus3(status);
              break;
            case "led4":
              setLightStatus4(status);
              break;
            default:
              break;
          }
          updateDBActivity(key, "DEN", status);
        });
      }

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handToggleLight = async (lightKey, status) => {
    const newStatus = status === 1 ? 0 : 1;
    const message = JSON.stringify({ [lightKey]: newStatus });

    // Set loading state to true for specific light
    setLoadingLight(lightKey);

    try {
      const response = await axios.post(
        `http://localhost:8080/mqtt/publish`,
        null,
        {
          params: { message },
        }
      );
      console.log(response);

      setTimeout(async () => {
        await getMessageResponse();
        setLoadingLight(null);
      }, 1000);
    } catch (e) {
      console.log(e);
      setLoadingLight(null);
    }

    console.log(message);
  };

  const updateDBActivity = async (lightKey, deviceName, status) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/history/putActivity`,
        null,
        {
          params: {
            deviceCode: lightKey,
            deviceName: deviceName,
            status: status,
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-[20px]">
      <div className="w-[350px] p-[32px] h-[450px] bg-white rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <p className="text-[#0b4c7c] text-[14px] font-bold">Điều khiển</p>

        <div className="w-full flex justify-between mt-[60px]">
          {/* Đèn 1 */}
          <div className="w-[130px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus1}
                    onChange={() => handToggleLight("led1", lightStatus1)}
                    disabled={loadingLight === "led1"} // Disable switch while loading
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {loadingLight === "led1" && <div className="spinner"></div>}{" "}
              {/* Show spinner for specific light */}
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 1</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>

          {/* Đèn 2 */}
          <div className="w-[130px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus2}
                    onChange={() => handToggleLight("led2", lightStatus2)}
                    disabled={loadingLight === "led2"} // Disable switch while loading
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {loadingLight === "led2" && <div className="spinner"></div>}{" "}
              {/* Show spinner for specific light */}
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 2</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>
        </div>

        <div className="w-full flex justify-between mt-[60px]">
          {/* Đèn 3 */}
          <div className="w-[130px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus3}
                    onChange={() => handToggleLight("led3", lightStatus3)}
                    disabled={loadingLight === "led3"} // Disable switch while loading
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {loadingLight === "led3" && <div className="spinner"></div>}{" "}
              {/* Show spinner for specific light */}
            </div>
            <p className="text-black text-xs font-bold mt-[10px]">Đèn 3</p>
            <p className="text-[#b5b5b5] text-[10px]">Position</p>
          </div>

          {/* Đèn 4 */}
          <div className="w-[130px] px-[20px] h-[100px] bg-[#f7f7f7] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between mt-[12px]">
              <img src={light} alt="Light" />
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={lightStatus4}
                    onChange={() => handToggleLight("led4", lightStatus4)}
                    disabled={loadingLight === "led4"} // Disable switch while loading
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {loadingLight === "led4" && <div className="spinner"></div>}{" "}
              {/* Show spinner for specific light */}
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
