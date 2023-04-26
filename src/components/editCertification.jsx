import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import {
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useSelector } from "react-redux";
import { api } from "../axios/api.config";
import { ToastErrorMessage, ToastSuccessMessage } from "../uitils/toastMessage";
import { useParams } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import AccountHeader from "./accountHeader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const selectStatus = [
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

export default function EditCertification(props) {
  const authState = useSelector((state) => state.authReducer);
  const params = useParams();
  const [open, setOpen] = React.useState(props.open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props.certificationDetails, "propsd");

  const [addNewCertification, setAddNewCertification] = useState({
    studentId: authState._id,
    organizationName: props.certificationDetails.organizationName,
    certificationName: props.certificationDetails.certificationName,
    status: props.certificationDetails.status,
    start_date: props.certificationDetails.start_date,
    end_date: props.certificationDetails.end_date,
    completionCertificatepath:
      props.certificationDetails.completionCertificatepath,
    certificationId: props.certificationDetails._id,
  });

  console.log(addNewCertification,"editCerifvd");

  const onChnageInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log(e);
    setAddNewCertification((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleOnImageChange = async (e) => {
    const { name } = e.currentTarget;
    const filelist = e.target.files[0];
    const base64 = await convertBase64(filelist);
    setAddNewCertification((prevState) => ({
      ...prevState,
      [name]: base64,
    }));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const cancleDeatils = () => {
    setAddNewCertification({
      studentId: authState._id,
      organizationName: props.certificationDetails.organizationName,
      certificationName: props.certificationDetails.certificationName,
      status: props.certificationDetails.status,
      start_date: props.certificationDetails.start_date,
      end_date: props.certificationDetails.end_date,
      completionCertificatepath:
        props.certificationDetails.completionCertificatepath,
      certificationId: props.certificationDetails._id,
    });
  };
  const uploadDeatils = async () => {
    if (authState._id == params.id) {
      try {
        const responce = await api.put(
          `update-CertificationDetails`,
          addNewCertification
        );
        console.log(responce,"Certification")
        const ongoing = responce.data.filter( (certification) => certification.status==='Ongoing')
        const completed = responce.data.filter( (certification) => certification.status==='Completed')
        props.setCertificationsDeatils(responce.data);
        ToastSuccessMessage("Successfully Updated !!");
      } catch (error) {
        ToastErrorMessage(
          error.response.data || error.message || "Something Went Wrong !!"
        );
      }
    }
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <Button className="btnUpdate1">Update</Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // maxWidth="lg"
        className="dialogBox"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <AccountHeader label="Edit Certification" />
          <div
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              margin: "20px 10px 0px 0px",
            }}
          >
            <CloseIcon />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="addInternInputsDiv">
              <div className="addInternInputs">
                <label>Organization Name :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="Organization Name"
                  id="outlined-size-small"
                  size="small"
                  value={addNewCertification.organizationName}
                  name="organizationName"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <label>Certification Name :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="Web/ML/AI/"
                  id="outlined-size-small"
                  size="small"
                  value={addNewCertification.certificationName}
                  name="certificationName"
                  onChange={onChnageInputs}
                />
              </div>
              <div>
                <div className="addInternInputs">
                  <label>Start Date :</label>
                  <OutlinedInput
                    className="myAccountInputs"
                    value={addNewCertification.start_date || ""}
                    onChange={onChnageInputs}
                    name="start_date"
                    type="date"
                    required
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="addInternInputs">
                    <label>End Date :</label>
                    <OutlinedInput
                      className="myAccountInputs"
                      value={addNewCertification.end_date || ""}
                      onChange={onChnageInputs}
                      name="end_date"
                      type="date"
                      required
                      size="small"
                      id="outlined-basic"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="addInternInputs">
                  <label>Status :</label>
                  <FormControl size="small">
                    <Select
                      className="myAccountInputs selectColor"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={addNewCertification.status}
                      value={addNewCertification.status}
                      name="graduationPosition"
                      onChange={(e) => {
                        setAddNewCertification((prevState) => ({
                          ...prevState,
                          status: e.target.value,
                          completionCertificatepath: "",
                        }));
                      }}
                    >
                      {selectStatus.map((option, index) => (
                        <MenuItem
                          key={`selectStatus=${index}`}
                          value={option.value}
                        >
                          {option.displayName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {addNewCertification.status == "Completed" ? (
                <div>
                  <div className="addInternInputs">
                    <label>Completion Certificate :</label>
                    <OutlinedInput
                      className="myAccountInputs"
                      onChange={handleOnImageChange}
                      name="completionCertificatepath"
                      type="file"
                      size="small"
                      id="outlined-basic"
                    />
                  </div>
                  <div className="previewImage">
                    <div>
                      {addNewCertification.completionCertificatepath ? (
                        <img
                          src={addNewCertification.completionCertificatepath}
                          style={{
                            width: "300px",
                            height: "270px",
                            objectfit: "fill",
                            marginleft: "30px",
                          }}
                          alt="preview image"
                        />
                      ) : (
                        <p style={{ color: "red" }}>
                          Completion Certificate Not Upload
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </DialogContentText>
        </DialogContent>
        <div className="editUserDetailsBtn" style={{ padding: "20px 0px" }}>
          <Button className="editUserBtn btnCancle" onClick={cancleDeatils}>
            Cancle
          </Button>
          <Button className="editUserBtn btnUpdate" onClick={uploadDeatils}>
            Update
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
