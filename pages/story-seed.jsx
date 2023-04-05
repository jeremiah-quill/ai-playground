// 3rd party
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

// react internals
import { useState } from "react";

// components
import { Loader } from "../components/Loader";

export default function StorySeedPage() {
  // seed state
  const [seeds, setSeeds] = useState([]);
  const [seedInput, setSeedInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // story state
  const [pills, setPills] = useState([]);
  const [selectedPill, setSelectedPill] = useState({ ids: [] });

  async function seedStory() {
    setIsLoading(true);

    const response = await fetch("/api/seed-story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seeds: seeds.map((seed) => seed.text), theme: selectedOption }),
    });

    const data = await response.json();

    setPills([{ id: uuidv4(), text: data.text, children: [] }]);

    setIsLoading(false);
  }

  const handleStyleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (seedInput === "") return;
    if (seeds.find((seed) => seed.text === seedInput)) return;

    setSeedInput("");
    setSeeds([...seeds, { id: uuidv4(), text: seedInput }]);
  }

  function handleRemoveSeed(id) {
    setSeeds((prevSeeds) => prevSeeds.filter((seed) => seed !== id));
  }

  return (
    <div>
      <Head>
        <title>Story Seed</title>
        <meta name="description" content="Send purposeful emails" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="max-w-6xl mx-auto font-['Roboto Mono'] grid gap-4 p-4">
        <div className="bg-slate-100 rounded-lg py-8 my-16">
          <h1 className="text-4xl font-bold text-center mb-4">Story Seed</h1>
          <p className="text-lg max-w-[70ch] mx-auto text-center">
            Story Seed is a tool for creating new children's stories from scratch. Seed the story with a theme, a
            context, and a level of creativity. Then watch the story evolve as you choose your paths.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="seed-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Add seed content (plot, characters, setting, etc.)
          </label>
          <input
            autoComplete="off"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            type="text"
            id="seed-content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type a seed and press enter"
          />
        </form>

        <div className="flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {seeds.length === 0 && (
            <div className="absolute inset-0 grid place-items-center font-bold text-lg text-slate-500">
              No seeds added
            </div>
          )}
          {seeds.map((seed, index) => {
            return (
              <Pill id={seed} key={seed.text} text={seed.text} onRemove={handleRemoveSeed} className="p-2 rounded-md" />
            );
          })}
        </div>
        <div className="flex">
          <label htmlFor="tones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">
            Select an option
          </label>
          <select
            value={selectedOption}
            onChange={handleStyleChange}
            id="tones"
            className="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-none w-[200px]">
            <option value="" disabled>
              Select a theme
            </option>
            <option value="adventure">Adventure</option>
            <option value="animals">Animals</option>
            <option value="super heroes">Super Heroes</option>
            <option value="friendship">Friendship</option>
            <option value="family">Family</option>
            <option value="imagination">Imagination</option>
            <option value="learning">Learning</option>
            <option value="mystery">Mystery</option>
            <option value="nature">Nature</option>
            <option value="self acceptance">Self-acceptance</option>
            <option value="social learning">Social learning</option>
            <option value="values">Values</option>
          </select>
          <button
            className={`max-w-6xl px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md rounded-l-none ${
              selectedOption === "" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={seedStory}
            disabled={selectedOption === ""}>
            Submit
          </button>
        </div>
        {isLoading ? <Loader /> : null}
        <StorybookInput
          pills={pills}
          setPills={setPills}
          selectedPill={selectedPill}
          setSelectedPill={setSelectedPill}
        />
      </main>
    </div>
  );
}

const Pill = ({ text, onClick = () => {}, onRemove = null, isSelected = false, className, id = "" }) => {
  return (
    <div className="flex gap-2 items-center mb-2">
      <div
        onClick={onClick}
        className={`${className} bg-slate-600 gap-2 text-white p-2 py-1 rounded text-sm items-center flex  ${
          isSelected ? "border-2 border-red-500" : ""
        }`}>
        {text}
        {onRemove ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className="ml-auto cursor-pointer">
            &times;
          </span>
        ) : null}
      </div>
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
      {pills?.map((pill) => (
        <div key={pill.id}>
          <Pill
            id={pill.id}
            text={pill.text}
            onClick={() => addNewPill([...currentIds, pill.id])}
            // onRemove={() => removePill([...currentIds, pill.id])}
            className={`${getBackgroundColor()} text-white hover:opacity-80 p-2 py-1 rounded text-sm inline-flex items-center cursor-pointer`}
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

const StorybookInput = ({ pills, setPills, selectedPill, setSelectedPill, className }) => {
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
    const response = await fetch("/api/get-next-storyline", {
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
      <div className="flex gap-2 content-start items-start flex-wrap min-h-[200px] bg-gray-50 border border-gray-300 relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <PillList
          pills={pills}
          selectedPill={selectedPill}
          setSelectedPill={setSelectedPill}
          removePill={removePill}
          addNewPill={addNewPill}
        />
      </div>
    </div>
  );
};

const buildStoryPath = (pills, ids) => {
  if (ids.length === 0) {
    return "";
  }
  const [headId, ...tailIds] = ids;
  const currentPill = pills.find((pill) => pill.id === headId);
  const separator = tailIds.length > 0 ? " -> " : "";
  return currentPill.text + separator + buildStoryPath(currentPill.children, tailIds);
};
