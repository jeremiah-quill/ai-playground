import { Pill } from "../Pill";
import { AnimatePresence, motion } from "framer-motion";

export const StoryPaths = ({ pills, currentIds = [], depth = 0, addNewPill, highlightedPath, setHighlightedPath }) => {
  return (
    <ul>
      <AnimatePresence initial={false}>
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
              className={`text-slate-800 p-2 py-1 rounded text-sm inline-flex items-center`}
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
      </AnimatePresence>
    </ul>
  );
};
