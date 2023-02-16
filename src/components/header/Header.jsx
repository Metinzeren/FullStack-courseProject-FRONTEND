import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auths, logout } from "../../redux/slices/AuthSlice";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, isLoading } = useSelector(Auths);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState("nav_toggler");
  const userLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
    toast.error("Çıkış yapıldı!");
  };
  const navToggle = () => {
    active === "nav_menu"
      ? setActive("nav_menu nav_active")
      : setActive("nav_menu");

    //togleicon
    toggleIcon === "nav_toggler"
      ? setToggleIcon("nav_toggler toggle")
      : setToggleIcon("nav_toggler");
  };
  if (isLoading) return <Loading />;
  return (
    <nav className="header w-full top-0  p-4 flex md:flex-row flex-col justify-between items-center">
      <Link to="/" className="md:text-4xl text-2xl text-black">
        MTN ZRN
      </Link>
      <ul className={active}>
        <li>
          <Link to="/" className="md:px-4 items-center text-black">
            <FontAwesomeIcon icon={faHome} /> Anasayfa
          </Link>
        </li>
        <li>
          <Link to="/contact" className="md:px-4 text-black">
            <FontAwesomeIcon icon={faMessage} /> İletişim
          </Link>
        </li>
        {(user &&
          user.length !== 0 &&
          (user.role === "admin" || user.role === "teacher") && (
            <li>
              <Link to="/newcourse" className="md:px-4 text-black">
                <FontAwesomeIcon icon={faPlus} /> Kurs ekle
              </Link>
            </li>
          )) ||
          undefined}
        {user ? (
          <li className="flex gap-5 items-start md:flex-row flex-col text-black">
            <Link to="/dashboard" className="  md:px-4">
              {user.name}
            </Link>
            <button className=" md:px-4  text-black" onClick={userLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Çıkış Yap
            </button>
          </li>
        ) : (
          <li className="flex gap-5 md:flex-row flex-col text-black">
            <Link to="/register" className=" md:px-4 gap-1">
              <FontAwesomeIcon icon={faUser} /> Kayıt Ol
            </Link>
            <Link to="/login" className=" md:px-4 text-black gap-1">
              <FontAwesomeIcon icon={faSignInAlt} /> Giriş Yap
            </Link>
          </li>
        )}
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Header;
