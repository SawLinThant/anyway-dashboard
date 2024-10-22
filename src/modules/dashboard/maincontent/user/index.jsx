import { useQuery } from "@apollo/client";
import { GET_DATA, GET_DATA_FROM_SEARCH } from "../../../../graphql/query/survey";
import CustomTable from "../../../common/components/customtable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userColumn } from "../../../common/components/customtable/column";

const UserList = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const [searchParams, setSearchParams] = useState({
    name: '',
  });
  const itemsPerPage = 5;
  const column = userColumn(navigate, pagination, itemsPerPage);

  const { data: userList, loading: fetchUserList, error: fetchUserError, refetch: userRefetch } = useQuery(
    searchParams.name && searchParams.name.trim() !== "" ? GET_DATA_FROM_SEARCH : GET_DATA, {
    variables: {
      name: searchParams.name && searchParams.name.trim() !== "" ? `%${searchParams.name}%` : null,
    },
  });

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const tableData = userList ? userList.survey_data : [];

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <div className="min-h-10 flex flex-row gap-1">
        <input
          name="name"
          value={searchParams.name}
          onChange={handleSearchChange}
          className="w-[17rem] h-full p-3 text border border-gray-400 rounded"
          type="text"
          placeholder="Search by name"
        />
        {/* <button
          onClick={handleSearch}
          className="min-w-16 h-full rounded bg-secondary text-white">
          Search
        </button> */}
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
export default UserList;
