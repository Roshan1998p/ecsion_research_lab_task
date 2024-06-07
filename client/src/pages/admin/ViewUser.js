import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/datatable";
import Loader from "../../components/loader";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users`
        );

        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? <Loader /> : ""}
      <h1>User Data</h1>
      <DataTable data={data} />
    </div>
  );
};

export default ViewUser;
