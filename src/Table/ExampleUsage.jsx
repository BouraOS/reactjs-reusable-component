import React, { useState, useEffect } from "react";
import Table from "./Table";
import api from "./your-api-service"; // Your API service

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const ParentComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  // Fetch data when pagination changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.getData({
          page: pagination.pageIndex + 1, // API might use 1-based index
          pageSize: pagination.pageSize,
        });

        setTableData(response.data);
        setPageCount(Math.ceil(response.total / pagination.pageSize));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  // Implement your CRUD handlers
  const handleAdd = () => {
    /* ... */
  };
  const handleEdit = (rowData) => {
    /* ... */
  };
  const handleDelete = (id) => {
    /* ... */
  };

  return (
    <Table
      columns={columns}
      data={tableData}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      totalItems={tableData.length}
      loading={loading}
    />
  );
};

export default ParentComponent;
