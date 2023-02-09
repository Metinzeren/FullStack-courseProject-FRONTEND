import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ courses }) => {
  return (
    <div className="mt-16 flex flex-col p-2">
      {/* <h1 className="text-3xl text-white">Kategoriler</h1> */}
      <div className="flex flex-wrap">
        {courses.length !== 0 &&
          courses.data.categories.map((item, index) => {
            return (
              <Link
                key={index}
                to={`courses?categories=${item.slug}`}
                className="bg-indigo-500 hover:bg-indigo-700 text-white text-center font-bold py-2 px-4 rounded m-2"
              >
                {item.name}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
