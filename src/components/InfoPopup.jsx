import React, { useEffect, useState } from "react";
import "./InfoPopup.css"; // optional styling
import { fetchTraits } from "../services/api";

export default function InfoPopup({ open, onClose, info }) {

  const [traitNames, setTraitNames] = useState([]);

  // const { name, description, prerequisites, traits, level } = info;
  const name = info?.name ?? null;
  const description = info?.description ?? null;
  const prerequisites = info?.prerequisites ?? null;
  const traits = info?.traits ?? null;
  const level = info?.level ?? null;
 
useEffect(() => {
  if (open && traits) {
    fetchTraits({
      page: 1,
      pageSize: 20,
      collection: "traits",
      filter: `id=in=(${traits.join(",")})`,
      fields: "id,name,description,meta_data",
      sort: ""
    }).then((res) => {
      console.log("Fetched traits:", res);
      setTraitNames(res.data.map(item=>item.name));
    });
  }
}, [open, traits]);


  return (
    <>
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-window" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h2>{name}</h2>
        <p><strong>Description:</strong> {description}</p>
        {prerequisites && (
          <p><strong>Prerequisites:</strong> {prerequisites}</p>
        )}
        {traits && traits.length > 0 && (
          <p><strong>Traits:</strong> {traitNames.join(", ")}</p>
        )}
        {(level !== undefined && level>=1) && (
          <p><strong>Level:</strong> {level}</p>
        )}
      </div>
    </div>
    </>
  );
}