export const fetchAllData = async (type) => {
  const response = await fetch(`/data/test/${type}.json`);
  if (!response.ok) throw new Error(`Failed to fetch ${type}`);
  const json = await response.json();
  return json.data;
};

export function generalFetch(url, path, collection, filter, fields, sort, page, pageSize) {
  return fetch(`${url}${path}${collection}?filter=${filter}&fields=${fields}&sort=${sort}&page=${page}&pageSize=${pageSize}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(json => ({
      data: json.data,
      metadata: { totalCount: json.metadata.totalCount,
                    page: json.metadata.page,
                    pageSize: json.metadata.pageSize
       }
    }))
    .catch(err => console.error("Fetch error: ", err));
}

export function fetchCollectionsPaged(page, collection, filter, fields, sort, pageSize) {
    const url = "http://localhost:8080";
    const path = "/api/rules/search/";
    // const collection = "feats";
    // const filter = "deprecated!=true";
    // const fields = "id,name,rarity,deprecated";
  return generalFetch(url, path, collection, filter, fields, sort, page, pageSize);
}

//http://localhost:5000/api/rules/search/feats?filter=deprecated!=true&fields=id,name,rarity,deprecated&page=1&pageSize=10

export function fetchTraits(query) {
    const url = "http://localhost:8080";
    const path = "/api/rules/search/";
    // const collection = "feats";
    // const filter = "deprecated!=true";
    // const fields = "id,name,rarity,deprecated";
  return generalFetch(url, path, query.collection, query.filter, query.fields, query.sort, query.page, query.pageSize);
}

export async function fetchGeneratedBackstory(characterInfo) {
  const response = await fetch("http://localhost:8080/generate/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: characterInfo
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Response: ", data.response);
  return data.response;
}