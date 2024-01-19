import { useState, useEffect } from "react";

const useWindowResize = (breakpoint = 640) => {
  const [isCollapsed, setIsCollapsed] = useState(
    window.innerWidth <= breakpoint,
  );

  const handleResize = () => {
    setIsCollapsed(window.innerWidth <= breakpoint);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isCollapsed;
};

export default useWindowResize;
