import React, { useState } from "react";

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
      const newPill = { text: inputValue, subpoints: [], subsubpoints: [] };
      const { level, mainIndex, subIndex } = selectedPill;

      if (level === null) {
        setPills([...pills, newPill]);
      } else if (level === "main") {
        setPills(
          pills.map((pill, pillIndex) =>
            pillIndex === mainIndex ? { ...pill, subpoints: [...pill.subpoints, newPill] } : pill
          )
        );
      } else if (level === "sub") {
        setPills(
          pills.map((pill, pillIndex) =>
            pillIndex === mainIndex
              ? {
                  ...pill,
                  subpoints: pill.subpoints.map((subpoint, currSubIndex) =>
                    currSubIndex === subIndex
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

  const removePill = (level, index) => {
    if (level === "main") {
      setPills(pills.filter((_, pillIndex) => pillIndex !== index));
    } else if (level === "sub") {
      setPills(
        pills.map((pill, pillIndex) =>
          pillIndex === selectedPill.index
            ? { ...pill, subpoints: pill.subpoints.filter((_, subIndex) => subIndex !== index) }
            : pill
        )
      );
    } else if (level === "subsub") {
      setPills(
        pills.map((pill, pillIndex) =>
          pillIndex === selectedPill.mainIndex
            ? {
                ...pill,
                subpoints: pill.subpoints.map((subpoint, subIndex) =>
                  subIndex === selectedPill.subIndex
                    ? {
                        ...subpoint,
                        subsubpoints: subpoint.subsubpoints.filter((_, subsubIndex) => subsubIndex !== index),
                      }
                    : subpoint
                ),
              }
            : pill
        )
      );
    }
  };

  const pillClickHandler = (level, mainIndex, subIndex = null, subsubIndex = null) => {
    if (
      selectedPill.level === level &&
      selectedPill.mainIndex === mainIndex &&
      selectedPill.subIndex === subIndex &&
      selectedPill.subsubIndex === subsubIndex
    ) {
      setSelectedPill({ level: null, mainIndex: null, subIndex: null, subsubIndex: null });
    } else {
      setSelectedPill({ level, mainIndex, subIndex, subsubIndex });
    }
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
        {pills?.map((pill, pillIndex) => (
          <div key={pillIndex} className="mb-4">
            <Pill
              text={pill.text}
              onClick={() => pillClickHandler("main", pillIndex)}
              onRemove={() => removePill("main", pillIndex)}
              isSelected={selectedPill.level === "main" && selectedPill.mainIndex === pillIndex}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm inline-flex items-center mb-2"
            />
            <div className="flex flex-wrap gap-2 ml-4">
              {pill.subpoints.map((subpoint, subIndex) => (
                <div key={subIndex} className="flex flex-col">
                  <Pill
                    text={subpoint.text}
                    onClick={() => pillClickHandler("sub", pillIndex, subIndex)}
                    onRemove={() => removePill("sub", subIndex)}
                    isSelected={
                      selectedPill.level === "sub" &&
                      selectedPill.mainIndex === pillIndex &&
                      selectedPill.subIndex === subIndex
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-sm inline-flex items-center mb-2"
                  />
                  <div className="flex flex-wrap gap-2 ml-4">
                    {pill.subpoints[subIndex].subsubpoints.map((subsubpoint, subsubIndex) => (
                      <Pill
                        key={subsubIndex}
                        text={subsubpoint.text}
                        onClick={() => pillClickHandler("subsub", pillIndex, subIndex)}
                        onRemove={() => removePill("subsub", subsubIndex)}
                        isSelected={
                          selectedPill.level === "subsub" &&
                          selectedPill.mainIndex === pillIndex &&
                          selectedPill.subIndex === subIndex &&
                          selectedPill.subsubIndex === subsubIndex
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
