import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_NUMBER_FROM_SEARCH, GET_NUMBERS } from "../../../../../graphql/query/number";
import { numberColumn } from "../../../../common/components/customtable/column";
import CustomTable from "../../../../common/components/customtable";
import { BiExport } from "react-icons/bi";

const NumberList = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const [searchParams, setSearchParams] = useState({
    phone: '',
  });
  const itemsPerPage = 5;
  const column = numberColumn(navigate, pagination, itemsPerPage);

  const { data: userList, loading: fetchNumberList, error: fetchUserError, refetch: userRefetch } = useQuery(
    searchParams.phone && searchParams.phone.trim() !== "" ? GET_NUMBER_FROM_SEARCH : GET_NUMBERS, {
    variables: {
      phone: searchParams.phone && searchParams.phone.trim() !== "" ? `%${searchParams.phone}%` : null,
    },
  });

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const tableData = userList ? userList.luckydraw_numbers : [];

  const exportCsv = (tableData) => {
    if(!tableData || tableData.length === 0){
      console.log("No table data")
      return;  
    }

    const filteredData = tableData.map(luckynumber => ({
     phone: luckynumber.phone,
     number:luckynumber.number,
      created_at: luckynumber.created_at,
    }));
    const headers = Object.keys(filteredData[0]);
    const csvRows = [
      headers.join(','),
      ...filteredData.map(row =>
        headers.map(header => JSON.stringify(row[header] || '')).join(',')
      )
    ];
    const csvString = csvRows.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'card_transactions.csv');
    a.click();
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <div className="min-h-10 flex flex-row justify-between gap-1">
        <input
          name="phone"
          value={searchParams.phone}
          onChange={handleSearchChange}
          className="w-[17rem] h-full p-3 text border border-gray-400 rounded"
          type="text"
          placeholder="Search by phone number"
        />
        <button
          onClick={() => exportCsv(tableData)}
          className="min-w-4 h-full rounded font-bold text-sm hover:cursor-pointer bg-secondary text-white flex flex-row items-center gap-2">
         <div>export</div><BiExport size={20}/>
        </button>
      </div>
      <div className="w-full">
        <CustomTable
          column={column}
          tableData={tableData}
          setPaginationProps={setPagination}
        />
      </div>
    </div>
  );
};
export default NumberList;
