import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL_ROOT } from "../data/constants";
import Loading from "../components/Loading";
export default function VerifyEmail() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL_ROOT}/api/Auth/${uuid}`)
      .then(() => {
        navigate("/message?text=Your email was verified successfully&style=success&next=/login");
      })
      .catch(() => {});
  }, []);

  return <Loading />;
}
