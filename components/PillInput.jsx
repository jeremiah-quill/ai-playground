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

export const PillInput = ({ pills, setPills, selectedPill, setSelectedPill, className }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newPill = { id: uuidv4(), text: inputValue, subpoints: [], subsubpoints: [] };
      const { level, mainId, subId } = selectedPill;

      if (level === null) {
        setPills([...pills, newPill]);
      } else if (level === "main") {
        setPills(
          pills.map((pill) => (pill.id === mainId ? { ...pill, subpoints: [...pill.subpoints, newPill] } : pill))
        );
      } else if (level === "sub") {
        setPills(
          pills.map((pill) =>
            pill.id === mainId
              ? {
                  ...pill,
                  subpoints: pill.subpoints.map((subpoint) =>
                    subpoint.id === subId
                      ? { ...subpoint, subsubpoints: [...subpoint.subsubpoints, newPill] }
                      : subpoint
                  ),
                }
              : pill
          )
        );
      }
      setInputValue("");
    }
  };

  const removePill = (level, mainId, subId = null, subsubId = null) => {
    if (level === null) {
      setPills(pills.filter((pill) => pill.id !== mainId));
    } else if (level === "main") {
      setPills(
        pills.map((pill) =>
          pill.id === mainId ? { ...pill, subpoints: pill.subpoints.filter((subpoint) => subpoint.id !== subId) } : pill
        )
      );
    } else if (level === "sub") {
      setPills(
        pills.map((pill) =>
          pill.id === mainId
            ? {
                ...pill,
                subpoints: pill.subpoints.map((subpoint) =>
                  subpoint.id === subId
                    ? {
                        ...subpoint,
                        subsubpoints: subpoint.subsubpoints.filter((subsubpoint) => subsubpoint.id !== subsubId),
                      }
                    : subpoint
                ),
              }
            : pill
        )
      );
    }
  };

  const pillClickHandler = (level, mainId, subId = null, subsubId = null) => {
    if (
      selectedPill.level === level &&
      selectedPill.mainId === mainId &&
      selectedPill.subId === subId &&
      selectedPill.subsubId === subsubId
    ) {
      setSelectedPill({ level: null, mainId: null, subId: null, subsubId: null });
    } else {
      setSelectedPill({ level, mainId, subId, subsubId });
    }
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(e) => handleKeyPress(e, selectedPill.level, selectedPill.subId || selectedPill.mainId)}
        placeholder="Enter text and press Enter"
        className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500 w-full"
      />
      <div className="p-4 rounded max-w-7xl ">
        {pills?.map((pill) => (
          <div key={pill.id} className="mb-4">
            <Pill
              text={pill.text}
              onClick={() => pillClickHandler("main", pill.id)}
              onRemove={() => removePill(null, pill.id)}
              isSelected={selectedPill.level === "main" && selectedPill.mainId === pill.id}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm inline-flex items-center mb-2"
            />
            <div className="flex flex-wrap gap-2 ml-4">
              {pill.subpoints.map((subpoint) => (
                <div key={subpoint.id} className="flex flex-col">
                  <Pill
                    text={subpoint.text}
                    onClick={() => pillClickHandler("sub", pill.id, subpoint.id)}
                    onRemove={() => removePill("main", pill.id, subpoint.id)}
                    isSelected={
                      selectedPill.level === "sub" &&
                      selectedPill.mainId === pill.id &&
                      selectedPill.subId === subpoint.id
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-sm inline-flex items-center mb-2"
                  />
                  <div className="flex flex-wrap gap-2 ml-4">
                    {subpoint.subsubpoints.map((subsubpoint) => (
                      <Pill
                        key={subsubpoint.id}
                        text={subsubpoint.text}
                        onClick={() => pillClickHandler("subsub", pill.id, subpoint.id, subsubpoint.id)}
                        onRemove={() => removePill("sub", pill.id, subpoint.id, subsubpoint.id)}
                        isSelected={
                          selectedPill.level === "subsub" &&
                          selectedPill.mainId === pill.id &&
                          selectedPill.subId === subpoint.id &&
                          selectedPill.subsubId === subsubpoint.id
                        }
                        className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm inline-flex items-center"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
