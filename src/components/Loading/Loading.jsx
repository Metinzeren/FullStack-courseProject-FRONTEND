import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Loading = ({ children, loading }) => {
  return loading ? (
    <div className="card mt-40 flex justify-content-center">
      <ProgressSpinner />
    </div>
  ) : (
    children
  );
};

export default Loading;
