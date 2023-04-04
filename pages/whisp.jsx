import Head from "next/head";
import { useState } from "react";

export default function babyNames() {
  const [response, setResponse] = useState(null);
  const [styleInput, setStyleInput] = useState("");

  async function getNames() {
    setResponse("...loading");

    // const response = await fetch("/api/ai", {
    const response = await fetch("/api/email-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ style: styleInput }),
    });

    const data = await response.json();

    setResponse(data.text);

    console.log("data in getNames", data);
  }

  function handleStyleInputChange(e) {
    setStyleInput(e.target.value);
  }

  return (
    <div>
      <Head>
        <title>Whisp</title>
        <meta name="description" content="Baby name suggestions, by AI" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="max-w-4xl m-auto font-['Roboto Mono']">
        <p className="pt-16 pb-8 text-3xl">
          Please provide 5 baby names in the style of{" "}
          <input
            value={styleInput}
            onChange={handleStyleInputChange}
            className="p-2 italic  border-b border-slate-400 max-w-[250px]"
            placeholder="Arctic Mayhem"
          />
          .
        </p>
        <button className="p-2 bg-slate-800 text-slate-100 font-bold" onClick={() => getNames()}>
          Get names
        </button>
        <div className="p-2 pt-32 text-3xl ">{!response ? "No response yet." : response}</div>
      </main>
    </div>
  );
}
