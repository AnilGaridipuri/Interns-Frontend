import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { api } from "../../axios/api.config";
import { ToastErrorMessage } from "../../uitils/toastMessage";
import "./allinternship.css";
import { Avatar, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TablePagination } from "@mui/material";
import LoadingCircle from "../../components/loading";
import ViewWorkDetails from "../../components/viewWorkDeatil";
import { StyledTableCell, StyledTableRow } from "../../components/tablestyles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";


const selectBranch = [
  { displayName: "All", value: "All" },
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
  { displayName: "E", value: "E" },
  { displayName: "F", value: "F" },
];


const selectStatus = [
  { displayName: "All", value: "All" },
  { displayName: "Ongoing", value: "Ongoing" },
  { displayName: "Completed", value: "Completed" },
  { displayName: "Not Started", value: "Not Started" },
];


const AllCertifications = (props) => {
  const [certificationlistparameters, setCertificationlistparameters] =
    useState({
      page: 1,
      size: 5,
      branch: "All",
      status: "All",
      year: "All",
      section: "All",
      rollno: "",
      studentName: "",
      organizationName: "",
      certificationName: "",
    });

  const [count, setCount] = useState(1);
  const [loading, setloading] = useState(true);
  const [certificationDetails, setCertificationDeatils] = useState([]);
  const [label, setLabel] = useState("Certification");
  const [gotCertificationDetails, setGotCertificationDetails] = useState(false);

  useEffect(() => {
    if (!gotCertificationDetails) {
      getcertificationDeatils();
    }
  }, [certificationlistparameters]);

  const getcertificationDeatils = async () => {
    setloading(true)
    try {
      const response = await api.post(
        `getCertificationDeatils/all-certifications`,
        certificationlistparameters
      );
      setCount(response.data.count);
      setCertificationDeatils(response.data.certificationDetails);
      setloading(false);
      setGotCertificationDetails(true);
      // console.log(response.data.workDetails);
    } catch (error) {
      ToastErrorMessage(error.message);
    }
  };

  const resetCertificationDetails = async () => {
    setCertificationlistparameters({
      page: 1,
      size: 5,
      branch: "All",
      status: "All",
      year: "All",
      section: "All",
      rollno: "",
      studentName: "",
      organizationName: "",
      certificationName: "",
    });
    setGotCertificationDetails(false)
  };

  // console.log(certificationDetails, "wlkgkw");

  const handleChangePage = (e, newPage) => {
    // console.log(newPage, "pageNo");
    setCertificationlistparameters((prevState) => ({
      ...prevState,
      page: newPage + 1,
    }));
    setGotCertificationDetails(false);
  };

  const handleChangeRowsPerPage = (event) => {
    let row = event.target.value;
    // console.log(row, "row");
    setCertificationlistparameters((prevState) => ({
      ...prevState,
      size: row,
      page: 1,
    }));
    setGotCertificationDetails(false);
  };

  const [open, setOpen] = useState(false);
  const [singlecertificationsDetails, setSinglecertificationsDeatils] =
    useState({
      addWorkAt: "",
      organizationName: "",
      certificationName: "",
      completionCertificatepath: "",
      domain: "",
      end_date: "",
      start_date: "",
      status: "",
      studentDetails: {},
      studentId: "",
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

  const handleClickOpenCertificationDetails = async (id) => {
    setOpen(true);
    setLabel("Certification");
    try {
      // console.log(id, "id wfewef");
      const response = await api.get(
        `getCertificationDeatils/single-certification/${id}`,
        {
          id: id,
        }
      );
      setSinglecertificationsDeatils(response.data);
      setStudentDetails(response.data.studentDetails);
    } catch (error) {
      // console.log(id, "id wfewef");
      ToastErrorMessage(error.message);
    }
  };

    const onChnageInputs = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setCertificationlistparameters((pre) => ({
        ...pre,
        [name]: value,
      }));
    };

    const handleChangeDepartment = async (name) => {
      setloading(true);
      setCertificationlistparameters((pre) => ({
        ...pre,
        branch: name,
      }));
    };

    useEffect(()=>{
      getcertificationDeatils();
    },[certificationlistparameters.branch])

    const handleOpenFilter = () => {
      document.querySelector(".filterInputsDiv")?.classList.toggle("open");
    };

  return (
    <div className="allWorksList">
      <div onClick={resetCertificationDetails} className="allWorksResetBtn">
        <RotateLeftIcon fontSize="large" />
      </div>
      <div className="filterDiv">
        <div className="branchList">
          {selectBranch.map((branch, index) => (
            <div onClick={() => handleChangeDepartment(branch.value)}>
              <Button
                className={
                  certificationlistparameters.branch === branch.value
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
              value={certificationlistparameters.rollno}
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
              value={certificationlistparameters.studentName}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="email"
              onChange={onChnageInputs}
              label="Student Name"
              name="studentName"
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Organization Name</InputLabel>
            <OutlinedInput
              value={certificationlistparameters.organizationName}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="email"
              onChange={onChnageInputs}
              label="Organization Name"
              name="organizationName"
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Certification Name</InputLabel>
            <OutlinedInput
              value={certificationlistparameters.certificationName}
              className="filterInputs"
              id="outlined-adornment-Email"
              type="text"
              onChange={onChnageInputs}
              label="Certification Name"
              name="certificationName"
            />
          </FormControl>
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              defaultValue={certificationlistparameters.status}
              value={certificationlistparameters.status}
              id="demo-simple-select"
              label="Status"
              className="filterInputs"
              onChange={(e) => {
                setCertificationlistparameters((prevState) => ({
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
              defaultValue={certificationlistparameters.year}
              value={certificationlistparameters.year}
              id="demo-simple-select"
              label="Year"
              className="filterInputs"
              onChange={(e) => {
                setCertificationlistparameters((prevState) => ({
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
              defaultValue={certificationlistparameters.section}
              value={certificationlistparameters.section}
              id="demo-simple-select"
              label="Section"
              className="filterInputs"
              onChange={(e) => {
                setCertificationlistparameters((prevState) => ({
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
            onClick={getcertificationDeatils}
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
            <TableRow>
              <StyledTableCell>Student Deatils</StyledTableCell>
              <StyledTableCell>Organization Name</StyledTableCell>
              <StyledTableCell align="center">
                Certification Name
              </StyledTableCell>
              <StyledTableCell align="center">Start/End Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          {certificationDetails.length === 0 && !loading && (
            <p style={{ position: "absolute", color: "red", left: "45%" }}>
              No Data Found
            </p>
          )}
          {loading === true ? (
            <div style={{ position: "absolute", left: "50%" }}>
              <LoadingCircle />
            </div>
          ) : (
            <TableBody>
              {certificationDetails?.map((certification, index) => (
                <StyledTableRow
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleClickOpenCertificationDetails(certification._id)
                  }
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
                        src={certification.studentDetails?.profile}
                        sx={{
                          width: "60px",
                          height: "60px",
                          marginRight: 2,
                          fontSize: "60px",
                        }}
                      />
                      <div>
                        <p>{certification.studentDetails.studentName}</p>
                        <p>{certification.studentDetails.rollno}</p>
                        <p>
                          {certification.studentDetails.branch}
                          {certification.studentDetails.year}
                        </p>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <p>{certification.organizationName}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{certification.certificationName}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{certification.start_date}</p>
                    <p>{certification.end_date}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className={
                        certification.status === "Not Started"
                          ? "NotStarted"
                          : certification.status
                      }
                      style={{
                        textDecoration: "none",
                        width: "10rem",
                        height: "30px",
                        borderRadius: "30px",
                        color: "#fff",
                      }}
                    >
                      {certification.status}
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
            rowsPerPage={certificationlistparameters.size}
            page={certificationlistparameters.page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </TableContainer>
      <ViewWorkDetails
        open={open}
        setOpen={setOpen}
        singlecertificationsDetails={singlecertificationsDetails}
        studentDetails={studentDetails}
        label={label}
      />
    </div>
  );
};

export default AllCertifications;
