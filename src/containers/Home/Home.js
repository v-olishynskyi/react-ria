import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { Row, Col } from "reactstrap";
import Filter from "../../components/Filter/Filter";
import NoSearchResult from "../../components/NoSearchResults/NoSearchResult";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import useLocalStorage from "../../hooks/useLocalStorage";

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = ({ location }) => {
  const [ls, setLs] = useLocalStorage("userFilter");
  // eslint-disable-next-line no-unused-vars
  const [checkCountRooms, setCheckCountRooms] = useState(0);
  const [priceFrom, setPriceFrom] = useState(ls ? ls.priceFrom : "");
  const [priceTo, setPriceTo] = useState(ls ? ls.priceTo : "");
  const [cityID, setCityID] = useState(ls ? ls.cityID : 4);

  const [{ response, isLoading }, doFetch] = useFetch(
    `search?api_key=${API_KEY}&city_id=${cityID}&stateID=4&category=1&realty_type=2&operation_type=1&page=0&limit=10&characteristic[209][from]=1&characteristic[209][to]=2&characteristic[234][from]=${priceFrom}&characteristic[234][to]=${priceTo}&characteristic[242]=240`
  );

  useEffect(() => {
    setLs({ priceFrom, priceTo, cityID });
  }, [priceFrom, priceTo, cityID, setLs]);

  useEffect(() => {
    doFetch();
  }, [doFetch, priceFrom, priceTo, cityID]);

  // if (!isLoading && response) console.log(response);

  function handleChangePrice(element) {
    element.id === "priceFrom" ? setPriceFrom(element.value) : setPriceTo(element.value);
  }

  function onSubmit() {
    doFetch();
  }

  function handleSaved(data) {
    return;
  }

  function checkRooms(data) {
    setCheckCountRooms(data);
  }

  function handleChangeCity(data) {
    setCityID(data);
  }

  return (
    <>
      <Row>
        <Col md="3">
          <Filter
            onChangeCountPrice={handleChangePrice}
            count_res={!isLoading && response ? response.count : 0}
            onSubmitForm={onSubmit}
            // onCheckRooms={checkRooms}
            onChangeCity={handleChangeCity}
            valueFrom={ls ? ls.priceFrom : priceFrom}
            valueTo={ls ? ls.priceTo : priceTo}
          />
        </Col>
        <Col md="9">
          {isLoading ? (
            <Loader />
          ) : !isLoading && response && response.count > 0 ? (
            response.items
              .slice(20, 40)
              .map((id, key) => (
                <PreviewCard key={key} id={id} location={location} onChangeSaved={handleSaved} />
              ))
          ) : (
            <NoSearchResult />
          )}

          {/* <PreviewCard
            id={16961100}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16603196}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16726059}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16961100}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16603196}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16726059}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16961100}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16603196}
            location={location}
            onChangeSaved={handleSaved}
          />
          <PreviewCard
            id={16726059}
            location={location}
            onChangeSaved={handleSaved}
          /> */}
        </Col>
      </Row>
    </>
  );
};

export default Home;
