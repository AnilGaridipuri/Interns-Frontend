import { Link } from "react-router-dom";
import { ApplicationConstant } from "../../constant/applicationConstant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const SuccessUpdatePassword = () => {
  return (
    <div>
      <div className="successIcon">
        <CheckCircleIcon size={10} />
      </div>
      <p className="successMessage">
        Successfully updated Your Password please Login{" "}
      </p>
      <div className="loginBtnDiv">
        <Link
          className="forgotpassBtn1"
          to={ApplicationConstant.LOGIN_URL_PATH}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SuccessUpdatePassword;
