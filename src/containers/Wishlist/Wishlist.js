import React, { useState } from "react";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import NoSearchResult from "../../components/NoSearchResults/NoSearchResult";

const Wishlist = ({ location }) => {
  const ls = JSON.parse(localStorage.getItem("savedItem"));
  const [, setSaved] = useState([]);
  function handleSaved(data) {
    setSaved(data);
  }

  return (
    <>
      {ls && ls.length > 0 ? (
        ls.map((id, key) => (
          <PreviewCard
            key={key}
            id={id}
            location={location}
            onChangeSaved={handleSaved}
          />
        ))
      ) : (
        <NoSearchResult />
      )}
    </>
  );
};

export default Wishlist;
