import { useCallback, useEffect, useRef, useState } from "react";
import { generalFetch } from "./api";

export default function usePagination(fetcher, collection, filter, fields, sort, pageSize = 10, disabled=true, open=false) {
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
        // console.log("current", current, "reqId.current", reqId.current);
        if (!mounted.current || current !== reqId.current) return;
        setItems(result.data || []);
        // console.log("result.data: ", result.data);
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
      });
  }, [fetcher,filter, pageSize]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const goToPage = useCallback((p) => {
    const normalized = Math.min(Math.max(1, Math.floor(p)), pageCount);
    return loadPage(normalized);
  }, [loadPage, pageCount]);

  const refresh = useCallback(() => loadPage(page), [loadPage, page]);

  useEffect(() => {
    if(!disabled && open){
        loadPage(1).catch((e) => {console.log("initial load error: ",e);}); // initial load
    }
  }, [disabled,open,loadPage]);


  return { page, total, items, loading, error, pageCount, loadPage, goToPage, refresh };
}
