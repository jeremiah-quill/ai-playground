// 3rd party
import Head from "next/head";

// react internals
import { useState } from "react";

// components
import { useStory } from "../hooks/useStory";
import { Introduction } from "../components/seed-story/Introduction";
import { SeedCollection } from "../components/seed-story/SeedCollection";
import { StoryFeature } from "../components/seed-story/StoryFeature";

export default function StorySeedPage() {
  const { pills, setPills, addNewPill, pathIsLoading } = useStory();

  const [isLoading, setIsLoading] = useState(false);

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
        <SeedCollection setPills={setPills} setIsLoading={setIsLoading} />
        <StoryFeature
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
