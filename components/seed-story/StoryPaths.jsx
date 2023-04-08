// 3rd party
import { AnimatePresence } from "framer-motion";

// components
import { StoryPill } from "@/components/Pill";

export const StoryPaths = ({ pills, currentIds = [], addNewPill, highlightedPath, setHighlightedPath }) => {
  return (
    <ul>
      <AnimatePresence initial={false}>
        {pills?.map((pill) => (
          <div key={pill.id}>
            {/* <ContextMenu options={["test", "test2", "test3"]}> */}
            <StoryPill
              isContextMenuEnabled={true}
              isInCurrentPath={highlightedPath.includes(pill.id)}
              onMouseEnter={() => setHighlightedPath([...currentIds, pill.id])}
              onMouseLeave={() => setHighlightedPath([])}
              text={pill.text}
              onClick={() => addNewPill([...currentIds, pill.id])}
            />
            {/* </ContextMenu> */}
            {pill.children && (
              <div className="ml-4">
                <StoryPaths
                  pills={pill.children}
                  currentIds={[...currentIds, pill.id]}
                  addNewPill={addNewPill}
                  highlightedPath={highlightedPath}
                  setHighlightedPath={setHighlightedPath}
                  onMouseEnter={() => setHighlightedPath([...currentIds, pill.id])}
                  onMouseLeave={() => setHighlightedPath([])}
                />
              </div>
            )}
          </div>
        ))}
      </AnimatePresence>
    </ul>
  );
};
