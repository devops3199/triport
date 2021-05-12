import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <>
      <Loader
        type="Oval"
        color="#3d66ba"
        height={30}
        width={30}
        timeout={3000}
      />
    </>
  );
};

export default Spinner;
