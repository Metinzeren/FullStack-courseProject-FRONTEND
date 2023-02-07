import React from "react";
import { Link } from "react-router-dom";

const CourseList = ({ course }) => {
  return (
    <div className="flex flex-col items-center md:w-96 m-3 bg-white p-5 rounded-lg shadow-lg">
      <Link to={`/courses/find/${course.slug}`}>
        <img className="w-full rounded-md" src={course.img} alt={course.img} />
        <h2 className="text-xl font-bold mt-3 text-kremUyum">{course.name}</h2>
        <p className="text-sm text-kremUyum mt-2">{course.desc}</p>
      </Link>
    </div>
  );
};

export default CourseList;
