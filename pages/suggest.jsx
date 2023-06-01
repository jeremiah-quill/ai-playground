// 3rd party
import Head from "next/head";

// react internals
import { useState, useRef, useEffect } from "react";

export default function SuggestPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedText, setSuggestedText] = useState("");

  const textareaRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getSuggestion = async () => {
      setIsLoading(true);
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentText: inputValue }),
      });
      const data = await response.json();

      setSuggestedText(data.suggestedText);
      setIsLoading(false);
    };

    await getSuggestion();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      if (suggestedText !== "") {
        e.preventDefault();
      }

      handleSubmit(e);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestedText === "") return;

      setInputValue(inputValue + suggestedText);
      setSuggestedText("");
    }

    // if (e.key === "ArrowDown") {
    //   e.preventDefault();
    //   if (suggestionIndex === null) {
    //     setSuggestionIndex(0);
    //   } else if (suggestionIndex < suggestions.length - 1) {
    //     setSuggestionIndex(suggestionIndex + 1);
    //   }
    // } else if (e.key === "ArrowUp") {
    //   e.preventDefault();
    //   if (suggestionIndex > 0) {
    //     setSuggestionIndex(suggestionIndex - 1);
    //   }
    // } else if (e.key === "Enter") {
    //   e.preventDefault();
    //   if (suggestionIndex !== null) {
    //     setInputValue(inputValue + suggestions[suggestionIndex]);
    //     setSuggestions("");
    //   }
    // }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Suggest</title>
        <meta name="description" content="Get contextual suggestions" />
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
          <div className="relative">
            <textarea
              placeholder="Starting typing. Press Tab to get suggestions..."
              id="prompt"
              ref={textareaRef}
              className="w-full resize-none p-4 h-96 relative z-20 bg-transparent"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute top-0 left-0 p-4 h-96 z-10">
              {/* invisible text to take up same space as textarea input text */}
              <span className="bg-transparent text-transparent">{inputValue}</span>
              {/* suggested text appended to end of invisble text */}
              <span className="text-gray-400 rounded-xl">{suggestedText}</span>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
