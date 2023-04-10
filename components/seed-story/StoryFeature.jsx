// 3rd party
import { motion } from "framer-motion";
import { BsArrowBarLeft } from "react-icons/bs";

// react internals
import { useState } from "react";

// components and functions
import { PathTree } from "@/components/seed-story/PathTree";
import { Loader } from "@/components/Loader";
import { StaticPathNode } from "@/components/Pill";
import { buildStoryPath } from "@/utils";

export const StoryFeature = ({ pills, addNewPill, pathIsLoading, isLoading, setIsSetup }) => {
  const [highlightedPath, setHighlightedPath] = useState([]);

  const path = buildStoryPath(pills, highlightedPath);

  return (
    <>
      <div className="flex gap-2 items-center mt-16 mb-4">
        <div>
          <button className="flex gap-2 items-center mb-2" onClick={() => setIsSetup(true)}>
            <BsArrowBarLeft className="text-xl" />
            Back to seeds
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold ">Story</h2>
            {pathIsLoading ? <Loader /> : null}
          </div>
        </div>
      </div>
      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[75ch]">
        <p>Click a block from your story below. Generate a new block or view the story path up to that point.</p>
        <br />
        <p>
          The AI is programmed to end a story when it sees fit. Once a path reaches the end you will not be able to
          continue down that path.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <motion.div
          transition={{ type: "spring", duration: 0.3 }}
          layout
          className={`h-[500px] overflow-scroll flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            pathIsLoading ? "pointer-events-none" : "pointer-events-auto"
          }`}>
          {isLoading && <Loader className="absolute inset-0 grid place-items-center" />}
          <PathTree
            pills={pills}
            addNewPill={addNewPill}
            highlightedPath={highlightedPath}
            setHighlightedPath={setHighlightedPath}
          />
        </motion.div>
        <div className="flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <ul>
            {path.map((pill, index) => {
              return (
                <StaticPathNode
                  key={pill.id}
                  text={pill.text}
                  disabled="true"
                  isInCurrentPath={true}
                  className={path.length - 1 === index ? "bg-green-400" : ""}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
