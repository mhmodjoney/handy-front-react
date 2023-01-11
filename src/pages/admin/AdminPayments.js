import React, { useEffect, useState } from "react";
import MyMaterialTable from "../../components/MyMaterialTable";
import { getData, TOKEN } from "../.././utils/Storage";
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

export default function AdminPayments() {
  return (
    <div>
      <NavBar selectedTab="Payments" />
      <div>AdminPayments</div>
      <Footer />
    </div>
  );
}
