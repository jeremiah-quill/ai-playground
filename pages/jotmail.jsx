import Head from "next/head";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { PillInput } from "../components/PillInput";

export default function JotmailPage() {
  const [pills, setPills] = useState([]);
  const [selectedPill, setSelectedPill] = useState({ level: null, mainIndex: null, subIndex: null, subsubIndex: null });
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function editEmail() {
    setIsLoading(true);
    const response = await fetch("/api/email-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ style: selectedOption, email: pills }),
    });

    const data = await response.json();
    setResponse(data.text);
    setIsLoading(false);
  }

  const handleStyleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>Jotmail</title>
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
        <PillInput
          pills={pills}
          setPills={setPills}
          selectedPill={selectedPill}
          setSelectedPill={setSelectedPill}
          className=""
        />
        <div className="flex ">
          <label for="tones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">
            Select an option
          </label>
          <select
            value={selectedOption}
            onChange={handleStyleChange}
            id="tones"
            className="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-none w-[200px]">
            <option value="" disabled>
              Select a tone
            </option>
            <option value="angry">Angry</option>
            <option value="friendly">Friendly</option>
            <option value="sarcastic">Sarcastic</option>
            <option value="informal">Informal</option>
            <option value="formal">Formal</option>
            <option value="assertive">Assertive</option>
            <option value="persuasive">Persuasive</option>
            <option value="apologetic">Apologetic</option>
          </select>
          <button
            className={`max-w-5xl px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md rounded-l-none ${
              selectedOption === "" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={editEmail}
            disabled={selectedOption === ""}>
            Submit
          </button>
        </div>
        <div className="border border-slate-400 p-4 rounded bg-white">
          {isLoading ? <Loader /> : null}
          {!response ? null : response}
        </div>
      </main>
    </div>
  );
}
