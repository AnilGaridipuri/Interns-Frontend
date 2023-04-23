import React, { useState, useEffect } from "react";
import AccountHeader from "../../../components/accountHeader";
import { ToastErrorMessage, ToastSuccessMessage } from "../../../uitils/toastMessage";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { api } from "../../../axios/api.config";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import LoadingCircle from "../../../components/loading";
import { textAlign } from "@mui/system";
import EditCertification from "../../../components/editCertification";

const MyCertificates = () => {
  const { _id } = useSelector((state) => state.authReducer);
  const [getworkDetails, setGetworkDetails] = useState(false);
  const [workDetails, setWorkDeatils] = useState([]);
  const [certificationsDetails, setCertificationsDeatils] = useState([]);
  const [userDetails, setUserDeatils] = useState({});
  const [isUser, setIsUser] = useState(_id === userDetails._id);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [completionCertificatepath, setCompletionCertificatepath] = useState("")

  console.log(isUser, "is user");

  useEffect(() => {
    if (!getworkDetails) {
      getUserDeatils();
      getcertificationDeatils();
    }
    setIsUser(_id === userDetails._id);
  }, [userDetails, certificationsDetails]);

  const getcertificationDeatils = async () => {
    if (params.id) {
      setGetworkDetails(true);
      try {
        const {data} = await api.post(
          `getCertificationDeatils/student-certifications`,
          {
            id: params.id,
          }
        );
        setLoading(false);
        setCertificationsDeatils(data);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };

  const getUserDeatils = async () => {
    if (params.id) {
      try {
        const responce = await api.post(`auth/user`, {
          id: params.id,
        });
        setIsUser(_id == responce.data._id);
        setUserDeatils(responce.data);
      } catch (error) {
        ToastErrorMessage(error.message);
      }
    }
  };


  return (
    <div>
      {loading === true ? (
        <LoadingCircle />
      ) : (
        <div className="intershipsbody intershipCertificationBackGround">
          <AccountHeader label="Certifications" />
          {certificationsDetails.length != 0 ? (
            <div className="certificatesDiv">
              {certificationsDetails?.map((certification, index) => (
                <Card key={index} className="certificatesCard">
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <p className="intershipTitle certificationTitle">Certification Details</p>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <label style={{ fontWeight: "bold", width: "40px" }}>
                          Status
                        </label>
                        <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
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
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px" }}>
                        <label style={{ fontWeight: "bold", width: "150px" }}>
                          Organization Name
                        </label>
                        <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                        <p>{certification.organizationName}</p>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <label style={{ fontWeight: "bold", width: "150px" }}>
                          Certification Name
                        </label>
                        <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                        <p>{certification.certificationName}</p>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <label style={{ fontWeight: "bold", width: "150px" }}>
                          Start Date
                        </label>
                        <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                        <p>{certification.start_date}</p>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <label style={{ fontWeight: "bold", width: "150px" }}>
                          End Date
                        </label>
                        <p style={{ fontWeight: "bold", width: "5px" }}>:</p>
                        <p>{certification.end_date}</p>
                      </div>
                    </div>
                  </CardContent>

                  {certification.completionCertificatepath ? (
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={certification.completionCertificatepath}
                      style={{
                        minHeight: "400px",
                        maxHeight: "400px",
                        maxWidth: "97%",
                        objectFit: "fill",
                        boxShadow: "0 0px 3px 1px grey",
                        margin: "auto 10px",
                        padding: "5px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "400px",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      {certification.status == "Completed" ? (
                        <div className="addInternInputs">
                          <p style={{ color: "red" }}>
                            {isUser ? "Please upload " : null}
                            Completion Certificate.
                          </p>
                        </div>
                      ) : (
                        <p style={{ color: "red" }}>
                          This Certification is Not Completed Yet.
                          {isUser ? "If Completed, Please Update " : null}
                        </p>
                      )}
                    </div>
                  )}
                  {isUser ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px  0px",
                      }}
                    >
                      <EditCertification
                        certificationDetails={certification}
                        setCertificationsDeatils={setCertificationsDeatils}
                      />
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          ) : (
            <div
              style={{
                color: "white",
                textAlign: "center",
                padding: "30px 0px",
                fontSize: "20px",
              }}
            >
              <p>No Certifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
