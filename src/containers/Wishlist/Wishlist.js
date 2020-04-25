import React, { useState } from "react";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import NoSearchResult from "../../components/NoSearchResults/NoSearchResult";

const Wishlist = ({ location }) => {
  const ls = JSON.parse(localStorage.getItem("savedItem"));
  const [, setSaved] = useState([]);

  function handleSaved(data) {
    setSaved(data);
  }
  //https://dom.ria.com/node/searchEngine/v2/?
  // category=1&
  // realty_type=2
  // &operation_type=1
  // &fullCategoryOperation=1_2_1
  // &page=277
  // &state_id=4
  // &city_id=4
  // &limit=10
  // &from_realty_id=
  // &to_realty_id=
  // &sort=inspected_sort
  // &user_id=&newbuildId=
  // &characteristic[234][from]=
  // &characteristic[234][to]=
  // &characteristic[242]=239
  // &characteristic[247]=252
  // &characteristic[265]=0
  // &characteristic[209][from]=1
  // &characteristic[209][to]=3
  // &roomss=on&roomss=on&roomss=on
  // &characteristic[214][from]=
  // &characteristic[214][to]=
  // &characteristic[216][from]=
  // &characteristic[216][to]=
  // &characteristic[218][from]=
  // &characteristic[218][to]=
  // &characteristic[227][from]=
  // &characteristic[227][to]=
  // &characteristic[228][from]=
  // &characteristic[228][to]=
  // &characteristic[1607][from]=
  // &characteristic[1607][to]=
  // &characteristic[1608][from]=
  // &characteristic[1608][to]=
  // &characteristic[1792][from]=
  // &characteristic[1792][to]=
  // &realty_id_only=&date_from=
  // &date_to=
  // &with_phone=
  // &exclude_my=
  // &new_housing_only=
  // &banks_only=
  // &exclude_realty_id=
  // &email=vlad.olishynski@gmail.com
  // &_csrf=BkigmBV7-Yf2WJ_vgbOPkd2iilrcBYmA1NQs
  // &reviewText=
  // &email=vlad.olishynski@gmail.com
  // &email=
  // &period=0
  // &isFromSearch=1
  return (
    <>
      {ls && ls.length > 0 ? (
        ls.map((id, key) => (
          <PreviewCard key={key} id={id} location={location} onChangeSaved={handleSaved} />
        ))
      ) : (
        <NoSearchResult />
      )}
    </>
  );
};

export default Wishlist;
