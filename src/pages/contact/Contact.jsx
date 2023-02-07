import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!contactInfo.email || !contactInfo.name || !contactInfo.message) {
        toast.error("Lütfen tüm alanları doldur");
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await axios.post(
        "https://kursmeto.onrender.com/users/sendMail",
        {
          email: contactInfo.email,
          subject: "Website Contact Form",
          message: `Name: ${contactInfo.name}\nMessage: ${contactInfo.message}`,
        }
      );
      console.log(res.data);
      toast.success("Mesaj bana ulaştı!");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10 mt-32 rounded bg-white max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">İletişim Formu</h1>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            className="border border-gray-400 p-2 w-full"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            İsim
          </label>
          <input
            onChange={(e) =>
              setContactInfo({ ...contactInfo, name: e.target.value })
            }
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="message"
          >
            Mesaj
          </label>
          <textarea
            onChange={(e) =>
              setContactInfo({ ...contactInfo, message: e.target.value })
            }
            className="border border-gray-400 p-2 w-full"
            id="message"
            name="message"
            rows="4"
            required
          />
        </div>
        <button
          onClick={sendMessage}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default Contact;
