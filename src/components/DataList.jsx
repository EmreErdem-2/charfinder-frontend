// src/components/DataList.jsx
import { useEffect, useState } from 'react';
import { fetchAllData } from '../services/api';

const DataList = ({ type }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData(type)
      .then(setItems)
      .catch(setError);
  }, [type]);

  if (error) return <p>Error loading {type}</p>;
  if (!items.length) return <p>Loading {type}...</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id || item.uuid}>
          <strong>{item.name || item.title}</strong>
          {item.level && <> — Level {item.level}</>}
          <br/> {item.description}
        </li>
      ))}
    </ul>
  );
};

export default DataList;