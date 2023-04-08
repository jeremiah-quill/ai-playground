// 3rd party
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

// react internals
import { useState } from "react";

// components
import { useSeeds } from "@/src/hooks/useSeeds";
import { Introduction } from "@/src/components/seed-story/Introduction";
import { SeedCollection } from "@/src/components/seed-story/SeedCollection";
import { StoryFeature } from "@/src/components/seed-story/StoryFeature";
import { buildStoryPath } from "@/src/utils";

export default function StorySeedPage() {
  const { seeds, seedInput, onSeedInputChange, handleSubmit, handleRemoveSeed } = useSeeds();

  const [selectedOption, setSelectedOption] = useState("");
  const [pills, setPills] = useState([]);
  const [pathIsLoading, setPathIsLoading] = useState(false);
  const [creativity, setCreativity] = useState(".2");
  const [storyLength, setStoryLength] = useState(5);

  const [isLoading, setIsLoading] = useState(false);

  const addNewPill = async (ids) => {
    setPathIsLoading(true);

    const storyPath = buildStoryPath(pills, ids);

    const nextLine = await generateNextLine(storyPath);

    const newPill = { id: uuidv4(), text: nextLine, children: [] };

    const addPillToChildren = (children, ids) => {
      if (ids.length === 1) {
        return children.map((child) =>
          child.id === ids[0] ? { ...child, children: [newPill, ...child.children] } : child
        );
      }
      const [headId, ...tailIds] = ids;
      return children.map((child) =>
        child.id === headId ? { ...child, children: addPillToChildren(child.children, tailIds) } : child
      );
    };

    setPills(addPillToChildren(pills, ids));

    setPathIsLoading(false);
  };

  const generateNextLine = async (storyPath, currentSentence) => {
    const response = await fetch("/api/get-next-storyline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story: storyPath.map((pill) => pill.text).join(" "),
        seeds,
        theme: selectedOption,
        creativity,
        storyLength,
        currentSentence,
      }),
    });

    const data = await response.json();

    return data.text;
  };

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
      <main className="max-w-6xl mx-auto font-['Roboto Mono'] p-4">
        <Introduction />
        <SeedCollection
          setPills={setPills}
          setIsLoading={setIsLoading}
          creativity={creativity}
          storyLength={storyLength}
          setCreativity={setCreativity}
          setStoryLength={setStoryLength}
          seeds={seeds}
          seedInput={seedInput}
          onSeedInputChange={onSeedInputChange}
          handleSubmit={handleSubmit}
          handleRemoveSeed={handleRemoveSeed}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <StoryFeature
          creativity={creativity}
          storyLength={storyLength}
          isLoading={isLoading}
          pills={pills}
          setPills={setPills}
          addNewPill={addNewPill}
          pathIsLoading={pathIsLoading}
        />
      </main>
    </div>
  );
}
