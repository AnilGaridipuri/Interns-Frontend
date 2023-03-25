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

export default function ViewWorkDetails(props) {
  console.log(props.label);
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
          
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 20px 0px 0px",
          }}
        >
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* <p
              className="intershipTitle"
              style={{ textAlign: "center", margin: "0px 0px 30px 0px" }}
            >
              Student Details
            </p> */}
            <div
              style={{
                display: "grid",
                alignItems: "center",
                alignContent: "center",
                gap: "30px",
                justifyItems: "center",
              }}
            >
              <div >
                <Avatar
                  src={props.studentDetails.profile}
                  style={{ cursor: "pointer" }} 
                  onClick={viewProfile}
                  sx={{
                    margin: "0 auto",
                    width: "100px",
                    height: "100px",
                  }}
                />
                <p
                  onClick={viewProfile}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    color: "#f1950a",
                  }}
                >
                  View  Profile
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
                {/* <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                    Mail Id
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>{props.studentDetails.mailId}</p>
                </div> */}
                {/* <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                    Roll No
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>{props.studentDetails.rollno}</p>
                </div> */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <label style={{ fontWeight: "bold", width: "130px" }}>
                  Year / Branch
                  </label>
                  <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                  <p>
                    {props.studentDetails.year} / {props.studentDetails.branch}
                  </p>
                </div>
              </div>
            </div>
            {props.label === "Internship" ? (
              <div>
                <p
                  className="intershipTitle"
                  style={{ textAlign: "center", margin: "30px 0px" }}
                >
                  Internship Details
                </p>
                <div className="addInternInputsDiv">
                  <div className="addInternInputs">
                    <label>Company Name :</label>
                    <TextField
                      className="workValue"
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
                      {/* <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="type"
                        disabled={true}
                      > */}
                        <FormControlLabel
                          className="workValue"
                          value="props.singleWorkDetails.type"
                          control={<Radio />}
                          label="Internship"
                          checked='true'
                        />
                        {/* <FormControlLabel
                          value="Job"
                          control={<Radio />}
                          label="Job"
                          checked={props.singleWorkDetails.type == "Job"}
                        />
                        <FormControlLabel
                          value="Certification"
                          control={<Radio />}
                          label="Certification"
                          checked={
                            props.singleWorkDetails.type == "Certification"
                          }
                        /> */}
                      {/* </RadioGroup> */}
                    </FormControl>
                  </div>
                  <div className="addInternInputs">
                    <label>Domain :</label>
                    <TextField
                      className="workValue"
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
                      className="workValue"
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
                      className="workValue"
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
                      className="workValue"
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
                        className="workValue"
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
                        className="workValue"
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
                      {props.singleWorkDetails.offerLetterpath == "" ? (
                        <p style={{ color: "red", width: "300px" }}>
                          Offer Letter Not Upload
                        </p>
                      ) : (
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
                      )}
                    </div>
                  </div>
                  <div className="previewImage">
                    <div>
                      {props.singleWorkDetails.completionCertificatepath !=
                      "" ? (
                        <div>
                          <p>Completion Certificate</p>
                          <img
                            src={
                              props.singleWorkDetails.completionCertificatepath
                            }
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
                        <p style={{ color: "red", width: "300px" }}>
                          Completion Certificate Not Upload
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="addInternInputsDiv">
                  <div className="addInternInputs">
                    <label>Organization Name :</label>
                    <TextField
                      placeholder="Organization Name"
                      id="outlined-size-small"
                      size="small"
                      value={props.singlecertificationsDetails.organizationName}
                      disabled={true}
                    />
                  </div>
                  <div className="addInternInputs">
                    <label>Domain :</label>
                    <TextField
                      placeholder="Web/ML/AI/"
                      id="outlined-size-small"
                      size="small"
                      value={props.singlecertificationsDetails.domain}
                      disabled={true}
                    />
                  </div>
                  <div className="addInternInputs">
                    <label>Status :</label>
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      value={props.singlecertificationsDetails.status}
                      name="stipend"
                      disabled={true}
                    />
                  </div>
                  <div className="addInternInputs">
                    <label>Start Date :</label>
                    <TextField
                      value={
                        props.singlecertificationsDetails.start_date || ""
                      }
                      type="date"
                      required
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      disabled={true}
                    />
                  </div>
                  <div className="addInternInputs">
                    <label>End Date :</label>
                    <TextField
                      value={props.singlecertificationsDetails.end_date || ""}
                      type="date"
                      required
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                      disabled={true}
                    />
                  </div>
                  <div className="previewImage">
                    <div>
                      {props.singlecertificationsDetails.completionCertificatepath !=
                      "" ? (
                        <div>
                          <p>Completion Certificate</p>
                          <img
                            src={
                              props.singlecertificationsDetails.completionCertificatepath
                            }
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
                        <p style={{ color: "red", width: "330px" ,marginTop:'20px'}}>
                          Completion Certificate Not Upload
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
