import { useState, useRef, useEffect } from "react";

const useSidebarControl = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showText, setShowText] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const handleOpen = () => {
    setIsSidebarOpen((state) => !state);
  };
  //side effect to timeout text on opening
  useEffect(() => {
    if (isSidebarOpen) {
      const timeout = setTimeout(() => setShowText(true), 150);
      return () => clearTimeout(timeout);
    } else {
      setShowText(false);
    }
  }, [isSidebarOpen]);

  // // Close sidebar on Escape key press
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  // // Close sidebar on outside click
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       sidebarRef.current &&
  //       !sidebarRef.current.contains(event.target as Node)
  //     ) {
  //       setIsSidebarOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return {
    handleOpen,
    isSidebarOpen,
    showText,
    sidebarRef,
  };
};

export default useSidebarControl;
