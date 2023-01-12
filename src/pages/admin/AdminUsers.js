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
import moment from "moment";
import { validateEmail } from "../../utils/utils";

const manageData = (data) => {
  for (let i = 0; i < data.length; i++) {
    let date = moment(data[i].birthDate).seconds(0).milliseconds(0);
    data[i].birthDate = date._d.toDateString();
  }

  return data;
};

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

const EmailValidate = (value) => {
  let valid = true;
  if (value === null || value === undefined || value.trim() === "")
    valid = false;
  if (!valid)
    return {
      isValid: false,
      helperText: "this field is required",
    };

  if (!validateEmail(value))
    return {
      isValid: false,
      helperText: "pelase enter a valid email",
    };
  return true;
};

export default function AdminUsers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = getData(ADMIN_STATE) === "superadmin";

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
        setData(manageData(res.data));
      })
      .catch((err) => {
        setLoading(false);
        navigate("/message?text=Failed to load&style=danger&next=/admin");
      });
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
                {
                  title: "Name",
                  field: "name",
                  validate: (rowData) => myValidate(rowData.name),
                },
                {
                  title: "Email",
                  field: "email",
                  validate: (rowData) => EmailValidate(rowData.email),
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
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setData([...data, newData]);

                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...data];
                      console.log(oldData);
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData([...dataUpdate]);

                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setData([...dataDelete]);

                      resolve();
                    }, 1000);
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
