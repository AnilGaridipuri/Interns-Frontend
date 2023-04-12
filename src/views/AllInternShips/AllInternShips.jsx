import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { api } from "../../axios/api.config";
import { ToastErrorMessage } from "../../uitils/toastMessage";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import "./allinternship.css";
import { Avatar, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TablePagination } from "@mui/material";
import LoadingCircle from "../../components/loading";
import ViewWorkDetails from "../../components/viewWorkDeatil";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableHeader,
} from "../../components/tablestyles";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const selectBranch = [
  { displayName: "All", value: "All" },
  { displayName: "CAI", value: "CAI" },
  { displayName: "CSE", value: "CSE" },
  { displayName: "ECE", value: "ECE" },
  { displayName: "EEE", value: "EEE" },
];

const selectYear = [
  { displayName: "All", value: "All" },
  { displayName: "I", value: "I" },
  { displayName: "II", value: "II" },
  { displayName: "III", value: "III" },
  { displayName: "IV", value: "IV" },
];
const selectSection = [
  { displayName: "All", value: "All" },
  { displayName: "A", value: "A" },
  { displayName: "B", value: "B" },
  { displayName: "C", value: "C" },
  { displayName: "D", value: "D" },
];

const selectStatus = [
  { displayName: "All", value: "All" },
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];

const AllInternShips = () => {
  const [worklistparameters, setWorklistparameters] = useState({
    page: 1,
    size: 5,
    branch: "All",
    status:"All",
    year:"All",
    section:"All",
    rollno:'',
    studentName:'',
    companyName:'',
    domain:''
  });
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(true);
  const [workDetails, setWorkDeatils] = useState([]);
  const [label, setLabel] = useState("Internship");
  
  const [isgetWorkDetails, setisgetWorkDetails] = useState(false)
  useEffect(() => {
    if (!isgetWorkDetails) {
      getworkDeatils();
    }
  }, [worklistparameters]);

  const getworkDeatils = async () => {
    try {
      const responce = await api.post(
        `getWorkDeatils/all-works`,
        worklistparameters
      );
      setCount(responce.data.count);
      setWorkDeatils(responce.data.workDetails);
      setloading(false);
      setisgetWorkDetails(true)
    } catch (error) {
      ToastErrorMessage(error.message);
    }
  };

  const resetWorkDetails = async () => {
    setWorklistparameters({
      page: 1,
      size: 5,
      branch: "All",
      status: "All",
      year: "All",
      section: "All",
      rollno: "",
      studentName: "",
      companyName: "",
      domain: "",
    });

     try {
       const responce = await api.post(`getWorkDeatils/all-works`, {
         page: 1,
         size: 5,
       });
       setCount(responce.data.count);
       setWorkDeatils(responce.data.workDetails);
       setloading(false);
       setisgetWorkDetails(true);
     } catch (error) {
       ToastErrorMessage(error.message);
     }
  }

  const handleChangePage = (e, newPage) => {
    setWorklistparameters((prevState) => ({
      ...prevState,
      page: newPage + 1,
    }));
    setisgetWorkDetails(false);
  };

  const handleChangeRowsPerPage = (event) => {
    let row = event.target.value;
    setWorklistparameters((prevState) => ({
      ...prevState,
      size: row,
      page: 1,
    }));
    setisgetWorkDetails(false);

  };

  const [open, setOpen] = useState(false);
  const [singleWorkDetails, setSingleWorkDetails] = useState({
    addWorkAt: "",
    companyName: "",
    completionCertificatepath: "",
    domain: "",
    end_date: "",
    offerLetterpath: "",
    role: "",
    start_date: "",
    status: "",
    stipend: "",
    studentDetails: {},
    studentId: "",
    type: "",
    updatedWorkAt: "",
    _id: "",
  });
  const [studentDetails, setStudentDetails] = useState({
    branch: "",
    mailId: "",
    phoneNumber: "",
    rollno: "",
    studentName: "",
    year: "",
    _id: "",
    profile: "",
  });

  const handleClickOpen = async (id) => {
    setOpen(true);
    try {
      const responce = await api.get(`getWorkDeatils/single-work/${id}`, {
        id: id,
      });
      setSingleWorkDetails(responce.data);
      setStudentDetails(responce.data.studentDetails);
    } catch (error) {
      ToastErrorMessage(error.message);
    }
  };

  const onChnageInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setWorklistparameters((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleChangeDepartment = async (name) => {
    setloading(true)
    setWorklistparameters((pre) => ({
      ...pre,
      branch: name,
    }));
   try {
      const responce = await api.post(
        `getWorkDeatils/all-works`,
        worklistparameters
      );
      setCount(responce.data.count);
      setWorkDeatils(responce.data.workDetails);
      setloading(false);
    } catch (error) {
      ToastErrorMessage(error.message);
    }
    console.log(worklistparameters);
  };

  const handleOpenFilter = () => {
    document.querySelector(".filterInputsDiv")?.classList.toggle("open");
  };


  const searchWorkDetails = async () => {
    setloading(true)
    try {
      const responce = await api.post(
        `getWorkDeatils/all-works`,
        worklistparameters
      );
      setCount(responce.data.count);
      setWorkDeatils(responce.data.workDetails);
      setloading(false);
    } catch (error) {
      ToastErrorMessage(error.message);
    }
  };

  return (
    <div className="allWorksList">
      <div onClick={resetWorkDetails} className="allWorksResetBtn">
        <RotateLeftIcon fontSize="large" />
      </div>
      <div className="filterDiv">
        <div className="branchList">
          {selectBranch.map((branch, index) => (
            <div onClick={() => handleChangeDepartment(branch.value)}>
              <Button
                className={
                  worklistparameters.branch == branch.value
                    ? "branchBtn_active"
                    : "branchBtn"
                }
              >
                {branch.displayName}
              </Button>
            </div>
          ))}
        </div>
        <div className="filterIcon">
          <FilterAltIcon
            sx={{ color: "#4a159a", fontSize: 35 }}
            onClick={handleOpenFilter}
          />
        </div>
        <div className="filterInputsDiv" id="filterInputsDiv">
          <FormControl variant="outlined" size="small">
            <InputLabel>Roll No</InputLabel>
            <OutlinedInput
              value={worklistparameters.rollno}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="email"
              onChange={onChnageInputs}
              label="Roll No"
              name="rollno"
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Student Name</InputLabel>
            <OutlinedInput
              value={worklistparameters.studentName}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="email"
              onChange={onChnageInputs}
              label="Student Name"
              name="studentName"
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Company Name</InputLabel>
            <OutlinedInput
              value={worklistparameters.companyName}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="email"
              onChange={onChnageInputs}
              label="Company Name"
              name="companyName"
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Domain</InputLabel>
            <OutlinedInput
              value={worklistparameters.domain}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="text"
              onChange={onChnageInputs}
              label="Domain"
              name="domain"
            />
          </FormControl>
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              defaultValue={worklistparameters.status}
              id="demo-simple-select"
              label="Status"
              className="filterInputs"
              onChange={(e) => {
                setWorklistparameters((prevState) => ({
                  ...prevState,
                  status: e.target.value,
                }));
              }}
            >
              {selectStatus.map((option, index) => (
                <MenuItem key={`selectStatus=${index}`} value={option.value}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Year</InputLabel>
            <Select
              defaultValue={worklistparameters.year}
              id="demo-simple-select"
              label="Year"
              className="filterInputs"
              onChange={(e) => {
                setWorklistparameters((prevState) => ({
                  ...prevState,
                  year: e.target.value,
                }));
              }}
            >
              {selectYear.map((option, index) => (
                <MenuItem key={`selectStatus=${index}`} value={option.value}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Section</InputLabel>
            <Select
              defaultValue={worklistparameters.section}
              id="demo-simple-select"
              label="Section"
              className="filterInputs"
              onChange={(e) => {
                setWorklistparameters((prevState) => ({
                  ...prevState,
                  section: e.target.value,
                }));
              }}
            >
              {selectSection.map((option, index) => (
                <MenuItem key={`selectStatus=${index}`} value={option.value}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={searchWorkDetails}
            className="searchBtn"
            endIcon={<SearchIcon sx={{ fontSize: 40 }} />}
          >
            Search
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 620 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableHeader className="tableHeaderRow">
              <StyledTableCell>Student Deatils</StyledTableCell>
              <StyledTableCell>Internship Details</StyledTableCell>
              <StyledTableCell align="center">Project Name</StyledTableCell>
              <StyledTableCell align="center">Type / Stipend</StyledTableCell>
              <StyledTableCell align="center">Start/End Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </StyledTableHeader>
          </TableHead>
          {workDetails.length == 0 && !loading && (
            <p style={{ position: "absolute", color: "red", left: "45%" }}>
              No Data Found
            </p>
          )}
          {loading == true ? (
            <div style={{ position: "absolute", left: "50%" }}>
              <LoadingCircle />
            </div>
          ) : (
            <TableBody>
              {workDetails?.map((work, index) => (
                <StyledTableRow
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickOpen(work._id)}
                >
                  <StyledTableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Avatar
                        src={work.studentDetails?.profile}
                        sx={{
                          width: "60px",
                          height: "60px",
                          marginRight: 2,
                          fontSize: "60px",
                        }}
                      />
                      <div>
                        <p>{work.studentDetails.studentName}</p>
                        <p>{work.studentDetails.rollno}</p>
                        <p>
                          {work.studentDetails.branch}
                          {work.studentDetails.year}
                        </p>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p>{work.companyName}</p>
                    <p>{work.domain}</p>
                    <p>{work.role}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{work.projectName}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{work.type}</p>
                    <p>{work.stipend}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{work.start_date}</p>
                    <p>{work.end_date}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className={
                        work.status == "Not Started"
                          ? "NotStarted"
                          : work.status
                      }
                      style={{
                        textDecoration: "none",
                        width: "10rem",
                        height: "30px",
                        borderRadius: "30px",
                        color: "#fff",
                      }}
                    >
                      {work.status}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={worklistparameters.size}
            page={worklistparameters.page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </TableContainer>
      <ViewWorkDetails
        open={open}
        setOpen={setOpen}
        label={label}
        singleWorkDetails={singleWorkDetails}
        studentDetails={studentDetails}
      />
    </div>
  );
};

export default AllInternShips;
