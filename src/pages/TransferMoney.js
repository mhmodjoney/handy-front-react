import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Divider, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CurrencyInput from "react-currency-input-field";
import ConfirmButton from "../components/MoneyTransfer/ConfirmButton";

export default function TransferMoney() {
  const [price, setPrice] = React.useState(0.01);
  const [accountNumber, SetAccountNumber] = React.useState("");

  return (
    <div>
      <NavBar selectedTab="Money Transfer" />
      <h2 className="shopping-header text-center m-3 rounded">
        Transfer Money
      </h2>
      <Divider className="m-2" size="4" color="grey" />
      <h3 className="text-secondary text-center m-3 rounded">
        Enter the account number
      </h3>
      <TextField
          className="mx-auto my-4 d-table"
          label="account number"
          type="numnber"
          value={accountNumber}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            SetAccountNumber(event.target.value);
          }}
        />
      <h3 className="text-secondary text-center m-3 rounded">
        Enter the amount you want to pay
      </h3>
      <CurrencyInput
        placeholder="Please enter the amount"
        prefix="$"
        value={price}
        decimalsLimit={2}
        className="mx-auto my-4 p-3 d-table"
        onValueChange={(value, name) =>
          setPrice(value <= 0 || !value ? 0.01 : value)
        }
      />
      <ConfirmButton name={`card:${accountNumber}`} price={price} />
      <Footer />
    </div>
  );
}
