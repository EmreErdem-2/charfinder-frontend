import { useEffect, useState } from "react";
import { steps } from "./StepConfig";  
import { StepWizard } from "./StepWizard";
import { fetchGeneratedBackstory } from "../services/api";


export const CharacterCreation = () => {
  const [character, setCharacter] = useState(null);
  const [backstory, setBackstory] = useState("");

  const handleCharacterChange = (charInfo) => {
    const result = Object.entries(charInfo)
      .filter(([_, o]) => o?.name)
      .map(([key, o]) => ({
        key,
        name: o.name,
        description: o.description ?? null,
      }));

    const json = JSON.stringify(result, null, 2);
    setCharacter(json);
    console.log("Character JSON: \n", json);
  };

  useEffect(() => {
    console.log("char: ", character);
  }, [character]);

  async function generateBackstory() {
    if (!character) {
      alert("Please finish character creation first!");
      return;
    }

    try {
      const response = await fetchGeneratedBackstory(character)
      setBackstory(response); // assume API returns { backstory: "..." }
    } catch (err) {
      console.error(err);
      setBackstory("Error generating backstory.");
    }
  }


  return (
    <div>
      <div>
        <StepWizard steps={steps} onCharacterChange={handleCharacterChange} />
      </div>

      <button onClick={generateBackstory}>
        Generate Backstory
      </button>

      {backstory && (
        <div className="backstory">
          <h3>Character Backstory</h3>
          <p>{backstory}</p>
        </div>
      )}
    </div>
  );

};