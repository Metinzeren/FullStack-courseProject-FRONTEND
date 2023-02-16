import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auths, login } from "../../redux/slices/AuthSlice";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../components/Loading/Loading";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector(Auths);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(formData));
      if (response.error) {
        throw new Error(response.error);
      }
      toast.success("Giriş yapıldı");
      navigate("/");
    } catch (error) {
      toast.error("Kullanıcı adı veya şifre yanlış, tekrar dener misin?");
    }
  };
  return (
    <Loading loading={isLoading}>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-xs">
          <form
            onSubmit={userLogin}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Şifre
              </label>
              <div className="relative">
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifre"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <FontAwesomeIcon
                  className="absolute right-0 top-2 mr-3 mt-1 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={faEye}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Giriş yap
              </button>
            </div>
          </form>
        </div>
      </div>
    </Loading>
  );
};

export default Login;
