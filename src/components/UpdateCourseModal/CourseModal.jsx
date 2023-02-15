import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import Loading from "../Loading/Loading";
import axios from "axios";

const CourseModal = ({ index, courseID }) => {
  const [visibleMap, setVisibleMap] = useState({});
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    desc: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const courseUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!courseInfo.name || !courseInfo.desc || !courseInfo.img) {
        toast.error("Lütfen tüm alanları doldurun");
        setLoading(false);
        return;
      }

      await axios.put(
        `https://kursmeto.onrender.com/courses/${courseID}`,
        courseInfo,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      toast.success("Kurs başarıyla güncellendi!");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <Loading loading={loading}>
      <div className="card flex justify-content-center">
        <FontAwesomeIcon
          className="cursor-pointer text-xl"
          icon={faEdit}
          onClick={() => setVisibleMap({ ...visibleMap, [index]: true })}
        />
        <Dialog
          header="Kursu Güncelle"
          visible={visibleMap[index]}
          onHide={() => setVisibleMap({ ...visibleMap, [index]: false })}
          style={{ width: "50vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          <form className="w-full max-w-lg" onSubmit={courseUpdate}>
            <div className="flex flex-col mb-4">
              <label
                className="text-lg text-black font-medium mb-2"
                htmlFor="name"
              >
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
              <label
                className="text-lg text-black font-medium mb-2"
                htmlFor="desc"
              >
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
              <label
                className="text-lg text-black font-medium mb-2"
                htmlFor="img"
              >
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
              Güncelle
            </button>
          </form>
        </Dialog>
      </div>
    </Loading>
  );
};

export default CourseModal;
