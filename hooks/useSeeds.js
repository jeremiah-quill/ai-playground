// useSeeds.js
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useSeeds() {
  const [seeds, setSeeds] = useState([]);
  const [seedInput, setSeedInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (seedInput === "") return;
    if (seeds.find((seed) => seed.text === seedInput)) return;

    setSeedInput("");
    setSeeds([...seeds, { id: uuidv4(), text: seedInput }]);
  }

  function onSeedInputChange(e) {
    setSeedInput(e.target.value);
  }

  function handleRemoveSeed(id) {
    setSeeds((prevSeeds) => prevSeeds.filter((seed) => seed.id !== id));
  }

  return { seeds, seedInput, handleSubmit, handleRemoveSeed, onSeedInputChange };
}
