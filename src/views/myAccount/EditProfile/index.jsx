import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import AccountHeader from "../../../components/accountHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
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

  const [studentDeatils, setstudentDeatils] = useState({
    branch: "",
    mailId: "",
    phoneNumber: "",
    studentName: "",
    rollno: "",
    year:"",
    profile: "",
  });
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
        const responce = await api.post(`auth/user`, {
          id: params.id,
        });
        setUserDeatils(responce.data)
        setstudentDeatils({
          branch: responce.data.branch,
          mailId: responce.data.mailId,
          phoneNumber: responce.data.phoneNumber,
          studentName: responce.data.studentName,
          rollno: responce.data.rollno,
          year: responce.data.year,
          profile: responce.data.profile,
        });
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

  const onChnageInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    console.log(e);
    setstudentDeatils((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

    const handleImageUpload = async (e) => {
      const filelist = e.target.files[0];
      const base64 = await convertBase64(filelist);
      setstudentDeatils((prevState) => ({
        ...prevState,
        profile: base64,
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

  const updateUserDeatils = async () => {
    try {
      const responce = await api.put(`/update-user`, studentDeatils);
      setUserDeatils(responce.data);
      dispatch(
        setAuthentication({
          isAuthenticated: true,
          rollno: responce.data.rollno,
          _id: responce.data._id,
          mailId: responce.data.mailId,
          studentName: responce.data.studentName,
          year: responce.data.year,
          branch: responce.data.branch,
          phoneNumber: responce.data.phoneNumber,
          profile: responce.data.profile,
        })
      );
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
    <div className="profileBody">
      <Card className="profileCard header-blog bg-animation container">
        <AccountHeader label="Edit Profile" />
        <CardContent className="profileCardContent" style={{ paddingTop: 15 }}>
          <div className="userImgDiv">
            <div>
              <input
                onChange={handleImageUpload}
                className="image_input"
                id="file-input"
                type="file"
                name="profilePic"
                accept="image/*"
              />
              <Avatar
                alt={capitalizeFirstLetter(
                  studentDeatils.studentName?.charAt(0) || ""
                )}
                srcSet={studentDeatils.profile}
                sx={{
                  width: "130px",
                  height: "130px",
                }}
              />
              <label htmlFor="file-input" className="uploadImg">
                <AddAPhotoIcon fontSize="large" style={{ color: "#df7f02" }} />
              </label>
            </div>
            <p className="Editrollno white">
              {studentDeatils.studentName}
            </p>
          </div>
          <div className="userDeatilsDiv">
            <div className="profileInputs white">
              <label>Name</label>
              <span className="inputdout">:</span>
              <TextField
                placeholder="Name"
                id="outlined-size-small"
                size="small"
                value={studentDeatils.studentName}
                name="studentName"
                onChange={onChnageInputs}
                // autoComplete={false}
              />
            </div>
            <div className="profileInputs white">
              <label>Roll No</label>
              <span className="inputdout">:</span>
              <TextField
                placeholder="Roll No"
                id="outlined-size-small"
                size="small"
                value={studentDeatils.rollno}
                name="rollno"
                onChange={onChnageInputs}
              />
            </div>
            <div>
              <div className="profileInputs white">
                <label>Email</label>
                <span className="inputdout">:</span>
                <TextField
                  placeholder="Email"
                  className="disableInput"
                  id="outlined-size-small"
                  size="small"
                  value={studentDeatils.mailId}
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
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={studentDeatils.year}
                  value={studentDeatils.year}
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
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={studentDeatils.branch}
                  defaultValue={studentDeatils.branch}
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
              <label>Phone No</label>
              <span className="inputdout">:</span>
              <TextField
                placeholder="Phone No"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={studentDeatils.phoneNumber}
                name="phoneNumber"
                onChange={onChnageInputs}
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
