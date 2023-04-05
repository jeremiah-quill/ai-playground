import { useState } from "react";
import { StoryPaths } from "./StoryPaths";
import { Loader } from "../Loader";
import { buildStoryPath } from "../../utils";

export const StoryFeature = ({ pills, isLoading, addNewPill }) => {
  const [highlightedPath, setHighlightedPath] = useState([]);

  return (
    <>
      <h2 className="text-3xl font-bold mt-16 mb-4">Story</h2>
      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Click on a seed to continue the story down that path
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
        </div>
        <div className="flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {buildStoryPath(pills, highlightedPath)}
        </div>
      </div>
    </>
  );
};
