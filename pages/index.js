import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const experimentsData = [
    {
      id: 1,
      title: "Jotmail",
      description: "Jot down your thoughts and let OpenAI's GPT-3.5 generate a unique email for you.",
      url: "/jotmail",
      comingSoon: false,
    },
    {
      id: 2,
      title: "Whisp",
      description: "",
      url: "#",
      comingSoon: true,
    },
  ];
  return (
    <>
      <Head>
        <title>AI Playground</title>
        <meta name="description" content="OpenAI API Experiments" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex flex-col min-h-[80vh] overflow-hidden mx-auto max-w-7xl px-4">
        <div className="flex-grow">
          <section className="shadow-md rounded-lg h-[200px] my-6 hero flex flex-col gap-2 items-center justify-center py-12 bg-[#ff8c00]  text-white">
            <h2 className="text-2xl font-semibold p-4 text-center">
              Explore the power of OpenAI API through interactive experiments
            </h2>
            <Link
              className="bg-red-600 text-white px-6 py-2 rounded font-black uppercase text-sm"
              target="_blank"
              href="https://github.com/jeremiah-quill/ai-playground">
              View Source
            </Link>
          </section>
          <section className="experiments  max-w-7xl">
            <div className="grid sm:grid-cols-2 gap-4">
              {experimentsData.map((experiment) => (
                <ExperimentCard key={experiment.id} experiment={experiment} />
              ))}
            </div>
          </section>
        </div>
      </main>
      {/* <section className="flex flex-col items-center justify-center py-12 bg-gray-100">
        <h3 className="text-2xl font-semibold mb-4">Get Started with OpenAI API</h3>
        <p className="text-lg mb-6 text-center">
          Follow our step-by-step guide to start experimenting with OpenAI API.
        </p>
        <Link className="cta-button bg-blue-600 text-white px-6 py-2 rounded" href="/getting-started">
          Learn More
        </Link>
      </section> */}
    </>
  );
}

const ExperimentCard = ({ experiment }) => {
  return (
    <Link
      href={experiment.url}
      className={`relative card rounded shadow-md p-4 bg-blue-500 text-white ${
        experiment.comingSoon ? "cursor-not-allowed bg-opacity-50" : "cursor-pointer"
      }`}>
      <h4 className="text-xl font-semibold mb-2">{experiment.title}</h4>
      <p className=" mb-4">{experiment.description}</p>
      {experiment.comingSoon && (
        <div className="absolute inset-0 grid place-items-center text-slate-800 font-black text-3xl -rotate-12">
          Coming soon!
        </div>
      )}
    </Link>
  );
};
