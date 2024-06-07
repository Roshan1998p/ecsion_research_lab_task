import React from "react";
import "./index.css";

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
