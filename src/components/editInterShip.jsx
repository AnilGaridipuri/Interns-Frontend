import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CreateIcon from "@mui/icons-material/Create";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { api } from "../axios/api.config";
import { ToastErrorMessage, ToastSuccessMessage } from "../uitils/toastMessage";
import { useParams } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const selectStatus = [
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

export default function EditInternship(props) {
  console.log(props.workDetails, "popup,work");
  const authState = useSelector((state) => state.authReducer);
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  });
  console.log(addNewIntern, "updated list");

  const onChnageInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log(e);
    setAddNewIntern((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleOnImageChange = async (e) => {
    const { name } = e.currentTarget;
    const filelist = e.target.files[0];
    const base64 = await convertBase64(filelist);
    setAddNewIntern((prevState) => ({
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
    });
  };
  const uploadDeatils = async () => {
    if (authState._id == params.id) {
      try {
        const responce = await api.put(`/update-workDetails`, addNewIntern);
        props.setWorkDeatils(responce.data);
        ToastSuccessMessage("Successfully Uploaded !!");
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
            <div className="addInternInputsDiv">
              <div className="addInternInputs">
                <label>Company Name :</label>
                <TextField
                  placeholder="Company Name"
                  id="outlined-size-small"
                  size="small"
                  value={addNewIntern.companyName}
                  name="companyName"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <FormControl className="radioBtnDiv">
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
                    <FormControlLabel
                      value="Certification"
                      control={<Radio />}
                      label="Certification"
                      checked={addNewIntern.type == "Certification"}
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
                  value={addNewIntern.domain}
                  name="domain"
                  onChange={onChnageInputs}
                />
              </div>
              <div className="addInternInputs">
                <label>Role :</label>
                <TextField
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
                <TextField
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
                  <TextField
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
                  <TextField
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
              <div>
                <div className="addInternInputs">
                  <label>Offer Letter :</label>
                  <TextField
                    onChange={handleOnImageChange}
                    name="offerLetterpath"
                    type="file"
                    size="small"
                    id="outlined-basic"
                  />
                </div>
                <div className="previewImage">
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
                      <p style={{ color: "red" }}>Offer Letter Not Upload</p>
                    )}
                  </div>
                </div>
              </div>
              {addNewIntern.status == "Completed" ? (
                <div>
                  <div className="addInternInputs">
                    <label>Completion Certificate :</label>
                    <TextField
                      onChange={handleOnImageChange}
                      name="completionCertificatepath"
                      type="file"
                      multiple
                      size="small"
                      id="outlined-basic"
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
        <div className="editUserDetailsBtn">
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
