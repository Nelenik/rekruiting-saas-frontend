'use client'

import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="fixed flex flex-col left-0 top-0 bottom-0 p-4 bg-sidebar text-sidebar-foreground ">
      sidebar
    </div>
  );
}

export default Sidebar;