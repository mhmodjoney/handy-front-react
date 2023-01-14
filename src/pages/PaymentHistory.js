import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import MyMaterialTable from "../components/MyMaterialTable";
import { getData, TOKEN } from ".././utils/Storage";
import axios from "axios";
import { API_URL_ROOT } from "../data/constants";
import { useNavigate } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ProductDialog from "../components/ProductDialog";
import Loading from "../components/Loading";
import { ParseDate } from "../utils/utils";

const manageData = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].order = i + 1;
    data[i].amount /= 100;
    data[i].total_amount = data[i].amount * data[i].quantity;
    data[i].amount = `${data[i].amount}$`;
    data[i].total_amount = `${data[i].total_amount}$`;
    let date = moment(data[i].date).seconds(0).milliseconds(0);
    data[i].time = date._d.toLocaleTimeString();
    data[i].date = ParseDate(date);
  }

  return data;
};

export default function PaymentHistory() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (value) => {
    setDialogOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL_ROOT}/api/Pyament_info`, {
        headers: {
          Authorization: getData(TOKEN),
        },
      })
      .then((res) => {
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
      <NavBar selectedTab="Payment History" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container mt-3">
            <MyMaterialTable
              columns={[
                { title: "Order", field: "order", editable: "Never" },
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
              title="Payment History"
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
