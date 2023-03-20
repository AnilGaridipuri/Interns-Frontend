import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { api } from "../axios/api.config";
import { ToastErrorMessage, ToastSuccessMessage } from "../uitils/toastMessage";
import { Avatar, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { ApplicationConstant } from "../constant/applicationConstant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const selectStatus = [
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

export default function ViewWorkDetails(props) {
  console.log(props.singleWorkDetails, "popopwef");
  console.log(props.studentDetails, "popopwef");
  const navigate = useNavigate();

  const handleClose = () => {
    props.setOpen(false);
  };

  const viewProfile = () =>{
     navigate(
       `${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${props.studentDetails._id}`
     );
  }

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          onClick={handleClose}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 20px 0px 0px",
          }}
        >
          <CloseIcon />
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p
              className="intershipTitle"
              style={{ textAlign: "center", margin: "0px 0px 30px 0px" }}
            >
              Student Details
            </p>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                alignContent: "center",
                gap: "30px",
                justifyItems: "center",
              }}
            >
              <div style={{ cursor: "pointer" }} onClick={viewProfile}>
                <Avatar
                  src={props.studentDetails.profile}
                  sx={{
                    width: "120px",
                    height: "120px",
                    marginRight: 2,
                    fontSize: "60px",
                  }}
                />
                <p
                  style={{
                    textAlign: "cneter",
                    marginLeft: "25px",
                    color: "#f1950a",
                  }}
                >
                  View Profile
                </p>
              </div>
              <div style={{ display: "grid", gap: "8px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                    Student Name
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>{props.studentDetails.studentName}</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                    Mail Id
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>{props.studentDetails.mailId}</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                    Roll No
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>{props.studentDetails.rollno}</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                    Branch/Year
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>
                    {props.studentDetails.branch}
                    {props.studentDetails.year}
                  </p>
                </div>
              </div>
            </div>
            <p
              className="intershipTitle"
              style={{ textAlign: "center", margin: "30px 0px" }}
            >
              Intrnship Details
            </p>
            <div className="addInternInputsDiv">
              <div className="addInternInputs">
                <label>Company Name :</label>
                <TextField
                  placeholder="Company Name"
                  id="outlined-size-small"
                  size="small"
                  value={props.singleWorkDetails.companyName}
                  name="companyName"
                  disabled={true}
                />
              </div>
              <div className="addInternInputs">
                <FormControl className="radioBtnDiv">
                  <label className="radioLabel">Type :</label>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="type"
                    disabled={true}
                  >
                    <FormControlLabel
                      value="Internship"
                      control={<Radio />}
                      label="Internship"
                      checked={props.singleWorkDetails.type == "Internship"}
                    />
                    <FormControlLabel
                      value="Job"
                      control={<Radio />}
                      label="Job"
                      checked={props.singleWorkDetails.type == "Job"}
                    />
                    <FormControlLabel
                      value="Certification"
                      control={<Radio />}
                      label="Certification"
                      checked={props.singleWorkDetails.type == "Certification"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="addInternInputs">
                <label>Domain :</label>
                <TextField
                  placeholder="Web/ML/AI/"
                  id="outlined-size-small"
                  size="small"
                  value={props.singleWorkDetails.domain}
                  name="domain"
                  disabled={true}
                />
              </div>
              <div className="addInternInputs">
                <label>Role :</label>
                <TextField
                  placeholder="Role"
                  id="outlined-size-small"
                  size="small"
                  value={props.singleWorkDetails.role}
                  name="role"
                  disabled={true}
                />
              </div>
              <div className="addInternInputs">
                <label>Stipend :</label>
                <TextField
                  placeholder="No or Yes"
                  id="outlined-size-small"
                  size="small"
                  value={props.singleWorkDetails.stipend}
                  name="stipend"
                  disabled={true}
                />
              </div>
              <div className="addInternInputs">
                <label>Status :</label>
                <TextField
                  id="outlined-size-small"
                  size="small"
                  value={props.singleWorkDetails.status}
                  name="stipend"
                  disabled={true}
                />
              </div>
              <div>
                <div className="addInternInputs">
                  <label>Start Date :</label>
                  <TextField
                    value={props.singleWorkDetails.start_date || ""}
                    name="start_date"
                    type="date"
                    required
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    disabled={true}
                  />
                </div>
              </div>
              <div>
                <div className="addInternInputs">
                  <label>End Date :</label>
                  <TextField
                    value={props.singleWorkDetails.end_date || ""}
                    name="end_date"
                    type="date"
                    required
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="addInternInputsDiv">
              <div className="previewImage">
                <div>
                  {props.singleWorkDetails.completionCertificatepath != "" ? (
                    <div>
                      <p>Offer Letter</p>
                      <img
                        src={props.singleWorkDetails.offerLetterpath}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectfit: "fill",
                        }}
                        alt="preview image"
                      />
                    </div>
                  ) : (
                    <p style={{ color: "red",width:'300px' }}>Offer Letter Not Upload</p>
                  )}
                </div>
              </div>
              <div className="previewImage">
                <div>
                  {props.singleWorkDetails.completionCertificatepath != "" ? (
                    <div>
                      <p>Completion Certificate</p>
                      <img
                        src={props.singleWorkDetails.completionCertificatepath}
                        style={{
                          width: "300px",
                          height: "300px",
                          objectfit: "fill",
                          marginleft: "30px",
                        }}
                        alt="preview image"
                      />
                    </div>
                  ) : (
                    <p style={{ color: "red" , width:'300px'}}>
                      Completion Certificate Not Upload
                    </p>
                  )}
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
