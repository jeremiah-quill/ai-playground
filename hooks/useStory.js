import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { buildStoryPath } from "../utils";

export const useStory = () => {
  const [pills, setPills] = useState([]);
  const [pathIsLoading, setPathIsLoading] = useState(false);

  const addNewPill = async (ids) => {
    setPathIsLoading(true);

    const storyPath = buildStoryPath(pills, ids);

    const nextLine = await generateNextLine(storyPath);

    const newPill = { id: uuidv4(), text: nextLine, children: [] };

    const addPillToChildren = (children, ids) => {
      if (ids.length === 1) {
        const clickedPill = children.find((child) => child.id === ids[0]);
        return children.map((child) =>
          child.id === ids[0] ? { ...child, children: [...clickedPill.children, newPill] } : child
        );
      }
      const [headId, ...tailIds] = ids;
      return children.map((child) =>
        child.id === headId ? { ...child, children: addPillToChildren(child.children, tailIds) } : child
      );
    };

    setPills(addPillToChildren(pills, ids));

    setPathIsLoading(false);
  };

  const generateNextLine = async (storyPath) => {
    const response = await fetch("/api/get-next-storyline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: storyPath }),
    });

    const data = await response.json();

    return data.text;
  };

  return { pills, setPills, addNewPill, pathIsLoading };
};
