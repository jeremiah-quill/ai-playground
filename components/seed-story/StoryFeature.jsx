import { useState } from "react";
import { StoryPaths } from "./StoryPaths";
import { Loader } from "../Loader";
import { buildStoryPath } from "../../utils";
import { motion } from "framer-motion";

export const StoryFeature = ({ pills, isLoading, addNewPill, pathIsLoading, creativity, storyLength }) => {
  const [highlightedPath, setHighlightedPath] = useState([]);

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
          className="h-[500px] overflow-scroll flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {isLoading ? (
            <div className="absolute inset-0 grid place-items-center">
              <Loader />
            </div>
          ) : null}
          <StoryPaths
            pills={pills}
            addNewPill={addNewPill}
            highlightedPath={highlightedPath}
            setHighlightedPath={setHighlightedPath}
          />
        </motion.div>
        <div className="flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {buildStoryPath(pills, highlightedPath)}
        </div>
      </div>
    </>
  );
};
