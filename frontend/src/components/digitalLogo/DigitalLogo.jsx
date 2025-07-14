// DigitalLogo.jsx
import React, { useEffect, useState } from "react";
import "./DigitalLogo.scss";

const DIGITAL_TEXT = "Digital Platform";

const DigitalLogo = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setDisplayText(DIGITAL_TEXT.slice(0, index));
      index++;

      if (index > DIGITAL_TEXT.length) {
        clearInterval(typing);
        setTimeout(() => {
          setGlitchActive(true);
          setTimeout(() => {
            onComplete?.(); // 🔥 Notify when glitch is done
          }, 1000);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [onComplete]);

  return (
    <div className="logo-container">
      <span className={`digital-logo ${glitchActive ? "glow-glitch" : ""}`}>
        {displayText}
      </span>
    </div>
  );
};

export default DigitalLogo;
