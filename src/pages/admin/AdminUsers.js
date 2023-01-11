import React, { useEffect, useState } from "react";
import MyMaterialTable from "../../components/MyMaterialTable";
import { getData, ADMIN_TOKEN } from "../.././utils/Storage";
import axios from "axios";
import { API_URL_ROOT } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import Loading from "../../components/Loading";
import NavBar from "../../components/admin/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import moment from "moment";

const manageData = (data) => {
  for (let i = 0; i < data.length; i++) {
    let date = moment(data[i].birthDate).seconds(0).milliseconds(0);
    data[i].birthDate = date._d.toDateString();
  }

  return data;
};

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL_ROOT}/api/customer`, {
        headers: {
          Authorization: getData(ADMIN_TOKEN),
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setData(manageData(res.data));
      })
      .catch((err) => {
        setLoading(false);
        navigate("/message?text=Failed to load&style=danger&next=/admin");
      });
  }, []);

  return (
    <div>
      <NavBar selectedTab="Users" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mt-3">
            <MyMaterialTable
              columns={[
                { title: "Name", field: "name" },
                { title: "Email", field: "email" },
                { title: "Gender", field: "gender" },
                { title: "Birth Date", field: "birthDate" },
                {
                  title: "State",
                  field: "state",
                  lookup: {
                    verified: "Verified",
                    unverified: "Unverified",
     
                  },
                },
              ]}
              data={data}
              actions={[
                {
                  icon: () =>
                    filter ? <FilterListOffIcon /> : <FilterListIcon />,
                  tooltip: "toggle filter",
                  isFreeAction: true,
                  onClick: (event, rowData) => setFilter(!filter),
                },
              ]}
              options={{
                grouping: true,
                sorting: true,
                filtering: filter,
                exportButton: true,
              }}
              title="All Users"
            />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
