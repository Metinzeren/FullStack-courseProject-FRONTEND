import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.role
      ) {
        toast.error("Lütfen tüm alanları doldurun");
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/users/register",
        formData
      );
      console.log(res.data);
      navigate("/login");
      toast.success("Kullanıcı Başarıyla Oluşturuldu!");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <form
        onSubmit={createUser}
        className="bg-gray-900 shadow-md rounded-xl p-10 md:w-1/3"
      >
        <h2 className="text-lg mb-5 text-white font-bold">Kayıt Ol</h2>
        <input
          name="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 rounded border-2 border-gray-400 w-full block mb-5"
          type="text"
          placeholder="Adınız"
        />
        <input
          name="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="p-2 rounded border-2 border-gray-400 w-full block mb-5"
          type="email"
          placeholder="Email adresiniz"
        />
        <input
          name="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="p-2 rounded border-2 border-gray-400 w-full block mb-5"
          type="password"
          placeholder="Şifreniz"
        />
        <select
          name="role"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="p-2 rounded border-2 border-gray-400 w-full block mb-5"
        >
          <option value="student">Öğrenci</option>
          <option value="teacher">Öğretmen</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="p-2 rounded bg-white text-gray-900 w-full block"
        >
          Kayıt ol
        </button>
      </form>
    </div>
  );
};

export default Register;
