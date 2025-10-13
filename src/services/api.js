

export const fetchAllData = async (type) => {
  const response = await fetch(`/data/test/${type}.json`);
  if (!response.ok) throw new Error(`Failed to fetch ${type}`);
  const json = await response.json();
  return json.data;
};


