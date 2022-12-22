import { ApplicationConstant } from "../../constant/applicationConstant";
import { Link } from "react-router-dom";
import "./home.css"

const HomePage = () => {
  return (
    <div className="homeBody">
      <p>hello</p>
      <Link to={ApplicationConstant.LOGIN_URL_PATH}>Login</Link>
    </div>
  );
};

export default HomePage;
