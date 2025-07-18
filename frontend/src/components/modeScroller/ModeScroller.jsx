import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./ModeScroller.scss";
import { setMode } from "../../slicers/mode/modeSlice";
import { useLocation, useNavigate } from "react-router-dom";

const ModeScroller = ({ modes = [] }) => {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Scroll-based active index detection
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

  const location = useLocation();
  // Click to scroll into view
  const handleClick = (index) => {
  const mode = modes[index];
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


  //change to default portfolio

 useEffect(() => {
  const defaultIndex = modes.findIndex((m) => m === "portfolio");
  const item = scrollerRef.current?.children[defaultIndex];
  if (item) {
    item.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }
}, [modes]);


  return (
    <div className="mode-wrapper">
      <div className="mode-scroller" ref={scrollerRef}>
        {modes.map((mode, index) => (
          <div
            key={index}
            className={`mode-title ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1) + " Website"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeScroller;
