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

const PillList = ({ pills, selectedPill, setSelectedPill, removePill, currentIds = [], depth = 0 }) => {
  const pillClickHandler = (ids) => {
    if (JSON.stringify(selectedPill.ids) === JSON.stringify(ids)) {
      setSelectedPill({ ids: [] });
    } else {
      setSelectedPill({ ids });
    }
  };

  const isPillSelected = (pillId) => {
    return JSON.stringify([...currentIds, pillId]) === JSON.stringify(selectedPill.ids);
  };

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
            onClick={() => pillClickHandler([...currentIds, pill.id])}
            onRemove={() => removePill([...currentIds, pill.id])}
            isSelected={isPillSelected(pill.id)}
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
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export const PillInput = ({ pills, setPills, selectedPill, setSelectedPill, className }) => {
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

  return (
    <div className={className}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter text and press Enter"
        className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500 w-full"
      />
      <div className="p-4 rounded max-w-7xl ">
        <PillList pills={pills} selectedPill={selectedPill} setSelectedPill={setSelectedPill} removePill={removePill} />
      </div>
    </div>
  );
};
