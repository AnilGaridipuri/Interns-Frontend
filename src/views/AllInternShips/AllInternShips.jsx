import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { api } from "../../axios/api.config";
import { ToastErrorMessage } from "../../uitils/toastMessage";
import { capitalizeFirstLetter } from "../../uitils/jsFunctions";
import "./allinternship.css";
import { Avatar, Button, TablePagination } from "@mui/material";
import LoadingCircle from "../../components/loading";
import ViewWorkDetails from "../../components/viewWorkDeatil";
import { StyledTableCell, StyledTableRow } from "../../components/tablestyles";
import AllCertifications from "./AllCertifications";

const AllInternShips = () => {
  const [worklistparameters, setWorklistparameters] = useState({
    page: 1,
    size: 5,
  });
  const [count, setCount] = useState(1);
  const [loading, setloading] = useState(true);
  const [workDetails, setWorkDeatils] = useState([]);
  const [label, setLabel] = useState("Internship");
  useEffect(() => {
    getworkDeatils();
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
      console.log(responce.data.workDetails);
    } catch (error) {
      ToastErrorMessage(error.message);
    }
  };

  const handleChangePage = (e, newPage) => {
    console.log(newPage, "pageNo");
    setWorklistparameters((prevState) => ({
      ...prevState,
      page: newPage + 1,
    }));
    setCount(true);
  };

  const handleChangeRowsPerPage = (event) => {
    let row = event.target.value;
    console.log(row, "row");
    setWorklistparameters((prevState) => ({
      ...prevState,
      size: row,
      page: 1,
    }));
    setCount(true);
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
    _id: ""});
  const [studentDetails, setStudentDetails] = useState(
    {
      branch: "",
      mailId: "",
      phoneNumber: "",
      rollno: "",
      studentName: "",
      year: "",
      _id: "",
      profile:""
    }
  );

  console.log("jwhfbw");
  console.log("jwhfbw");

  const handleClickOpen = async (id) => {
    setOpen(true);
    setLabel("Internship");
    try {
      console.log(id,"id wfewef")
      const responce = await api.get(
        `getWorkDeatils/single-work/${id}`,
        { id: id }
      );
        console.log(responce.data,"wfwfwfwfwfwf")
        setSingleWorkDetails(responce.data);
        setStudentDetails(responce.data.studentDetails);
        console.log(responce.data.studentDetails);
      } catch (error) {
      console.log(id,"id wfewef")
      ToastErrorMessage(error.message);
    }
  };

  return (
    <div className="allWorksList">
      <TableContainer component={Paper} sx={{ maxHeight: 620 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Student Deatils</StyledTableCell>
              <StyledTableCell>Internship Details</StyledTableCell>
              <StyledTableCell align="center">Type / Stipend</StyledTableCell>
              <StyledTableCell align="center">Start/End Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
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
                        gap: "30px",
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
                    <p>{work.type}</p>
                    <p>{work.stipend}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{work.start_date}</p>
                    <p>{work.end_date}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className={work.status}
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
      </TableContainer>
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
      <AllCertifications studentDetails={studentDetails}/>
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
