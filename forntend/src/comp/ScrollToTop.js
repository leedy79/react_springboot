import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 또는 { top: 0, left: 0 }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
