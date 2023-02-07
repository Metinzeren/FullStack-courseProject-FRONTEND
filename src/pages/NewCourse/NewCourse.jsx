import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NewCourse = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    desc: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const addCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!courseInfo.name || !courseInfo.desc || !courseInfo.img) {
        toast.error("Lütfen tüm alanları doldurun");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://kursmeto.onrender.com/courses",
        courseInfo,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response, "reponse");
      setLoading(false);
      toast.success("Kurs başarıyla eklendi");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="mt-24 p-1 flex flex-col items-center">
      <form className="w-full max-w-lg" onSubmit={addCourse}>
        <div className="flex flex-col mb-4">
          <label className="text-lg text-white font-medium mb-2" htmlFor="name">
            Kurs ismi
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            value={courseInfo.name}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg text-white font-medium mb-2" htmlFor="desc">
            Kurs açıklaması
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="desc"
            type="text"
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, desc: e.target.value })
            }
            value={courseInfo.desc}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg text-white font-medium mb-2" htmlFor="img">
            Kurs resmi
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="img"
            type="text"
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, img: e.target.value })
            }
            value={courseInfo.img}
          />
        </div>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Ekle
        </button>
      </form>
    </div>
  );
};

export default NewCourse;
