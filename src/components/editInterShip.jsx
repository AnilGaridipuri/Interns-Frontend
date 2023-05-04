import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import CreateIcon from "@mui/icons-material/Create";
import {
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useSelector } from "react-redux";
import { api } from "../axios/api.config";
import { ToastErrorMessage, ToastSuccessMessage } from "../uitils/toastMessage";
import { useParams } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import AccountHeader from "./accountHeader";
import { render } from "react-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const selectStatus = [
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

export default function EditInternship(props) {
  const authState = useSelector((state) => state.authReducer);
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   // render();
  // }, [addNewIntern])

  const [addNewIntern, setAddNewIntern] = useState({
    studentId: authState._id,
    workId: props.workDetails._id,
    companyName: props.workDetails.companyName,
    domain: props.workDetails.domain,
    role: props.workDetails.role,
    status: props.workDetails.status,
    type: props.workDetails.type,
    start_date: props.workDetails.start_date,
    end_date: props.workDetails.end_date,
    offerLetterpath: props.workDetails.offerLetterpath,
    completionCertificatepath: props.workDetails.completionCertificatepath,
    stipend: props.workDetails.stipend,
    projectName: props.workDetails.projectName,
  });
  // console.log(addNewIntern, "updated list");

  const onChnageInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    // console.log(e);
    setAddNewIntern((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const [changedOfferLetter, setChangedOfferLetter] = useState(null);
  const [changedCompletionCertificate, setChangedCompletionCertificate] = useState(null);
  const [isOfferLetterChanged, setIsOfferLetterChanged] = useState(false);
  const [isCompletionCertificateChanged, setIsCompletionCertificateChanged] = useState(false);


  const handleOnImageChange = async (e) => {
    const filelist = e.target.files[0];
    const filename = e.target.name;
    if (filelist.size > 153600) {
      ToastErrorMessage("File size must be less than 150KB.");
      document.getElementById(filename).value = "";
      return;
    }
    if (!filelist.type.includes("image/")) {
      ToastErrorMessage("File type must be a jpeg/png/jpg.");
      document.getElementById(filename).value = "";
      return;
    }
    let formData = new FormData();
    formData.append(filename, filelist);


    if (filename === "offerLetterpath") {
      var apiPath = `/offerLetterToS3`;
    } else if (filename === "completionCertificatepath") {
      var apiPath = `/completionCertificateToS3`;
    }
    try {
      const response = await api.post(
        `${apiPath}`,
        formData
      );
      setAddNewIntern((pre) => ({
        ...pre,
        [filename]: response.data,
      }));
    } catch (error) {
      ToastErrorMessage(error.response.data);
    }
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

  const cancelDeatils = () => {
    setAddNewIntern({
      workId: props.workDetails._id,
      companyName: props.workDetails.companyName,
      domain: props.workDetails.domain,
      role: props.workDetails.role,
      status: props.workDetails.status,
      type: props.workDetails.type,
      start_date: props.workDetails.start_date,
      end_date: props.workDetails.end_date,
      offerLetterpath: props.workDetails.offerLetterpath,
      completionCertificatepath: props.workDetails.completionCertificatepath,
      stipend: props.workDetails.stipend,
      projectName: props.workDetails.projectName,
    });
    document.getElementById("offerLetterpath").value = "";
    document.getElementById("completionCertificatepath").value = "";
  };

  const uploadDeatils = async () => {
    if (authState._id === params.id) {
      try {
        const responce = await api.put(`/update-workDetails`, addNewIntern);
        props.setWorkDeatils(responce.data);
        ToastSuccessMessage("Successfully Updated !!");
      } catch (error) {
        ToastErrorMessage(error.response.data || error.message);
      }
    }
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <CreateIcon />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
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
          <AccountHeader label="Edit Internship" />
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
                <label>Company Name :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="Company Name"
                  id="outlined-size-small"
                  size="small"
                  value={addNewIntern.companyName}
                  name="companyName"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs radioInputs">
                <FormControl className="myAccountInputs selectColor">
                  <label className="radioLabel">Type :</label>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="type"
                    onClick={onChnageInputs}
                  >
                    <FormControlLabel
                      value="Internship"
                      control={<Radio />}
                      label="Internship"
                      checked={addNewIntern.type == "Internship"}
                    />
                    <FormControlLabel
                      value="Job"
                      control={<Radio />}
                      label="Job"
                      checked={addNewIntern.type == "Job"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="addInternInputs">
                <label>Project Name :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="Project Name"
                  id="outlined-size-small"
                  size="small"
                  value={addNewIntern.projectName}
                  name="projectName"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <label>Domain :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="Web/ML/AI/"
                  id="outlined-size-small"
                  size="small"
                  value={addNewIntern.domain}
                  name="domain"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <label>Role :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="Role"
                  id="outlined-size-small"
                  size="small"
                  value={addNewIntern.role}
                  name="role"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <label>Stipend :</label>
                <OutlinedInput
                  className="myAccountInputs"
                  placeholder="No or Yes"
                  id="outlined-size-small"
                  size="small"
                  value={addNewIntern.stipend}
                  name="stipend"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <label>Status :</label>
                <FormControl size="small">
                  <Select
                    className="myAccountInputs selectColor"
                    id="demo-simple-select"
                    defaultValue={addNewIntern.status}
                    name="graduationPosition"
                    onChange={(e) => {
                      setAddNewIntern((prevState) => ({
                        ...prevState,
                        status: e.target.value,
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
              <div>
                <div className="addInternInputs">
                  <label>Start Date :</label>
                  <OutlinedInput
                    className="myAccountInputs"
                    value={addNewIntern.start_date || ""}
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
                <div className="addInternInputs">
                  <label>End Date :</label>
                  <OutlinedInput
                    className="myAccountInputs"
                    value={addNewIntern.end_date || ""}
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
            <div className="addInternInputsDiv">
              <div>
                <div className="addInternInputs fileInputs">
                  <label>Offer Letter :</label>
                  <OutlinedInput
                    className="myAccountInputs"
                    onChange={handleOnImageChange}
                    name="offerLetterpath"
                    type="file"
                    size="small"
                    id="offerLetterpath"
                    accept="image/*"
                  />
                </div>
                <div className="previewImage">
                  <div>
                    <div>
                      {addNewIntern.offerLetterpath ? (
                        <img
                          src={addNewIntern.offerLetterpath}
                          style={{
                            width: "300px",
                            height: "270px",
                            objectfit: "fill",
                          }}
                          alt="preview image"
                        />
                      ) : (
                        <p style={{ color: "red" }}>Offer Letter is Changed.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {addNewIntern.status == "Completed" ? (
                <div>
                  <div className="addInternInputs fileInputs">
                    <label>Completion Certificate :</label>
                    <OutlinedInput
                      className="myAccountInputs"
                      onChange={handleOnImageChange}
                      name="completionCertificatepath"
                      type="file"
                      multiple
                      size="small"
                      id="completionCertificatepath"
                      accept="image/*"
                    />
                  </div>
                  <div className="previewImage">
                    <div>
                      {addNewIntern.completionCertificatepath ? (
                        <img
                          src={addNewIntern.completionCertificatepath}
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
                          Completion Certificate is changed.
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
          <Button className="editUserBtn btnCancel" onClick={cancelDeatils}>
            Cancel
          </Button>
          <Button className="editUserBtn btnUpdate" onClick={uploadDeatils}>
            Update
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
