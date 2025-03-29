import React, { useEffect, useState } from "react";
import StatustOn from "../components/statustOn";
import StatustOff from "../components/statustOff";
import sortDirectionIcon from "../assets/sortFieldIcon.svg";
import Pagination from "../components/pagination";
import axios from "axios";

const Activity = () => {
  const [dataTable, setDataTable] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/history`, {
          params: {
            search,
            pageNo,
            pageSize,
            sortDirection,
          },
        });
        const data = response.data;
        setDataTable(data.result.data);
        setTotalPages(data.result.metaData.totalPages);
        setTotalItems(data.result.metaData.totalItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, pageNo, pageSize, sortDirection]);

  const toggleDirection = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div>
      <div className="w-full px-[80px] mt-[12px]">
        {/* sort and filter */}
        <div className="w-full mb-[4px]">
          <p className="text-[#0b4c7c] text-[14px] font-bold">
            Lọc và tìm kiếm
          </p>
          <div className="w-full flex justify-between items-center">
            <div className="w-[50%]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[60%] mt-2 h-[36px] rounded-[8px] mr-2 shadow-sm px-4"
              ></input>
              <button className="w-[80px] h-[36px] rounded-[8px] bg-[#dadada] shadow-sm text-[14px]">
                Tìm kiếm
              </button>
            </div>
            <div className="">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-[36px] rounded-[8px] shadow-sm px-[8px] w-[80px]"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
        </div>

        {/* data */}
        <div className="w-full overflow-y-auto px-[32px] py-[20px] bg-white rounded-[12px] shadow-md mt-[16px]">
          <table className="w-full">
            <thead>
              <tr className="text-[#414141] text-[13px]">
                <th className="w-[10%]">ID</th>
                <th className="w-[20%]">Mã thiết bị</th>
                <th className="w-[20%]">Thiết bị</th>
                <th className="w-[40%] pl-[50px] flex">
                  <div className="flex">
                    <p className="me-2">Thời gian</p>
                    <img
                      src={sortDirectionIcon}
                      onClick={toggleDirection}
                      alt="Độ ẩm"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                </th>
                <th className="w-[10%]">Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.length > 0 ? (
                dataTable.map((item) => (
                  <tr key={item.id} className="trInfor">
                    <td>{item.id}</td>
                    <td>{item.deviceCode}</td>
                    <td className="pl-5">{item.deviceName}</td>
                    <td>{item.timestamp}</td>
                    <td className="pl-[5px]">
                      {item.status === 1 ? <StatustOn /> : <StatustOff />}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          pageNo={pageNo}
          totalPages={totalPages}
          setPageNo={setPageNo}
          dataTableLength={dataTable.length}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
};

export default Activity;
