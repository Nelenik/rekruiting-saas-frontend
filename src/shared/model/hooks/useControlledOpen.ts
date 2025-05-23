import { useState, useRef, useEffect, RefObject } from "react";

interface IMenuOptions {
  initial: boolean;
  closeOutside?: boolean;
}

type UseControlledOpen = (options: IMenuOptions) => {
  handleClose: () => void;
  handleToggle: () => void;
  handleOpen: () => void;
  isOpen: boolean;
  controlledRef: RefObject<HTMLDivElement | null>;
};

/**
 * useControlledOpen is a reusable React hook for managing open/close state with optional outside-click handling.
 *
 * This hook is suitable for dropdowns, modals, drawers, tooltips, or any component that toggles visibility.
 *
 * @param {Object} options - Configuration options.
 * @param {boolean} options.initial - Initial open state (true = open, false = closed).
 * @param {boolean} [options.closeOutside=false] - If true, automatically closes when clicking outside the referenced element.
 *
 * @returns {Object} Control object with state and handlers.
 * @returns {() => void} return.handleOpen - Opens the component.
 * @returns {() => void} return.handleClose - Closes the component.
 * @returns {() => void} return.handleToggle - Toggles the open state.
 * @returns {boolean} return.isOpen - Current open state.
 * @returns {React.RefObject<HTMLDivElement>} return.controlledRef - Ref for the controlled DOM node (used for outside-click detection).
 *
 * @example
 * const {
 *   handleOpen,
 *   handleClose,
 *   handleToggle,
 *   isOpen,
 *   controlledRef,
 * } = useControlledOpen({ initial: false, closeOutside: true });
 *
 * return (
 *   <>
 *     <button onClick={handleToggle}>Toggle Panel</button>
 *     {isOpen && (
 *       <div ref={controlledRef}>
 *         <p>Panel Content</p>
 *         <button onClick={handleClose}>Close</button>
 *       </div>
 *     )}
 *   </>
 * );
 */

export const useControlledOpen: UseControlledOpen = ({
  initial,
  closeOutside = false,
}) => {
  const [isOpen, setIsOpen] = useState(initial);
  const controlledRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((state) => !state);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!closeOutside) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        controlledRef.current &&
        !controlledRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
    isOpen,
    controlledRef,
  };
};
