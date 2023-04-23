import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import AccountHeader from "../../../components/accountHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import "../myAccount.css";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setAuthentication } from "../../../store/slices/auth";
import { capitalizeFirstLetter } from "./../../../uitils/jsFunctions";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { api } from "../../../axios/api.config";
import { ApplicationConstant } from "../../../constant/applicationConstant";
import {
  ToastErrorMessage,
  ToastSuccessMessage,
} from "../../../uitils/toastMessage";
import FormData from 'form-data'

const selectYear = [
  { displayName: "I", value: "I" },
  { displayName: "II", value: "II" },
  { displayName: "III", value: "III" },
  { displayName: "IV", value: "IV" },
];
const selectBranch = [
  { displayName: "AI", value: "AI" },
  { displayName: "CS", value: "CS" },
  { displayName: "DS", value: "DS" },
  { displayName: "IoT", value: "IoT" },
  { displayName: "CSE", value: "CSE" },
  { displayName: "CST", value: "CST" },
  { displayName: "ECE", value: "ECE" },
  { displayName: "EEE", value: "EEE" },
  { displayName: "CIVIL", value: "CIVIL" },
  { displayName: "MECH", value: "MECH" },
];

const selectSection = [
  { displayName: "Single Section", value: " " },
  { displayName: "A", value: "A" },
  { displayName: "B", value: "B" },
  { displayName: "C", value: "C" },
  { displayName: "D", value: "D" },
  { displayName: "E", value: "E" },
  { displayName: "F", value: "F" },
];


const EditProfile = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (authState._id != params.id) {
      navigate(`${ApplicationConstant.MYACCOUNT_PROFILE_URL}/${params.id}`);
    }
  }, [params]);

  const [getuserDetails, setGetuserDetails] = useState(false);

  const [studentDetails, setstudentDeatils] = useState({
    branch: "",
    mailId: "",
    phoneNumber: "",
    studentName: "",
    rollno: "",
    year:"",
    profile: "",
    section:"",
    altmail:""
  });
  const [isProfilePicEdited, setIsProfilePicEdited] = useState(false)
  const [editedProfilePic, setEditedProfilePic] = useState(null)
  const [userDetails, setUserDeatils] = useState({});


  useEffect(() => {
    if (!getuserDetails) {
      getUserDeatils();
    }
  }, []);

  const getUserDeatils = async () => {
    if (params.id) {
      setGetuserDetails(true);
      try {
        const response = await api.post(`auth/user`, {
          id: params.id,
        });
        setUserDeatils(response.data)
        setstudentDeatils({
          branch: response.data.branch,
          mailId: response.data.mailId,
          phoneNumber: response.data.phoneNumber,
          studentName: response.data.studentName,
          rollno: response.data.rollno,
          year: response.data.year,
          profile: response.data.profile,
          section: response.data.section,
          altmail: response.data.altmail,
        });
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

  const onChangeInputs = (e) => {
    // console.log(e.target.files[0])
    const name = e.target.name;
    var value = e.target.value;

    setstudentDeatils((pre) => ({
      ...pre,
      [name]: value,
    }));
    

  };

    const handleImageUpload = async (e) => {
      const filelist = e.target.files[0];
      // console.log("size====", filelist.size)
      if(filelist.size>204800){
        ToastErrorMessage("Profile Picture size must be less than 200KB.")
        document.getElementById('file-input').value='';
        return
      }
      // console.log(filelist)
      const base64 = await convertBase64(filelist);
      setEditedProfilePic(base64);
      let formData = new FormData();
      formData.append('profilePic',filelist)
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
          `/profilePicToS3`, 
          formData, 
          // {
          //   headers :{
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   }
          // }
        );
        // console.log(response.data)
        setstudentDeatils((pre) => ({
          ...pre,
          profile : response.data,
        }));
        setIsProfilePicEdited(true);
      } catch (error) {
        ToastErrorMessage(error.response.data);
      }
    };
    // console.log("profileFile _+++++++++++++++++++++++++++++++= ",profileFile)


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

  const updateUserDeatils = async () => {
    try {

      const response = await api.put(
        `/update-user`, 
        studentDetails
      );
      setUserDeatils(response.data);
      dispatch(
        setAuthentication({
          isAuthenticated: true,
          rollno: response.data.rollno,
          _id: response.data._id,
          mailId: response.data.mailId,
          studentName: response.data.studentName,
          year: response.data.year,
          branch: response.data.branch,
          phoneNumber: response.data.phoneNumber,
          profile: response.data.profile,
          section: response.data.section,
          altmail: response.data.altmail,
        })
      );
      setIsProfilePicEdited(false)
      ToastSuccessMessage("Successfull Updated");
    } catch (error) {
      ToastErrorMessage(error.response.data);
    }
  };

  const changePassword = () => {
    const passwordfunction = "changepassword";
    navigate(
      `${ApplicationConstant.FORGOTPASSWORD_URL_PATH}/${passwordfunction}`
    );
  };

  const cancleUserDeatils = () => {
    setIsProfilePicEdited(false);
    setstudentDeatils({
      branch: userDetails.branch || "",
      mailId: userDetails.mailId ,
      phoneNumber: userDetails.phoneNumber || "",
      studentName: userDetails.studentName || "",
      rollno: userDetails.rollno || "",
      year: userDetails.year || "",
      profile: userDetails.profile || "",
    });
  };

  return (
    <div className="profileBody my_AccountBody">
      <Card className="profileCard header-blog bg-animation container">
        <AccountHeader label="Edit Profile" />
        <CardContent className="profileCardContent" style={{ paddingTop: 15 }}>
          <div className="userImgDiv">
            <div>
              <input
                onChange={(e) => {
                  // setprofileFile(e.target.files[0])
                  handleImageUpload(e);
                }}
                className="image_input"
                id="file-input"
                type="file"
                name="profile"
                accept="image/*"
              />
              <Avatar
                alt={capitalizeFirstLetter(
                  studentDetails.studentName?.charAt(0) || ""
                )}
                srcSet={
                  !isProfilePicEdited ? userDetails.profile : editedProfilePic
                }
                sx={{
                  width: "130px",
                  height: "130px",
                }}
              />
              <label htmlFor="file-input" className="uploadImg">
                <AddAPhotoIcon fontSize="large" style={{ color: "#df7f02" }} />
              </label>
            </div>
            <p className="Editrollno white">{studentDetails.studentName}</p>
          </div>
          <div className="userDeatilsDiv">
            <div className="profileInputs white">
              <label>Name</label>
              <span className="inputdout">:</span>
              <OutlinedInput
                className="myAccountInputs"
                placeholder="Name"
                id="outlined-size-small"
                size="small"
                value={studentDetails.studentName}
                name="studentName"
                onChange={onChangeInputs}
                // autoComplete={false}
              />
            </div>
            <div className="profileInputs white">
              <label>Roll No</label>
              <span className="inputdout">:</span>
              <OutlinedInput
                className="myAccountInputs"
                placeholder="Roll No"
                id="outlined-size-small"
                size="small"
                value={studentDetails.rollno}
                name="rollno"
                onChange={onChangeInputs}
              />
            </div>
            <div>
              <div className="profileInputs white">
                <label>Email</label>
                <span className="inputdout">:</span>
                <OutlinedInput
                  className="myAccountInputs disableInput"
                  placeholder="Email"
                  id="outlined-size-small"
                  size="small"
                  value={studentDetails.mailId}
                  disabled={true}
                />
              </div>
              <p className="hitMessage">Can not change your email</p>
            </div>
            <div className="profileInputs white">
              <label>Year</label>
              <span className="inputdout">:</span>
              <FormControl size="small">
                <Select
                  className="myAccountInputs"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={studentDetails.year}
                  value={studentDetails.year}
                  name="graduationPosition"
                  onChange={(e) => {
                    setstudentDeatils((prevState) => ({
                      ...prevState,
                      year: e.target.value,
                    }));
                  }}
                >
                  {selectYear.map((option, index) => (
                    <MenuItem key={`selectYear=${index}`} value={option.value}>
                      {option.displayName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="profileInputs white">
              <label>Branch</label>
              <span className="inputdout">:</span>
              <FormControl size="small">
                <Select
                  className="myAccountInputs"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={studentDetails.branch}
                  defaultValue={studentDetails.branch}
                  name="graduationPosition"
                  onChange={(e) => {
                    setstudentDeatils((prevState) => ({
                      ...prevState,
                      branch: e.target.value,
                    }));
                  }}
                >
                  {selectBranch.map((option, index) => (
                    <MenuItem
                      key={`selectBranch=${index}`}
                      value={option.value}
                    >
                      {option.displayName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="profileInputs white">
              <label>Section</label>
              <span className="inputdout">:</span>
              <FormControl size="small">
                <Select
                  className="myAccountInputs"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={studentDetails.section}
                  value={studentDetails.section}
                  name="graduationPosition"
                  onChange={(e) => {
                    setstudentDeatils((prevState) => ({
                      ...prevState,
                      section: e.target.value,
                    }));
                  }}
                >
                  {selectSection.map((option, index) => (
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
            <div className="profileInputs white">
              <label>Phone No</label>
              <span className="inputdout">:</span>
              <OutlinedInput
                className="myAccountInputs"
                placeholder="Phone No"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={studentDetails.phoneNumber}
                name="phoneNumber"
                onChange={onChangeInputs}
              />
            </div>
            <div className="profileInputs white">
              <label>Alt Email</label>
              <span className="inputdout">:</span>
              <OutlinedInput
                className="myAccountInputs"
                placeholder="Alternative email "
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={studentDetails.altmail}
                name="altmail"
                onChange={onChangeInputs}
              />
            </div>
          </div>
        </CardContent>
        <div className="editUserDetailsBtn">
          <Button className="editUserBtn btnCancle" onClick={cancleUserDeatils}>
            Cancle
          </Button>
          <Button className="editUserBtn btnUpdate" onClick={updateUserDeatils}>
            Update
          </Button>
          <Button className="editUserBtn btnChange" onClick={changePassword}>
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditProfile;
