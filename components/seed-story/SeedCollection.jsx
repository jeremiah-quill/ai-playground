// 3rd party
import { v4 as uuidv4 } from "uuid";

// components
import { Pill } from "@/components/Pill";

export function SeedCollection({
  setIsSetup,
  seeds,
  seedInput,
  onSeedInputChange,
  handleSubmit,
  handleRemoveSeed,
  setPills,
  setIsLoading,
  setStoryLength,
  setCreativity,
  creativity,
  storyLength,
  selectedOption,
  setSelectedOption,
}) {
  const handleStyleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCreativityChange = (e) => {
    setCreativity(e.target.value);
  };

  const handleStoryLengthChange = (e) => {
    setStoryLength(e.target.value);
  };

  async function seedStory() {
    setIsLoading(true);

    const response = await fetch("/api/seed-story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seeds: seeds.map((seed) => seed.text), theme: selectedOption, creativity, storyLength }),
    });

    const data = await response.json();

    setPills([{ id: uuidv4(), text: data.text, children: [] }]);

    setIsLoading(false);
    setIsSetup(false);
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Seeds</h2>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-2 items-start">
          <div className="grid gap-2">
            <form onSubmit={handleSubmit} className="grid gap-2">
              <label htmlFor="seed-content" className="block text-sm font-medium text-gray-900 dark:text-white">
                Add seed content (plot, characters, setting, etc.) and press enter/return
              </label>
              <div className="flex">
                <input
                  autoComplete="off"
                  value={seedInput}
                  onChange={onSeedInputChange}
                  type="text"
                  id="seed-content"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type a seed and press enter"
                />
                <input
                  type="submit"
                  value="Add"
                  className={`w-full max-w-[200px] px-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg rounded-l-none`}
                />
              </div>
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
                    key={seed.id}
                    text={seed.text}
                    onRemove={() => handleRemoveSeed(seed.id)}
                    className=""
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start h-full">
            <label htmlFor="tones" className="block text-sm font-medium text-gray-900 dark:text-white">
              Select a theme <span className="text-red-500">(required)</span>
            </label>
            <select
              required={true}
              value={selectedOption}
              onChange={handleStyleChange}
              id="tones"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            {/* <label htmlFor="tones" className="block text-sm font-medium text-gray-900 dark:text-white">
              Choose how many sentences before the story ends:
              <span className="text-red-500"> (required)</span>
            </label>
            <input
              value={storyLength}
              onChange={handleStoryLengthChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            /> */}
            <label htmlFor="creativity" className="mt-6 block text-sm font-medium text-gray-900 dark:text-white">
              Select creativity level (low = more predictable, high = more creative)
            </label>
            <div className="flex items-center gap-4 font-black w-full">
              <input
                value={creativity}
                id="creativity"
                min=".0"
                max=".5"
                step=".01"
                type="range"
                onChange={handleCreativityChange}
                className="mr-2 border flex-1 border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center w-[80px] p-1 px-2 rounded-lg">
                {(creativity * 200).toFixed(0)}%
              </div>
            </div>
            <button
              className={`mt-auto self-stretch px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md ${
                selectedOption === "" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={seedStory}
              disabled={selectedOption === ""}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
