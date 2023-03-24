import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import "../myAccount.css";
import { capitalizeFirstLetter } from "./../../../uitils/jsFunctions";
import { api } from "../../../axios/api.config";
import { useParams } from "react-router";
import { ToastErrorMessage } from "../../../uitils/toastMessage";
import AccountHeader from "../../../components/accountHeader";

const Profile = () => {
  const [getuserDetails, setGetuserDetails] = useState(false);
  const [userDetails, setUserDeatils] = useState({});
  const params = useParams();

  useEffect(() => {
    if (!getuserDetails) {
      getUserDeatils();
    }
  }, [userDetails]);

  const getUserDeatils = async () => {
    if (params.id) {
      setGetuserDetails(true);
      try {
        const responce = await api.post(`auth/user`, {
          id: params.id,
        });
        setUserDeatils(responce.data);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };
  return (
    <div className="profileBody">
      <AccountHeader label="Profile" />
      <Card className="profileCard  header-blog bg-animation container">
        <CardContent className="profileCardContent">
          <div className="userImgDiv">
            <div>
              <Avatar
                alt={capitalizeFirstLetter(
                  userDetails.studentName?.charAt(0) || ""
                )}
                srcSet={userDetails.profile}
                sx={{
                  width: "100px",
                  height: "100px",
                  marginRight: 2,
                  fontSize: "60px",
                }}
              />
            </div>
            <p className="rollno white">{userDetails.studentName}</p>
          </div>
          <div className="userDeatilsDiv">
            <div className="profileInputs white">
              <label>Name</label>
              <span className="inputdout white">:</span>
              <TextField
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={userDetails.studentName || "Not Available"}
                disabled={true}
              />
            </div>
            <div className="profileInputs white">
              <label>Roll No</label>
              <span className="inputdout white">:</span>
              <TextField
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={userDetails.rollno || "Not Available"}
                disabled={true}
              />
            </div>
            <div className="profileInputs white">
              <label>Email</label>
              <span className="inputdout">:</span>
              <TextField
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={userDetails.mailId || "Not Available"}
                disabled={true}
              />
            </div>
            <div className="profileInputs white">
              <label>Year</label>
              <span className="inputdout">:</span>
              <TextField
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={userDetails.year || "Not Available"}
                disabled={true}
              />
            </div>
            <div className="profileInputs white">
              <label>Branch</label>
              <span className="inputdout">:</span>
              <TextField
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={userDetails.branch || "Not Available"}
                disabled={true}
              />
            </div>
            <div className="profileInputs white">
              <label>Phone No</label>
              <span className="inputdout">:</span>
              <TextField
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={userDetails.phoneNumber || "Not Avaliable"}
                disabled={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
