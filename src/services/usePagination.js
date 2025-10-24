import { useCallback, useEffect, useRef, useState } from "react";
import { generalFetch } from "./api";

export default function usePagination(fetcher, collection, filter, fields, sort, pageSize = 10) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reqId = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const loadPage = useCallback((p = 1) => {
    const target = Math.max(1, Math.floor(p));
    // console.log("TARGET: ", target);
    const current = ++reqId.current;
    setLoading(true);
    setError(null);

    return fetcher(target, collection, filter, fields, sort, pageSize)
      .then((result) => {
        console.log("Result from fetcher:", result);
        console.log("current", current, "reqId.current", reqId.current);
        if (!mounted.current || current !== reqId.current) return;
        console.log("arrived after mounted controls");
        setItems(result.data || []);
        console.log("result.data: ", result.data);
        console.log("data/items state: ", items); 
        setTotal(typeof result.metadata.totalCount === "number" ? result.metadata.totalCount : (result.data || []).length);
        setPage(target);
      })
      .catch((err) => {
        if (!mounted.current || current !== reqId.current) return;
        setError(err);
        throw err; // propagate so caller can catch
      })
      .finally(() => {
        if (mounted.current && current === reqId.current) setLoading(false);
        console.log("items: ", items);
        //setLoading(false);
      });
  }, [fetcher, pageSize]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const goToPage = useCallback((p) => {
    const normalized = Math.min(Math.max(1, Math.floor(p)), pageCount);
    return loadPage(normalized);
  }, [loadPage, pageCount]);

  const refresh = useCallback(() => loadPage(page), [loadPage, page]);

  useEffect(() => {
    loadPage(1).catch((e) => {
        console.log("initial load error: ",e);
    }); // initial load
  }, [loadPage]);


  return { page, total, items, loading, error, pageCount, loadPage, goToPage, refresh };
}


export function fetchCollectionsPaged(page, collection, filter, fields, sort, pageSize) {
    const url = "http://localhost:5000";
    const path = "/api/rules/search/";
    // const collection = "feats";
    // const filter = "deprecated!=true";
    // const fields = "id,name,rarity,deprecated";
  return generalFetch(url, path, collection, filter, fields, sort, page, pageSize);
}



//http://localhost:5000/api/rules/search/feats?filter=deprecated!=true&fields=id,name,rarity,deprecated&page=1&pageSize=10