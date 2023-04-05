import React, { useState, useEffect } from "react";
import AccountHeader from "../../../components/accountHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  CardActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApplicationConstant } from "../../../constant/applicationConstant";
import {
  ToastErrorMessage,
  ToastSuccessMessage,
} from "../../../uitils/toastMessage";
import { api } from "../../../axios/api.config";

const selectStatus = [
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

const AddNewCertification = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const params = useParams();

  const [isProfileUpdated, setisProfileUpdated] = useState(!(authState.studentName===""))

  useEffect(() => {
    if (authState._id != params.id) {
      navigate(`${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${params.id}`);
    }
    if (
      authState.studentName !== "" &&
      authState.rollno !== "" &&
      authState.year !== "" &&
      authState.branch !== ""
    ) {
      setisProfileUpdated(true);
    }
  }, [params, authState]);

  const [addNewCertification, setAddNewCertification] = useState({
    studentId: authState._id,
    organizationName: "",
    domain: "",
    status: "",
    start_date: "",
    end_date: "",
    completionCertificatepath: "",
  });

  console.log(addNewCertification);

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
      organizationName: "",
      domain: "",
      status: "",
      start_date: "",
      end_date: "",
      completionCertificatepath: "",
    });
  };
  
  const uploadDeatils = async () => {
    if (authState._id == params.id) {
      try {
        const responce = await api.post(
          `addNewCertification`,
          addNewCertification
        );
        ToastSuccessMessage("Successfully Uploaded !!");
        cancleDeatils();
      } catch (error) {
        ToastErrorMessage(error.response.data || error.message);
      }
    }
  };

  

  return (
    <div>
      <Card
        sx={{ minWidth: 275 }}
        className="internshipCard1 header-blog bg-animation container"
      >
        <AccountHeader label="Add Certification" />
        {!isProfileUpdated ? (
          <h3
            style={{
              color: "white",
              textAlign: "center",
              margin: "30px 0",
              fontWeight: "100",
              fontSize: "25px",

            }}
          >
            Sorry, You need to Update your profile to add your Certifications.
            <br />
            <br />
            Click on 'Edit profile' to update.
          </h3>
        ) : (
          <>
            <CardContent style={{ paddingTop: 15 }}>
              <div className="addInternInputsDiv">
                <div className="addInternInputs white">
                  <label>Organization Name :</label>
                  <TextField
                    placeholder="Organization Name"
                    id="outlined-size-small"
                    size="small"
                    value={addNewCertification.organizationName}
                    name="organizationName"
                    onChange={onChnageInputs}
                  />
                </div>
                <div className="addInternInputs white">
                  <label>Domain :</label>
                  <TextField
                    placeholder="Web/ML/AI/"
                    id="outlined-size-small"
                    size="small"
                    value={addNewCertification.domain}
                    name="domain"
                    onChange={onChnageInputs}
                  />  
                </div>
                <div>
                  <div className="addInternInputs white">
                    <label>Start Date :</label>
                    <TextField
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
                  <div className="addInternInputs white">
                    <label>End Date :</label>
                    <TextField
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
                <div className="addInternInputs white">
                  <label>Status :</label>
                  <FormControl size="small">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={addNewCertification.status}
                      value={addNewCertification.status}
                      name="graduationPosition"
                      onChange={(e) => {
                        setAddNewCertification((prevState) => ({
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
                {addNewCertification.status == "Completed" ? (
                  <div>
                    <div className="addInternInputs white">
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
                        {addNewCertification.completionCertificatepath && (
                          <img
                            src={addNewCertification.completionCertificatepath}
                            style={{
                              width: "200px",
                              height: "170px",
                              objectfit: "fill",
                              marginleft: "30px",
                            }}
                            alt="preview image"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </>
        )}
        {isProfileUpdated ? 
          <div>
            <div className="editUserDetailsBtn">
              <Button className=" btnCancle" onClick={cancleDeatils}>
                Cancle
              </Button>
              <Button className=" btnUpdate" onClick={uploadDeatils}>
                Upload
              </Button>
            </div>
          </div> : null
        }
      </Card>
    </div>
  );
};

export default AddNewCertification;
