
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import { FaRegEdit } from "react-icons/fa";

const columnHelper = createColumnHelper();
export const userColumn = (navigate,pagination, itemsPerPage) => [
    columnHelper.accessor("id", {
      cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
      header: () => <span className="">No</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span className="">Name</span>,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span className="column-head">Phone No</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
          onClick={() => {
            navigate(
              `/dashboard/user/${info.getValue()}`
            );
          }}
        >
          <p>Detail</p> <FaRegEdit />
        </button>
      ),
      header: () => <span className="column-head"></span>,
    }),
  ];