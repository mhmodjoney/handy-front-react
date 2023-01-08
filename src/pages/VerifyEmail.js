import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL_ROOT } from "../data/constants";
export default function VerifyEmail() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL_ROOT}/auth/${uuid}`)
      .then(() => {
        navigate("/login?state=emailverified");
      })
      .catch(() => {});
  }, []);

  return <div>VerifyEmail</div>;
}
