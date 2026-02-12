export const steps = [
  {
    key: "ancestry",
    collection: "ancestries",
    placeholder: "Choose an ancestry",
    filter: "deprecated!=true",
    fields: "id,name,rarity,trait_id,description",
    sort: "id-asc",
  },
  {
    key: "ancestryHeritage",
    collection: "feats",
    placeholder: "Choose an ancestry heritage",
    filter: (character) =>
      character?.ancestry?.trait_id
        ? `level==-1;traits=in=${character.ancestry.trait_id};deprecated!=true`
        : null,
    fields: "id,name,rarity,level,traits,description",
    sort: "level-asc,name-asc",
    dependsOn: "ancestry",
  },
  {
    key: "background",
    collection: "backgrounds",
    placeholder: "Choose a background",
    filter: "deprecated!=true",
    fields: "id,name,rarity,description,operations",
    sort: "name-asc",
    dependsOn: "ancestryHeritage",
  },
  {
    key: "class",
    collection: "classes",
    placeholder: "Choose a class",
    filter: "deprecated!=true",
    fields: "id,name,rarity,trait_id,description",
    sort: "name-asc",
    dependsOn: "background",
  },
  {
    key: "classFeat",
    collection: "feats",
    placeholder: "Choose a class feat",
    filter: (character) =>
      character?.class?.trait_id
        ? `traits=in=${character.class.trait_id};deprecated!=true`
        : null,
    fields: "id,name,rarity,level,traits,description",
    sort: "level-asc,name-asc",
    dependsOn: "class",
  },
  // 🔥 Optional step: only show if ancestry is "Elf"
  {
    key: "elfSpecial",
    collection: "feats",
    placeholder: "Choose an Elf special feat",
    filter: "traits=in=elf-special",
    fields: "id,name,description",
    sort: "name-asc",
    dependsOn: "ancestry",
    showIf: (character) => character?.ancestry?.name === "Elf",
  },
];