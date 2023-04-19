import React, { useState,useEffect } from "react";
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
import {useNavigate, useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import { ApplicationConstant } from "../../../constant/applicationConstant";
import { ToastErrorMessage, ToastSuccessMessage } from "../../../uitils/toastMessage";
import { api } from "../../../axios/api.config";
import { margin } from "@mui/system";
import LoadingCircle from "../../../components/loading";

const selectStatus = [
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

const AddNewInternship = () => {
  
  const authState = useSelector((state) => state.authReducer);
  
  const navigate = useNavigate()
  const params = useParams();

  const [isProfileUpdated, setisProfileUpdated] = useState(false)
  const [loading, setLoading] = useState(true);
  // console.log(loading, "loading");

  const [offerLetterPreview, setOfferLetterPreview] = useState(null)
  const [completionCertificatPreview, setCompletionCertificatePreview] = useState(null)

 useEffect(() => {
   if (authState._id != params.id) {
     navigate(`${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${params.id}`);
   }
   if (
     authState.studentName !== "" &&
     authState.rollno !== "" &&
     authState.year !== "" &&
     authState.branch !== "" &&
     authState.section != ""
   ) {
     setisProfileUpdated(true);
     setLoading(false);
   }
   setLoading(false);
 }, [params, authState]);
  
  const [addNewIntern, setAddNewIntern] = useState({
    studentId:authState._id,
    projectName:"",
    companyName: "",
    domain: "",
    role: "",
    status: "",
    type: "",
    start_date: "",
    end_date: "",
    offerLetterpath: "",
    completionCertificatepath: "",
    stipend:""
  });

  // console.log(addNewIntern,)

  const onChnageInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log(e);
    setAddNewIntern((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
      const filelist = e.target.files[0];
      const filename = e.target.name;
      // console.log("size====", e.target.name)
      if(filelist.size>153600){
        ToastErrorMessage("File size must be less than 150KB.")
        document.getElementById(filename).value='';
        return
      }
      if(!filelist.type.includes('image/')){
        ToastErrorMessage("File type must be a jpeg/png/jpg.")
        document.getElementById(filename).value='';
        return
      }
      // console.log(filelist)
      const base64 = await convertBase64(filelist);
      if(filename==='offerLetterpath'){
        // setOfferLetterPreview(base64)
        var apiPath = `/offerLetterToS3`;
      }else if(filename==='completionCertificatepath'){
        // setCompletionCertificatePreview(base64)
        var apiPath = `/completionCertificateToS3`
      }
      
      let formData = new FormData();
      formData.append(filename,filelist)
      // formData.append('studentId', authState._id)

      // const data = new URLSearchParams(formData).toString();
      // console.log("data===============",data)
      // console.log("profileFile _-------------------------- ", formData.entries())
      // for (var key of formData.entries()) {
      //   profilelink = key[1]
      // } 
      // console.log(profilelink)
      // var location;


      try {
        const response = await api.post(
          apiPath, 
          formData, 
          // {
          //   headers :{
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   }
          // }
        );
        // console.log(response.data)
        setAddNewIntern((pre) => ({
          ...pre,
          [filename] : response.data,
        }));
        // setProfilePicEdited(true);
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

  const cancelDeatils = () =>{
    
    setAddNewIntern({
      companyName: "",
      domain: "",
      role: "",
      status: "",
      type: "",
      start_date: "",
      end_date: "",
      offerLetterpath: "",
      completionCertificatepath: "",
      stipend: "",
      projectName:""
    });
    document.getElementById('offerLetterpath').value='';
    document.getElementById('completionCertificatepath').value='';
  }
  const uploadDeatils = async () =>{
    if (authState._id === params.id) {
      try {
        const responce = await api.post(`addNewWork`, addNewIntern);
        ToastSuccessMessage('Successfully Uploaded !!')
        cancelDeatils()
      } catch (error) {
        ToastErrorMessage(error.response.data || error.message);
      }
    }
  }
  

  return (
    <div>
      {loading ? (
        <LoadingCircle />
      ) : (
        <div>
          <Card
            sx={{ minWidth: 275 }}
            className="internshipCard1 header-blog bg-animation container"
          >
            <AccountHeader label="Add Internship" />
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
                Sorry, You need to Update your profile to add your Work.
                <br />
                <br />
                Click on 'Edit profile' to update.
              </h3>
            ) : (
              <>
                <CardContent style={{ paddingTop: 15 }}>
                  <div className="addInternInputsDiv">
                    <div className="addInternInputs white">
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
                    <div className="addInternInputs1 white">
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
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="addInternInputs white">
                      <label>Project Name :</label>
                      <TextField
                        placeholder="Project Name"
                        id="outlined-size-small"
                        size="small"
                        value={addNewIntern.projectName}
                        name="projectName"
                        onChange={onChnageInputs}
                      />
                    </div>
                    <div className="addInternInputs white">
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
                    <div className="addInternInputs white">
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
                    <div className="addInternInputs white">
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
                    <div className="addInternInputs white">
                      <label>Status :</label>
                      <FormControl size="small">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={addNewIntern.status}
                          value={addNewIntern.status}
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
                      <div className="addInternInputs white">
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
                      <div className="addInternInputs white">
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
                      <div className="addInternInputs white">
                        <label>Offer Letter :</label>
                        <TextField
                          onChange={handleImageUpload}
                          name="offerLetterpath"
                          type="file"
                          size="small"
                          id="offerLetterpath"
                          accept="image/*"
                        />
                      </div>
                      <div className="previewImage">
                        <div>
                          {addNewIntern.offerLetterpath && (
                            <img
                              src={addNewIntern.offerLetterpath}
                              style={{
                                width: "200px",
                                height: "170px",
                                objectfit: "fill",
                              }}
                              alt="preview image"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {addNewIntern.status == "Completed" ? (
                      <div>
                        <div className="addInternInputs white">
                          <label>Completion Certificate :</label>
                          <TextField
                            onChange={handleImageUpload}
                            name="completionCertificatepath"
                            type="file"
                            size="small"
                            id="completionCertificatepath"
                            accept="image/*"
                          />
                        </div>
                        <div className="previewImage">
                          <div>
                            {addNewIntern.completionCertificatepath && (
                              <img
                                src={addNewIntern.completionCertificatepath}
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

            {isProfileUpdated ? (
              <div>
                <div className="editUserDetailsBtn">
                  <Button
                    className="editUserBtn btnCancle"
                    onClick={cancelDeatils}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="editUserBtn btnUpdate"
                    onClick={uploadDeatils}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddNewInternship;
