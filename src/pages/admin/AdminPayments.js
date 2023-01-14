import React, { useEffect, useState } from "react";
import MyMaterialTable from "../../components/MyMaterialTable";
import { ADMIN_TOKEN, getData } from "../.././utils/Storage";
import axios from "axios";
import { API_URL_ROOT } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ProductDialog from "../../components/ProductDialog";
import Loading from "../../components/Loading";
import NavBar from "../../components/admin/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ParseDate } from "../../utils/utils";

const manageData = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].order = i + 1;
    data[i].amount /= 100;
    data[i].total_amount = data[i].amount * data[i].quantity;
    data[i].amount = `${data[i].amount}$`;
    data[i].total_amount = `${data[i].total_amount}$`;
    data[i].username = data[i].customer.name;
    data[i].email = data[i].customer.email;

    let date = moment(data[i].date).seconds(0).milliseconds(0);
    data[i].date = ParseDate(date);
    data[i].time = date._d.toLocaleTimeString();
  }

  return data;
};

export default function AdminPayments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (value) => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL_ROOT}/api/AdminUtilities/payment_info`, {
        headers: {
          Authorization: getData(ADMIN_TOKEN),
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setData(manageData(res.data));
      })
      .catch((err) => {
        setLoading(false);
        navigate("/message?text=Failed to load&style=danger&next=/");
      });
  }, []);

  return (
    <div>
      <NavBar selectedTab="Payments" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mt-3">
            <FormControlLabel
              className="align-self-start"
              control={
                <Checkbox
                  value={showOrder}
                  onChange={() => {
                    setShowOrder(!showOrder);
                  }}
                />
              }
              label="Show order"
            />

            <MyMaterialTable
              columns={[
                {
                  title: "Order",
                  field: "order",
                  editable: "Never",
                  hidden: !showOrder,
                },
                { title: "User Name", field: "username" },
                { title: "Email", field: "email" },
                { title: "Name", field: "name" },
                { title: "Description", field: "description" },
                { title: "Date", field: "date" },
                { title: "Time", field: "time" },
                { title: "Quantity", field: "quantity" },
                {
                  title: "Price",
                  field: "amount",
                  type: "numeric",
                },
                {
                  title: "Total Price",
                  field: "total_amount",
                  type: "numeric",
                },
                {
                  title: "Type",
                  field: "type",
                  hiddenByColumnsButton: true,
                  lookup: {
                    product: "Product",
                    bill: "Bill",
                    transfer: "Money Transfer",
                  },
                },
                {
                  title: "State",
                  field: "state",
                  lookup: {
                    "payment_intent.succeeded": "Succeeded",
                    unknown: "Failed",
                  },
                  render: (rowData) => {
                    return rowData.state === "payment_intent.succeeded" ||
                      rowData === "Succeeded" ? (
                      <CheckCircleIcon className="text-success" />
                    ) : (
                      <CancelIcon className="text-danger" />
                    );
                  },
                },
              ]}
              data={data}
              actions={[
                (rowData) => ({
                  icon: () => <PreviewIcon />,
                  hidden: rowData.type !== "product",
                  tooltip: "show product",
                  onClick: (event, rowData) => {
                    setProductId(rowData.product_id);
                    handleClickOpen();
                  },
                }),

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
                exportAllData: true,
                paginationType: "stepped",
                columnsButton: true,
              }}
              title="All Payments"
            />
          </div>
          {dialogOpen ? (
            <ProductDialog
              open={dialogOpen}
              handleClose={handleClose}
              productId={productId}
            />
          ) : null}
          <Footer />
        </>
      )}
    </div>
  );
}
