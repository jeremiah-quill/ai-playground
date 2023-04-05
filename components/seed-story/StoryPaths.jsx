import { useState } from "react";
import { Pill } from "../Pill";

export const StoryPaths = ({ pills, currentIds = [], depth = 0, addNewPill, highlightedPath, setHighlightedPath }) => {
  return (
    <>
      {pills?.map((pill) => (
        <div key={pill.id}>
          <Pill
            isHighlighted={highlightedPath.includes(pill.id)}
            onMouseEnter={() => setHighlightedPath([...currentIds, pill.id])}
            onMouseLeave={() => setHighlightedPath([])}
            currentIds={[...currentIds, pill.id]}
            pills={pills}
            id={pill.id}
            text={pill.text}
            onClick={() => addNewPill([...currentIds, pill.id])}
            className={` text-white hover:opacity-80 p-2 py-1 rounded text-sm inline-flex items-center cursor-pointer`}
          />
          {pill.children && (
            <div className="ml-4">
              <StoryPaths
                pills={pill.children}
                currentIds={[...currentIds, pill.id]}
                depth={depth + 1}
                addNewPill={addNewPill}
                highlightedPath={highlightedPath}
                setHighlightedPath={setHighlightedPath}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
