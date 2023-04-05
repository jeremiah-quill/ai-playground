import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pill } from "../Pill";
import { useSeeds } from "../../hooks/useSeeds";

export function SeedCollection({ setPills, setIsLoading }) {
  const { seeds, seedInput, onSeedInputChange, handleSubmit, handleRemoveSeed } = useSeeds();

  const [selectedOption, setSelectedOption] = useState("");

  const handleStyleChange = (e) => {
    setSelectedOption(e.target.value);
  };

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

  return (
    <div className="grid gap-2">
      <h2 className="text-3xl font-bold mb-4">Seeds</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-2">
          <form onSubmit={handleSubmit}>
            <label htmlFor="seed-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Add seed content (plot, characters, setting, etc.)
            </label>
            <input
              autoComplete="off"
              value={seedInput}
              onChange={onSeedInputChange}
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
            {seeds.map((seed) => {
              return (
                <Pill
                  id={seed.id}
                  key={seed.text}
                  text={seed.text}
                  onRemove={handleRemoveSeed}
                  className="p-2 rounded-md"
                />
              );
            })}
          </div>
        </div>
        <div className="">
          <label htmlFor="tones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select a theme <span className="text-red-500">(required)</span>
          </label>
          <select
            required={true}
            value={selectedOption}
            onChange={handleStyleChange}
            id="tones"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
        </div>
      </div>
      <button
        className={`px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md ${
          selectedOption === "" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={seedStory}
        disabled={selectedOption === ""}>
        Submit
      </button>
    </div>
  );
}
