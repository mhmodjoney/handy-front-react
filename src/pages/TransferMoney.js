import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CurrencyInput from "react-currency-input-field";

export default function TransferMoney() {
  const [price, setPrice] = React.useState(0);

  return (
    <div>
      <NavBar selectedTab="Money Transfer" />
      <h2 className="shopping-header text-center m-3 rounded">
        Transfer Money to your University
      </h2>
      <Divider className="m-2" size="4" color="grey" />
      <Select label="Age" value={1} className="mx-auto my-4 d-table">
        <MenuItem value={1}>Tishreen University</MenuItem>
      </Select>
      <h3 className="text-secondary text-center m-3 rounded">
        Please enter the amount you want to pay
      </h3>
      <CurrencyInput
        placeholder="Please enter the amount"
        prefix="$"
        value={price}
        decimalsLimit={2}
        className="mx-auto my-4 p-3 d-table"
        onValueChange={(value, name) => setPrice(value)}
      />
      <button className="btn btn-success mx-auto my-4 p-3 d-table">Pay</button>
      <Footer />
    </div>
  );
}
