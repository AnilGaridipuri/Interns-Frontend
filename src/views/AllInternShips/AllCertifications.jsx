import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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

const AllCertifications = (props) => {
    const [certificationlistparameters, setCertificationlistparameters] =
      useState({
        page: 1,
        size: 5,
      });
    const [count, setCount] = useState(1);
    const [loading, setloading] = useState(true);
    const [certificationDetails, setCertificationDeatils] = useState([]);
    const [label, setLabel] = useState("Certification");
    useEffect(() => {
      getcertificationDeatils();
    }, [certificationlistparameters]);

    const getcertificationDeatils = async () => {
      try {
        const responce = await api.post(
          `getCertificationDeatils/all-certifications`,
          certificationlistparameters
        );
        setCount(responce.data.count);
        setCertificationDeatils(responce.data.certificationDetails);
        setloading(false);
        console.log(responce.data.workDetails);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    };

    console.log(certificationDetails,"wlkgkw");

    const handleChangePage = (e, newPage) => {
      console.log(newPage, "pageNo");
      setCertificationlistparameters((prevState) => ({
        ...prevState,
        page: newPage + 1,
      }));
      setCount(true);
    };

    const handleChangeRowsPerPage = (event) => {
      let row = event.target.value;
      console.log(row, "row");
      setCertificationlistparameters((prevState) => ({
        ...prevState,
        size: row,
        page: 1,
      }));
      setCount(true);
    };

    const [open, setOpen] = useState(false);
    const [singlecertificationsDetails, setSinglecertificationsDeatils] =
        useState({
        addWorkAt: "",
        organizationName: "",
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
        console.log(id, "id wfewef");
        const responce = await api.get(
        `getCertificationDeatils/single-certification/${id}`,
        {
            id: id,
        }
        );
        setSinglecertificationsDeatils(responce.data);
        setStudentDetails(responce.data.studentDetails);
    } catch (error) {
        console.log(id, "id wfewef");
        ToastErrorMessage(error.message);
    }
    };

  return (
    <div className="allWorksList">
      <TableContainer component={Paper} sx={{ maxHeight: 620 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow
            >
              <StyledTableCell>Student Deatils</StyledTableCell>
              <StyledTableCell>Organization Name</StyledTableCell>
              <StyledTableCell align="center">Domain</StyledTableCell>
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
                    <p>{certification.domain}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p>{certification.start_date}</p>
                    <p>{certification.end_date}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      className={certification.status}
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
