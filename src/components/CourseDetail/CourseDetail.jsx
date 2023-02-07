import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Auths } from "../../redux/slices/AuthSlice";
import { motion } from "framer-motion";
const CourseDetail = () => {
  const { user } = useSelector(Auths);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const slug = location.pathname.split("/")[3];

  useEffect(() => {
    const getSingleCourse = async () => {
      const response = await axios.get(
        `https://kursmeto.onrender.com/courses/find/${slug}`
      );
      setCourse(response.data);
    };
    getSingleCourse();
  }, []);

  const handleEnroll = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);
    const enrollCourseID = course._id;

    try {
      const response = await axios.post(
        "https://kursmeto.onrender.com/courses/enroll",
        { course_id: enrollCourseID },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      toast.success("Kursa kayıt olundu");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);
    const leaveCourseID = course._id;
    try {
      const response = await axios.post(
        "https://kursmeto.onrender.com/leaveCourse",
        { course_id: leaveCourseID },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      setLoading(false);
      toast.success("Kurs başarıyla bırakıldı");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-16">
      {course && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl">
            <div className="flex items-center mb-6">
              <img
                className="w-64 h-64 object-cover  rounded-full"
                src={course.img}
                alt={course.name}
              />
              <div className="ml-6">
                <h2 className="text-2xl font-medium mb-2">{course.name}</h2>
                <p className="text-gray-600">{course.desc}</p>
              </div>
            </div>
            {user && user.role === "student" ? (
              user.courses.includes(course._id) ? (
                <button
                  onClick={handleLeave}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  } bg-indigo-500 hover:bg-indigo-700 text-white text-center font-bold py-2 px-4 rounded m-2`}
                >
                  Kursu bırak
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  } bg-indigo-500 hover:bg-indigo-700 text-white text-center font-bold py-2 px-4 rounded m-2`}
                >
                  Kayıt ol
                </button>
              )
            ) : null}
            {!user && <h1>Kayıt olmak için giriş yapmalısınız</h1>}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CourseDetail;
