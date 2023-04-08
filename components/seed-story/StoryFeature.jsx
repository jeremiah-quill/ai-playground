// 3rd party
import { motion } from "framer-motion";

// react internals
import { useState } from "react";

// components and functions
import { StoryPaths } from "@/components/seed-story/StoryPaths";
import { Loader } from "@/components/Loader";
import { StoryPill } from "@/components/Pill";
import { buildStoryPath } from "@/utils";

export const StoryFeature = ({ pills, addNewPill, pathIsLoading, isLoading }) => {
  const [highlightedPath, setHighlightedPath] = useState([]);

  const path = buildStoryPath(pills, highlightedPath);

  return (
    <>
      <div className="flex gap-2 items-center mt-16 mb-4">
        <h2 className="text-3xl font-bold ">Story</h2>
        {pathIsLoading ? <Loader /> : null}
      </div>
      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white max-w-[75ch]">
        <p>
          Click on a line below to continue the story down that path. Once you reach the end of the story, you will not
          be able to continue down that path.
        </p>
        <br />
        <p>Hover a line in the story to see the entire story path to that point.</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <motion.div
          transition={{ type: "spring", duration: 0.3 }}
          layout
          className={`h-[500px] overflow-scroll flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            pathIsLoading ? "pointer-events-none" : "pointer-events-auto"
          }`}>
          {isLoading && <Loader className="absolute inset-0 grid place-items-center" />}
          <StoryPaths
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
                <StoryPill
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
