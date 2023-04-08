// 3rd party
import { motion } from "framer-motion";

// react internals
import React from "react";

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

export const StoryPill = ({
  text,
  onClick = () => {},
  disabled = false,
  isInCurrentPath = false,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  className,
}) => {
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
        isEnd
          ? "bg-red-300 cursor-not-allowed"
          : `${isInCurrentPath ? "bg-yellow-400 hover:bg-green-400" : "bg-slate-300"} cursor-pointer ${className}`
      }`}
      onMouseEnter={(e) => {
        e.stopPropagation();
        onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onMouseLeave(e);
      }}
      onClick={disabled || isEnd ? () => {} : onClick}>
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
