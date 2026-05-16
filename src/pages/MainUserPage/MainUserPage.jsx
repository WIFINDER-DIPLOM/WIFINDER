import { useNavigate } from "react-router-dom";
import NavBarMainPage from "../../components/NavBarMainPage/NavBarMainPage";
import Footer from "../../components/Footer/Footer.jsx";
function MainUserPage() {
  const navigate = useNavigate();
  const userLogin = localStorage.getItem("userLogin");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userLogin");
    navigate("/");
  };

  return (
    <>
      <NavBarMainPage userName={userLogin} />
      <Footer />
    </>
  );
}

export default MainUserPage;
