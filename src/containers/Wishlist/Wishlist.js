import React, { useState } from "react";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import NoSearchResult from "../../components/NoSearchResults/NoSearchResult";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const Wishlist = ({ location }) => {
  const ls = JSON.parse(localStorage.getItem("savedItem"));
  const [saved, setSaved] = useState([]);
  const [arrItems] = useLocalStorage("items");

  function handleSaved(data) {
    setSaved(data);
  }

  useEffect(() => {}, [saved]);

  return (
    <>
      {ls && ls.length > 0 ? (
        ls.map((id, key) =>
          arrItems && arrItems.includes(id) ? (
            <PreviewCard key={key} id={id} location={location} onChangeSaved={handleSaved} />
          ) : null
        )
      ) : (
        <NoSearchResult />
      )}
    </>
  );
};

export default Wishlist;
