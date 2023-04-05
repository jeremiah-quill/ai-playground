import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Pill = ({ text, onClick, onRemove, isSelected, className }) => {
  return (
    <div onClick={onClick} className={`${className} flex gap-2 ${isSelected ? "border-2 border-red-500" : ""}`}>
      {text}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-auto cursor-pointer">
        &times;
      </span>
    </div>
  );
};

const PillList = ({ pills, selectedPill, setSelectedPill, removePill, currentIds = [], depth = 0, addNewPill }) => {
  const getBackgroundColor = () => {
    switch (depth) {
      case 0:
        return "bg-blue-500";
      case 1:
        return "bg-green-500";
      case 2:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      {pills.map((pill) => (
        <div key={pill.id} className="mb-4">
          <Pill
            text={pill.text}
            onClick={() => addNewPill([...currentIds, pill.id])}
            onRemove={() => removePill([...currentIds, pill.id])}
            className={`${getBackgroundColor()} text-white px-3 py-1 rounded-full text-sm inline-flex items-center mb-2`}
          />
          {pill.children && (
            <div className="ml-4">
              <PillList
                pills={pill.children}
                selectedPill={selectedPill}
                setSelectedPill={setSelectedPill}
                removePill={removePill}
                currentIds={[...currentIds, pill.id]}
                depth={depth + 1}
                addNewPill={addNewPill}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export const StorybookInput = ({ pills, setPills, selectedPill, setSelectedPill, className }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newPill = { id: uuidv4(), text: inputValue, children: [] };

      const addPillToChildren = (children, ids) => {
        if (ids.length === 0) {
          return [...children, newPill];
        }
        const [headId, ...tailIds] = ids;
        return children.map((child) =>
          child.id === headId ? { ...child, children: addPillToChildren(child.children, tailIds) } : child
        );
      };

      setPills(addPillToChildren(pills, selectedPill.ids));
      setInputValue("");
    }
  };

  const removePill = (ids) => {
    const removePillFromChildren = (children, ids) => {
      if (ids.length === 1) {
        return children.filter((child) => child.id !== ids[0]);
      }
      const [headId, ...tailIds] = ids;
      return children.map((child) =>
        child.id === headId ? { ...child, children: removePillFromChildren(child.children, tailIds) } : child
      );
    };

    setPills(removePillFromChildren(pills, ids));
  };

  async function generateNextLine(storyPath) {
    const response = await fetch("/api/storybook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: storyPath }),
    });

    const data = await response.json();
    return data.text;
  }

  const addNewPill = async (ids) => {
    // Traverse pills and build the storyPath string
    const buildStoryPath = (pills, ids) => {
      if (ids.length === 0) {
        return "";
      }
      const [headId, ...tailIds] = ids;
      const currentPill = pills.find((pill) => pill.id === headId);
      const separator = tailIds.length > 0 ? " -> " : "";
      return currentPill.text + separator + buildStoryPath(currentPill.children, tailIds);
    };

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
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter text and press Enter"
        className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500 w-full"
      />
      <div className="p-4 rounded max-w-7xl ">
        <PillList
          pills={pills}
          selectedPill={selectedPill}
          setSelectedPill={setSelectedPill}
          removePill={removePill}
          addNewPill={addNewPill}
        />{" "}
      </div>
    </div>
  );
};
