import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ModeScroller.scss";
import { setMode } from "../../slicers/mode/modeSlice";
import { useLocation, useNavigate } from "react-router-dom";

const ModeScroller = ({ modes = [] }) => {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  // Add Admin mode ONLY if user is admin
  const extendedModes = [...modes];
  if (user?.role === "admin") {
    extendedModes.push("admin-website");
  }

  useEffect(() => {
    const container = scrollerRef.current;
    const handleScroll = () => {
      const children = Array.from(container.children);
      const containerRect = container.getBoundingClientRect();
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (index) => {
    const mode = extendedModes[index];

    if (mode === "admin-website") {
      navigate("/admin");
      return;
    }

    const path = mode === "portfolio" ? "/" : `/${mode}`;
    if (path === location.pathname) return;

    const item = scrollerRef.current.children[index];
    item.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    dispatch(setMode(mode));
    navigate(path);
    setActiveIndex(index);
  };

  useEffect(() => {
    const defaultIndex = extendedModes.findIndex((m) => m === "portfolio");
    const item = scrollerRef.current?.children[defaultIndex];
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [extendedModes]);

  return (
    <div className="mode-wrapper">
      <div className="mode-scroller" ref={scrollerRef}>
        {extendedModes.map((mode, index) => {
          let displayName = mode.charAt(0).toUpperCase() + mode.slice(1);
          if (mode === "admin-website") displayName = "Admin Website";
          else displayName += " Website";

          return (
            <div
              key={index}
              className={`mode-title ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModeScroller;
