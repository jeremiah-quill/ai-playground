// 3rd party
import Head from "next/head";

// react internals
import { useState } from "react";

export default function CompressedPage() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);

    const getCompressedPrompt = async () => {
      const response = await fetch("/api/compress-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    };

    const compressedPrompt = await getCompressedPrompt();

    console.log("compressedPrompt", compressedPrompt);
  };

  return (
    <div>
      <Head>
        <title>Compressed</title>
        <meta name="description" content="Compress GPT prompts" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="max-w-6xl mx-auto font-['Roboto Mono'] p-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt" className="text-xl font-bold mb-4 block">
            Create your prompt:
          </label>
          <textarea
            id="prompt"
            className="w-full resize-none p-4 h-96 bg-slate-200 rounded"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="p-4 hover:opacity-70 text-2xl rounded-lg bg-green-400 mx-auto block my-8 font-bold text-center"
            type="submit">
            Get compressed prompt
          </button>
        </form>
      </main>
    </div>
  );
}
