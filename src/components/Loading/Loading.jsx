import React from "react";

const Loading = ({ children, loading }) => {
  return loading ? (
    <div className="flex mt-40 justify-center" role="status">
      <svg
        aria-hidden="true"
        className="mr-2 w-16 h-16 text-white animate-spin dark:text-gray-600 fill-current"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="5"
          stroke="#fff"
        />
        <path
          d="M50 10
             a 40 40 0 0 1 0 80
             a 40 40 0 0 1 0 -80"
          fill="none"
          strokeWidth="5"
          strokeDasharray="150, 55"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#fff"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            repeatCount="indefinite"
            from="0"
            to="220"
          />
        </path>
      </svg>
      <span className="sr-only"></span>
    </div>
  ) : (
    children
  );
};

export default Loading;
