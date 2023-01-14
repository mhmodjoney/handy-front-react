import React, { useEffect, useState } from "react";
import MyMaterialTable from "../../components/MyMaterialTable";
import { getData, ADMIN_TOKEN, ADMIN_STATE } from "../.././utils/Storage";
import axios from "axios";
import { API_URL_ROOT } from "../../data/constants";
import { Navigate, useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import Loading from "../../components/Loading";
import NavBar from "../../components/admin/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { ParseDate } from "../../utils/utils";
import moment from "moment";
const myValidate = (value) => {
  let valid = true;
  if (value === null || value === undefined || value.trim() === "")
    valid = false;
  return valid
    ? true
    : {
        isValid: false,
        helperText: "this field is required",
      };
};

const manageData = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].order = i + 1;
    let date = moment(data[i].birthDate).seconds(0).milliseconds(0);
    data[i].birthDate = ParseDate(date);
  }

  return data;
};

export default function AdminUsers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = getData(ADMIN_STATE) === "superadmin";

  const loadData = () => {
    setLoading(true);
    axios
      .get(`${API_URL_ROOT}/api/customer`, {
        headers: {
          Authorization: getData(ADMIN_TOKEN),
        },
      })
      .then((res) => {
        setLoading(false);
        setData(manageData(res.data));
      })
      .catch((err) => {
        setLoading(false);
        navigate("/message?text=Failed to load&style=danger&next=/admin");
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!isSuperAdmin)
    return (
      <Navigate to="/message?text=You dont have access to thiss page&style=danger&next=/admin" />
    );

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
                { title: "Order", field: "order", editable: "Never" },
                {
                  title: "Name",
                  field: "name",
                  validate: (rowData) => myValidate(rowData.name),
                },
                {
                  title: "Email",
                  field: "email",
                  editable: false,
                },
                {
                  title: "Gender",
                  field: "gender",
                  lookup: {
                    male: "Male",
                    female: "Female",
                  },
                  validate: (rowData) => myValidate(rowData.gender),
                },
                {
                  title: "Birth Date",
                  field: "birthDate",
                  validate: (rowData) => myValidate(rowData.birthDate),
                },
                {
                  title: "State",
                  field: "state",
                  lookup: {
                    verified: "Verified",
                    unverified: "Unverified",
                  },
                  validate: (rowData) => myValidate(rowData.state),
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
              editable={{
                onRowUpdate: (newData, oldData) =>
                  axios
                    .put(
                      `${API_URL_ROOT}/api/AdminUtilities/customer`,
                      newData,
                      {
                        headers: {
                          Authorization: getData(ADMIN_TOKEN),
                        },
                      }
                    )
                    .then((res) => {
                      loadData();
                    })
                    .catch((err) => {
                      navigate(
                        "/message?text=Unknown error happened&style=danger&next=/admin/users"
                      );
                    }),
                onRowDelete: (oldData) =>
                  axios
                    .delete(
                      `${API_URL_ROOT}/api/AdminUtilities/customer${oldData.id}`,
                      {
                        headers: {
                          Authorization: getData(ADMIN_TOKEN),
                        },
                      }
                    )
                    .then((res) => {
                      loadData();
                    })
                    .catch((err) => {
                      navigate(
                        "/message?text=Unknown error happened&style=danger&next=/admin/users"
                      );
                    }),
              }}
              options={{
                grouping: true,
                sorting: true,
                filtering: filter,
                exportButton: true,
                exportAllData: true,
                paginationType: "stepped",
                columnsButton: true,
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
