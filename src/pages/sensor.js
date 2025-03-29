import axios from "axios";
import React, { useEffect, useState } from "react";
import sortDirectionIcon from "../assets/sortFieldIcon.svg";
import Pagination from "../components/pagination";

const Sensor = () => {
  const [dataTable, setDataTable] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [searchField, setSearchField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/sensor`, {
          params: {
            pageNo: pageNo,
            pageSize: pageSize,
            search: search,
            searchField: searchField,
            sortDirection: sortDirection,
            sortField: sortField,
          },
        });
        const data = response.data;
        setDataTable(data.result.data);
        setTotalItems(data.result.metaData.totalItems);
        setTotalPages(data.result.metaData.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pageNo, pageSize, search, searchField, sortDirection, sortField]);

  const handleSort = (field) => {
    const newDirection =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    setSortField(field);
  };
  return (
    <div>
      <div className="w-full px-[80px] mt-[12px]">
        {/* search + filter */}
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
              />
              <button className="w-[80px] h-[36px] rounded-[8px] bg-[#dadada] me-4 shadow-sm text-[14px]">
                Tìm kiếm
              </button>
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="h-[36px] rounded-[8px] shadow-sm px-[8px] w-[120px]"
              >
                <option value="timestamp">Thời gian</option>
                <option value="temperature">Nhiệt độ</option>
                <option value="humidity">Độ ẩm</option>
                <option value="light">Ánh sáng</option>
              </select>
            </div>
            <div>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
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
          <table className="w-full h-full">
            <thead>
              <tr className="text-[#414141] text-[13px]">
                <th className="w-[10%]">ID</th>
                <th className="w-[20%]">
                  <div className="flex">
                    <p> Nhiệt độ (C)</p>
                    <img
                      src={sortDirectionIcon}
                      onClick={() => handleSort("temperature")}
                      alt="Sắp xếp"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                </th>
                <th className="w-[20%]">
                  <div className="flex">
                    <p> Độ ẩm (%)</p>
                    <img
                      src={sortDirectionIcon}
                      onClick={() => handleSort("humidity")}
                      alt="Sắp xếp"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                </th>
                <th className="w-[10%]">
                  <div className="flex">
                    <p> Ánh sáng (lux)</p>
                    <img
                      src={sortDirectionIcon}
                      onClick={() => handleSort("light")}
                      alt="Sắp xếp"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                </th>
                <th className="w-[20%] pl-[100px]">
                  <div className="flex">
                    <p className="me-2">Thời gian</p>
                    <img
                      src={sortDirectionIcon}
                      onClick={() => handleSort("timestamp")}
                      alt="Sắp xếp"
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTable.length > 0 ? (
                dataTable.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="pl-6">
                      <p className="text-[#E52020] font-semibold">
                        {item.temperature}
                      </p>
                    </td>
                    <td className="pl-6">
                      <p className="text-[#2F8ED4] font-semibold">
                        {item.humidity}
                      </p>
                    </td>
                    <td className="pl-10">
                      <p className="text-[#FBA518] font-semibold">
                        {item.light}
                      </p>
                    </td>
                    <td className="pl-[50px]">{item.timestamp}</td>
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
        {/* pagination */}
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

export default Sensor;
