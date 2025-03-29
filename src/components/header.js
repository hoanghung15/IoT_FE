import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Lấy route hiện tại

  const links = [
    { path: "/", label: "Trang chủ", left: 0 },
    { path: "/activity", label: "Hoạt động", left: 125 },
    { path: "/sensor", label: "Cảm biến", left: 250 },
    { path: "/profile", label: "Profile", left: 367 },
  ];

  // Xác định vị trí của highlight (ô đen)
  const activeLink = links.find((link) => link.path === location.pathname);
  const activeLeft = activeLink ? activeLink.left : 27; // Mặc định về "Trang chủ"

  return (
    <div className="w-full h-[65px] flex justify-center items-center text-[14px] ">
      <div className="relative w-[492px] h-[50px] flex items-center bg-[#ededed] rounded-[26px] shadow-md">
        {/* Highlight (ô màu đen) */}
        <div
          className="absolute top-1/2 left-0 w-[123px] h-[50px] bg-black rounded-[26px] transition-all duration-300 -translate-y-1/2"
          style={{ left: `${activeLeft}px` }}
        ></div>

        {/* Các Link điều hướng */}
        {links.map(({ path, label, left }) => (
          <Link
            key={path}
            to={path}
            className={`absolute top-1/2 w-[123px] text-[14px] text-center text-sm font-bold transition-all duration-300 -translate-y-1/2 ${
              location.pathname === path ? "text-white" : "text-black"
            }`}
            style={{ left: `${left}px` }}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
