import React,{useState} from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

const AccountHeader = (props) => {
  return (
    <div>
      <div className="accountHeader">
        <p>{props.label}</p>
      </div>
    </div>
  );
}

export default AccountHeader