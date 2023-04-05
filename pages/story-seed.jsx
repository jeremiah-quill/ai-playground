import Head from "next/head";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "../components/Loader";

const SeedPill = ({ text, onRemove, className }) => {
  return (
    <div className={className}>
      <span className="text-sm">{text}</span>
      <button onClick={onRemove} className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default function StorySeedPage() {
  const [seeds, setSeeds] = useState([]);
  const [seedInput, setSeedInput] = useState("");

  const [pills, setPills] = useState([]);
  const [selectedPill, setSelectedPill] = useState({ ids: [] });
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setSeedInput("");
    setSeeds([...seeds, { id: uuidv4(), text: seedInput }]);
  }

  function handleRemoveSeed(id) {
    setSeeds((prevSeeds) => prevSeeds.filter((seed) => seed.id !== id));
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
      <main className="max-w-7xl mx-auto font-['Roboto Mono'] grid gap-4 p-4">
        <h1 className="text-4xl font-bold mt-16">Story Seed</h1>
        <p className="text-lg">
          Story Seed is a tool to help you grow never before read stories on your own. Seed the story with a theme, a
          context, and a level of creativity. Then, watch the story grow!
        </p>
        <form onSubmit={handleSubmit}>
          <label for="seed-content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seed content (plot, characters, setting, etc.)
          </label>
          <input
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            type="text"
            id="seed-content"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Press enter to add to seed."
          />
        </form>
        <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {seeds.map((seed, index) => {
            return (
              <Pill
                id={seed.id}
                key={index}
                text={seed.text}
                onRemove={handleRemoveSeed}
                className="p-2 rounded-md mb-2 cursor-pointer"
              />
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
            className={`max-w-5xl px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md rounded-l-none ${
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

const Pill = ({ text, onClick = () => {}, onRemove, isSelected = false, className, id = "" }) => {
  return (
    <div onClick={onClick} className={`${className} flex gap-2 ${isSelected ? "border-2 border-red-500" : ""}`}>
      {text}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
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
      {pills?.map((pill) => (
        <div key={pill.id} className="mb-4">
          <Pill
            id={pill.id}
            text={pill.text}
            onClick={() => addNewPill([...currentIds, pill.id])}
            onRemove={() => removePill([...currentIds, pill.id])}
            className={`${getBackgroundColor()} text-white p-2 py-1 rounded text-sm inline-flex items-center mb-2`}
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
