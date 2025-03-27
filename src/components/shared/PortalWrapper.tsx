'use client'

import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type TProps = {
  children: ReactNode;
  targetSelector: string;
};

/**
* Portal wrapper component for rendering children in a specific DOM element
* 
* @param {Object} props - Component properties
* @param {ReactNode} props.children - React nodes to be rendered in portal
* @param {string} props.targetSelector - CSS selector for target container
* 
* @description 
* For Next.js App Router compatibility:
* - Ensure target container exists in server-side rendered HTML
* - Add a placeholder div with matching ID in the server component
* - Use 'use client' directive
* - Prevents hydration errors by checking mount state
* 
* @example
* // In server component
* <div id="modal-root"></div>
* 
* // In client component
* <PortalWrapper targetSelector="#modal-root">
*   <MyModal />
* </PortalWrapper>
*/
const PortalWrapper: FC<TProps> = ({ children, targetSelector }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const target = document.getElementById(targetSelector)
  return target ? createPortal(children, target) : null
}

export default PortalWrapper