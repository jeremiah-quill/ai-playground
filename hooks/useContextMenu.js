import { useState, useEffect } from "react";

export const useContextMenu = (targetRef) => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      if (targetRef && targetRef.current.contains(event.target) && contextMenu.visible === false) {
        setContextMenu({
          visible: true,
          x: event.clientX,
          y: event.clientY,
        });
      } else {
        setContextMenu({ visible: false, x: 0, y: 0 });
      }
    };

    const handleClick = () => {
      if (contextMenu.visible) {
        setContextMenu({ visible: false, x: 0, y: 0 });
      }
    };

    document.addEventListener("click", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, [targetRef]);

  const closeMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return { contextMenu, closeMenu };
};
