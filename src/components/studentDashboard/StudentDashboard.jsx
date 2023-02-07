import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = ({ studentInfo }) => {
  return (
    <div className="mt-12 flex flex-col p-2">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {studentInfo.length !== 0 &&
          studentInfo.map((course, index) => {
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
    </div>
  );
};

export default StudentDashboard;
