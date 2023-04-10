// 3rd party
import { motion } from "framer-motion";

// react internals
import React from "react";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useRef } from "react";

export const Pill = ({ text, onRemove, className }) => {
  return (
    <motion.div
      layout={true}
      initial={{ opacity: 0.3, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ type: "spring", duration: 0.3 }}
      className={`flex rounded-2xl gap-2 items-center bg-slate-300 px-2 py-1 text-sm`}>
      <p>{text}</p>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-auto cursor-pointer">
        &times;
      </span>
    </motion.div>
  );
};

export const PathNode = ({ text, isInCurrentPath = false, onClick = () => {}, onMouseEnter = () => {}, className }) => {
  const targetRef = useRef(null);
  const { contextMenu, closeMenu } = useContextMenu(targetRef);
  const handleShowPath = () => {
    onMouseEnter();
    closeMenu();
  };

  const isEnd = text.split("").slice(-2).join("") === "||";

  const endText = isEnd ? text.split("").slice(0, -2).join("") : text;

  return (
    <motion.div
      ref={targetRef}
      layout={true}
      initial={{ opacity: 0.3, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ type: "spring", duration: 0.3 }}
      className={`gap-2 mb-2 px-2 py-1 text-slate-800 rounded text-sm cursor-pointer inline-flex items-center ${
        isEnd ? "bg-red-300" : `${isInCurrentPath ? "bg-yellow-400 " : "bg-slate-300"}  hover:bg-green-400 ${className}`
      }`}>
      <div>
        <p>{endText}</p>
        {isEnd ? (
          <>
            <br />
            <p>The end.</p>
          </>
        ) : null}
      </div>
      {contextMenu.visible && (
        <motion.ul
          initial={{ opacity: 0.3, y: -4 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            // TODO: close context menu
          }}
          className="context-menu"
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "3px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}>
          {isEnd ? null : (
            <li
              className="p-2 hover:bg-slate-200"
              onClick={
                isEnd
                  ? () => {}
                  : () => {
                      onClick();
                      closeMenu();
                    }
              }>
              Generate new path from this point
            </li>
          )}
          <li className="p-2 hover:bg-slate-200" onClick={handleShowPath}>
            View this story's path
          </li>
        </motion.ul>
      )}
    </motion.div>
  );
};

export const StaticPathNode = ({ text, isInCurrentPath = false, className }) => {
  const isEnd = text.split("").slice(-2).join("") === "||";
  const endText = isEnd ? text.split("").slice(0, -2).join("") : text;

  return (
    <motion.div
      layout={true}
      initial={{ opacity: 0.3, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ type: "spring", duration: 0.3 }}
      className={`gap-2 mb-2 px-2 py-1 text-slate-800 rounded text-sm inline-flex items-center ${
        isEnd ? "bg-red-300" : `${isInCurrentPath ? "bg-yellow-400" : "bg-slate-300"} ${className}`
      }`}>
      <div>
        <p>{endText}</p>
        {isEnd ? (
          <>
            <br />
            <p>The end.</p>
          </>
        ) : null}
      </div>
    </motion.div>
  );
};
