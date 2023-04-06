import { motion } from "framer-motion";
import React from "react";

export const Pill = ({
  text,
  onClick = () => {},
  onRemove = null,
  className,
  id = "",
  disabled = false,
  isHighlighted = false,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const highlightColor = isHighlighted ? "bg-yellow-500" : "transparent";

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
      className={`flex rounded-lg overflow-hidden gap-2 items-center mb-2 ${
        isEnd ? "bg-red-300 cursor-not-allowed" : "bg-slate-300 cursor-pointer  hover:bg-green-400"
      }`}>
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          onMouseLeave(e);
        }}
        onClick={disabled || isEnd ? () => {} : onClick}
        className={`${className} gap-2 p-2 py-1 rounded text-sm items-center flex `}>
        <div>
          <p>{endText}</p>
          {isEnd ? (
            <>
              <br />
              <p>The end.</p>
            </>
          ) : null}
        </div>
        {onRemove ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className="ml-auto cursor-pointer">
            &times;
          </span>
        ) : null}
      </div>
    </motion.div>
  );
};
