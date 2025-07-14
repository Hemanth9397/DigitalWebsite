// AppWrapper.jsx
import React, { useState } from "react";
import App from "./App";
import DigitalLogo from "./components/digitalLogo/DigitalLogo";

const AppWrapper = () => {
  const [logoDone, setLogoDone] = useState(false);

  return (
    <>
      {!logoDone ? (
        <DigitalLogo onComplete={() => setLogoDone(true)} />
      ) : (
        <App />
      )}
    </>
  );
};

export default AppWrapper;
