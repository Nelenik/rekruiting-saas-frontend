import { useState, useRef, useEffect, RefObject } from "react";

interface IMenuOptions {
  initial: boolean;
  closeOutside?: boolean;
}

type UseSidebarControl = (options: IMenuOptions) => {
  handleClose: () => void;
  handleToggle: () => void;
  handleOpen: () => void;
  isSidebarOpen: boolean;
  sidebarRef: RefObject<HTMLDivElement | null>;
};

/**
 * A custom hook to manage the state and behavior of a sidebar component.
 *
 * @param {Object} options - Configuration options for the hook.
 * @param {boolean} options.initial - The initial state of the sidebar (open or closed).
 * @param {boolean} [options.closeOutside=false] - Determines whether the sidebar should close when clicking outside of it.
 *
 * @returns {Object} An object containing state and methods for controlling the sidebar.
 * @returns {() => void} return.handleClose - Closes the sidebar.
 * @returns {() => void} return.handleToggle - Toggles the open/close state of the sidebar.
 * @returns {() => void} return.handleOpen - Opens the sidebar.
 * @returns {boolean} return.isSidebarOpen - The current open state of the sidebar.
 * @returns {React.RefObject<HTMLDivElement>} return.sidebarRef - A reference to the sidebar DOM element, used for outside click detection.
 *
 * @example
 * const {
 *   handleClose,
 *   handleToggle,
 *   handleOpen,
 *   isSidebarOpen,
 *   sidebarRef,
 * } = useSidebarControl({ initial: false, closeOutside: true });
 *
 * return (
 *   <div>
 *     <button onClick={handleToggle}>Toggle Sidebar</button>
 *     {isSidebarOpen && (
 *       <div ref={sidebarRef}>
 *         <p>Sidebar Content</p>
 *         <button onClick={handleClose}>Close Sidebar</button>
 *       </div>
 *     )}
 *   </div>
 * );
 */

const useSidebarControl: UseSidebarControl = ({
  initial,
  closeOutside = false,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(initial);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsSidebarOpen((state) => !state);
  };

  const handleOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (!closeOutside) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOutside]);
  return {
    handleClose,
    handleToggle,
    handleOpen,
    isSidebarOpen,
    sidebarRef,
  };
};

export default useSidebarControl;
