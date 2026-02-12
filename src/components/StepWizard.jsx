import { useState } from "react";
import CollapsibleList from "./CollapsibleList";
import { fetchCollectionsPaged } from "../services/api";

// recursively find all dependent step keys
function getDependentKeys(changedKey, steps) {
  const direct = steps
    .filter(s => s.dependsOn === changedKey)
    .map(s => s.key);

  const indirect = direct.flatMap(d => getDependentKeys(d, steps));
  return [...direct, ...indirect];
}

export function StepWizard({ steps, onCharacterChange }) {
  // domain data only
  const [character, setCharacter] = useState({
    name: "",
    level: 1,
    ancestry: null,
    background: null,
    class: null,
    generalFeat: null,
    classFeat: null,
    skills: null,
  });

  // wizard bookkeeping
  const [chosen, setChosen] = useState([]);

  const handleSelect = (data, key) => {
    setCharacter(prev => {
      const updated = { ...prev, [key]: data };

      // reset all downstream dependents in character
      const resetKeys = getDependentKeys(key, steps);
      resetKeys.forEach(depKey => {
        updated[depKey] = null;
      });

      // notify parent
      if (onCharacterChange) {
        onCharacterChange(updated);
      }


      // const result = Object.entries(character)
      //   .filter(([_, o]) => o?.name)
      //   .map(([key, o]) => ({
      //     key,
      //     name: o.name,
      //     description: o.description ?? null
      //   }));

      // // Convert to JSON string
      // const json = JSON.stringify(result, null, 2); // pretty-print with 2 spaces
      // console.log(json);

      return updated;
    });

    setChosen(prev => {
      // remove all downstream dependents from chosen
      const resetKeys = getDependentKeys(key, steps);
      const filtered = prev.filter(k => !resetKeys.includes(k));

      // add current key if not already present
      return filtered.includes(key) ? filtered : [...filtered, key];
    });
  };

  return (
    <>
      {steps.map(step => {
        // skip optional steps if condition not met
        if (step.showIf && !step.showIf(character)) {
          return null;
        }

        // compute filter (static string or function)
        const filter =
          typeof step.filter === "function"
            ? step.filter(character)
            : step.filter;

        // enabled if no dependency or dependency is chosen
        const enabled =
          !step.dependsOn || chosen.includes(step.dependsOn);

        return (
          <div key={step.key} style={{ maxWidth: 480, marginBottom: 12 }}>
            <CollapsibleList
              key={character[step.key]?.id ?? "waiting"} // force reset on change
              fetchPage={fetchCollectionsPaged}
              onSelect={data => handleSelect(data, step.key)}
              value={character[step.key]}
              collection={step.collection}
              filter={filter}
              fields={step.fields}
              sort={step.sort}
              pageSize={8}
              placeholder={step.placeholder}
              disabled={!enabled}
            />
          </div>
        );
      })}
    </>
  );
}