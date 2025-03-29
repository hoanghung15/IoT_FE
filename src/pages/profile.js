import React from "react";
import avt from "../assets/imgAvt.svg";

const profile = () => {
  return (
    <div>
      <div className="w-full px-[80px] flex justify-between mt-[40px]">
        <div className="w-[30%] text-center rounded-2xl bg-white px-[20px] py-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <img
            src={avt}
            alt="Profile avatar"
            className="w-[200px] mx-auto h-[200px] rounded-full"
          ></img>
          <p className="text-center font-semibold mt-[20px]">Hoàng Văn Hùng</p>
          <p className="text-[14px] text-[#717171]">
            HungHV.B21PT123@stu.ptit.edu.vn
          </p>
          <div className="w-[80%] flex rounded-[12px] mt-[40px] items-center px-[20px] mx-auto h-[48px] bg-[#0D6098]">
            <p className="text-white font-semibold text-start text-[14px]">
              Github
            </p>
          </div>
          <p className="pl-[50px] text-[14px] text-[#717171] mt-[10px] text-start">
            API Documents
          </p>
          <hr className="w-[80%] mx-auto mt-[10px]"></hr>
        </div>
        <div className="w-[70%] pl-[40px]">
          <div className="w-full px-[40px] py-[20px] rounded-2xl bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <p className="text-[#0C4D7D] font-bold">Github</p>
            <p className="text-[14px] mt-[12px] text-[#717171] ">
              https://www.pinterest.com/pin/705798572865549992/
            </p>
          </div>
          <div className="w-full px-[40px] py-[20px] rounded-2xl mt-[20px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <p className="text-[#0C4D7D] font-bold">API Documents</p>
            <div className="w-full h-[500px] bg-black mt-[12px]">
              <embed
                src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                width="100%"
                height="100%"
                type="application/pdf"
              ></embed>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
