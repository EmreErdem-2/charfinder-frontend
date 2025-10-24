

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
    .catch(err => console.error("Fetch error: ", error));
}