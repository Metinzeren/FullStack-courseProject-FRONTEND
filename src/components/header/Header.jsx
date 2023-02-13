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
  const [navItem, setNavItem] = useState("nav_item");
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

    //navIteö
    navItem === "nav_item"
      ? setNavItem("nav_item item_active")
      : setNavItem("nav_item");
  };
  if (isLoading) return <Loading />;
  return (
    <nav className="header w-full top-0  p-4 flex md:flex-row flex-col justify-between items-center">
      <Link to="/" className="md:text-4xl text-2xl text-black">
        MTN ZRN
      </Link>
      <ul className={active}>
        <li className={navItem}>
          <Link to="/" className="md:px-4 items-center text-black">
            <FontAwesomeIcon icon={faHome} /> Anasayfa
          </Link>
        </li>
        <li className={navItem}>
          <Link to="/contact" className="md:px-4 text-black">
            <FontAwesomeIcon icon={faMessage} /> İletişim
          </Link>
        </li>
        {(user && user.length !== 0 && user.role === "admin" && (
          <li className={navItem}>
            <Link to="/newcourse" className="md:px-4 text-black">
              <FontAwesomeIcon icon={faPlus} /> Kurs ekle
            </Link>
          </li>
        )) ||
          undefined}
        {user ? (
          <li className="flex  md:flex-row flex-col items-center text-black">
            <Link to="/dashboard" className="navItem px-4">
              {user.name}
            </Link>
            <button className="navItem md:px-4 text-black" onClick={userLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Çıkış Yap
            </button>
          </li>
        ) : (
          <li className="flex gap-2 md:flex-row flex-col text-black">
            <Link to="/register" className="navItem md:px-4 gap-1">
              <FontAwesomeIcon icon={faUser} /> Kayıt Ol
            </Link>
            <Link to="/login" className="navItem md:px-4 text-black gap-1">
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
