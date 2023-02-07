import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import StudentDashboard from "../../components/studentDashboard/StudentDashboard";

const Dashboard = () => {
  const [dashBoardInfo, setDashBoardInfo] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        var config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "http://localhost:4000/users/dashboardPage",
          headers: {
            Authorization: token,
          },
        };
        const response = await axios(config);
        setDashBoardInfo(response.data.courses);
        setStudentInfo(response.data.user.courses);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="mt-16 flex flex-col p-2">
      <div className="mb-5 p-2">
        {studentInfo.length !== 0 ? (
          <h1 className="text-2xl text-white">Kayıt olduğunuz kurslar</h1>
        ) : (
          <h1 className="text-2xl text-white">Oluşturduğunuz kurslar</h1>
        )}
        {studentInfo.length !== 0 && (
          <StudentDashboard studentInfo={studentInfo} />
        )}
      </div>

      <>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashBoardInfo.length !== 0 &&
            dashBoardInfo.map((course, index) => {
              return (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-lg bg-white"
                >
                  <Link to={`/courses/find/${course.slug}`}>
                    <img
                      className="w-full object-cover h-48"
                      src={course.img}
                      alt={course.img}
                    />
                    <div className="p-4">
                      <h1 className="text-xl font-bold text-center">
                        {course.name}
                      </h1>
                      <p className="text-sm text-gray-600 text-center">
                        {course.desc}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </>
    </div>
  );
};
export default Dashboard;
