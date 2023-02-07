import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const userLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
    toast.error("Çıkış yapıldı!");
  };
  if (isLoading) return <Loading />;
  return (
    <header className="fixed w-full z-50 top-0 bg-net p-4 flex  justify-between items-center">
      <Link to="/" className="md:text-4xl text-white">
        MTN ZRN
      </Link>
      <nav className="flex  items-center text-white justify-center">
        <Link to="/" className="md:px-4">
          <FontAwesomeIcon icon={faHome} /> Anasayfa
        </Link>
        <Link to="/contact" className="md:px-4">
          <FontAwesomeIcon icon={faMessage} /> İletişim
        </Link>
        {(user && user.length !== 0 && user.role === "admin" && (
          <Link to="/newcourse" className="md:px-4 text-white">
            <FontAwesomeIcon icon={faPlus} /> Kurs ekle
          </Link>
        )) ||
          undefined}
        {user ? (
          <div className="flex items-center text-white">
            <Link to="/dashboard" className="px-4">
              {user.name}
            </Link>
            <button className=" md:px-4" onClick={userLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Çıkış Yap
            </button>
          </div>
        ) : (
          <div className="flex gap-2 text-white">
            <Link to="/register" className="md:px-4 gap-1">
              <FontAwesomeIcon icon={faUser} /> Kayıt Ol
            </Link>
            <Link to="/login" className="md:px-4 gap-1">
              <FontAwesomeIcon icon={faSignInAlt} /> Giriş Yap
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
