import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import MyMaterialTable from "../components/MyMaterialTable";
import { getData, TOKEN } from ".././utils/Storage";
import axios from "axios";
import { API_URL_ROOT } from "../data/constants";
import { useNavigate } from "react-router-dom";

export default function PaymentHistory() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `${API_URL_ROOT}/api/Pyament_info`,
        {},
        {
          headers: {
            Authorization: getData(TOKEN),
          },
        }
      )
      .then((res) => {
        console.log(res)
      })
      .catch(() => {
        navigate("/message?text=Failed to load&style=danger&next=/")
      });
  }, []);

  return (
    <div>
      <NavBar selectedTab="Payment History" />
      <div className="container mt-2">
        <MyMaterialTable
          columns={[
            { title: "Name", field: "name" },
            { title: "Description", field: "description" },
            { title: "Date", field: "date", type: "date" },
            {
              title: "Amount",
              field: "amount",
            },
          ]}
          data={data}
          title="Payment History"
        />
      </div>
      <Footer />
    </div>
  );
}
