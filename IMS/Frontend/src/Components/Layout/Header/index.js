import Logo from "../../../assets/images/Dharamsinh_Desai_University_logo.png";
import "../../../Styles/header.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
 
const Index = () => {
  return (
    <div className="fe-header">
      <div className="fe-header-title">
        <img src={Logo} />
        <h2>Dharmsinh Desai University</h2>
      </div>
      {/* <div className="fe-header-profile">
        <AccountCircleRoundedIcon fontSize="large" className="fe-header-profile-logo"/>
      </div> */}
    </div>
  );
};

export default Index;
