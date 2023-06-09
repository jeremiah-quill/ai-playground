// 3rd party
import { AnimatePresence } from "framer-motion";

// components
import { PathNode } from "@/components/Pill";

export const PathTree = ({ pills, currentIds = [], addNewPill, highlightedPath, setHighlightedPath }) => {
  return (
    <ul>
      <AnimatePresence initial={false}>
        {pills?.map((pill) => (
          <div key={pill.id}>
            <PathNode
              isInCurrentPath={highlightedPath.includes(pill.id)}
              onMouseEnter={() => setHighlightedPath([...currentIds, pill.id])}
              text={pill.text}
              onClick={() => addNewPill([...currentIds, pill.id])}
            />
            {pill.children && (
              <div className="ml-4">
                <PathTree
                  pills={pill.children}
                  currentIds={[...currentIds, pill.id]}
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
