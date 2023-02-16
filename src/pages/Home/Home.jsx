import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CourseList from "../../components/CourseList/CourseList";
import Categories from "../../components/Categories/Categories";
import Loading from "../../components/Loading/Loading";
import { motion } from "framer-motion";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://kursmeto.onrender.com/courses"
        );
        setCourses(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, []);

  return (
    <Loading loading={loading}>
      <div className="flex flex-col items-center mt-24">
        <h1 className="text-5xl text-center font-bold mb-5 text-white">
          KURSLAR
        </h1>
        <Categories courses={courses} />
        <div className="flex flex-wrap mt-5">
          {courses &&
            courses.length !== 0 &&
            courses.data.courses.map((course, index) => {
              return (
                <motion.div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 p-5"
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="rounded-lg  ">
                    <CourseList course={course} />
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
      <Footer />
    </Loading>
  );
};

export default Home;
