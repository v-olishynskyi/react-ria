import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { Row, Col } from "reactstrap";
import Filter from "../../components/Filter/Filter";
import NoSearchResult from "../../components/NoSearchResults/NoSearchResult";
import PreviewCard from "../../components/PreviewCard/PreviewCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import Axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = ({ location }) => {
  const [ls, setLs] = useLocalStorage("userFilter");
  // eslint-disable-next-line no-unused-vars
  const [cSelected, setCSelected] = useState(ls ? ls.cSelected : []);
  const [priceFrom, setPriceFrom] = useState(ls ? ls.priceFrom : "");
  const [priceTo, setPriceTo] = useState(ls ? ls.priceTo : "");
  const [cityID, setCityID] = useState(ls ? ls.cityID : 4);

  const apiURL = `search?api_key=${API_KEY}&city_id=${cityID}&stateID=4&category=1&realty_type=2&operation_type=1&page=0&characteristic[209][from]=${
    cSelected && cSelected.sort((a, b) => a - b)[0] ? cSelected.sort((a, b) => a - b)[0] : 1
  }${
    cSelected && cSelected.sort((a, b) => a - b)[cSelected.length - 1] >= 4
      ? ""
      : "&characteristic[209][to]=" + cSelected.sort((a, b) => a - b)[cSelected.length - 1]
  }&characteristic[234][from]=${priceFrom}&characteristic[234][to]=${priceTo}&characteristic[242]=240&limit=5&page=0`;

  const [{ response, isLoading }, doFetch] = useFetch(apiURL);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    async function getRate() {
      try {
        const res = await Axios.get(
          "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
        );
        setRate(res.data);
      } catch (error) {
        console.warn(error);
      }
    }

    getRate();
  }, []);

  let rateUSD = null;
  rate && rate.map((item) => (item.ccy.toLowerCase() === "usd" ? (rateUSD = item.buy) : ""));

  useEffect(() => {
    setLs({ priceFrom, priceTo, cityID, cSelected });
    doFetch();
  }, [doFetch, priceFrom, priceTo, cityID, setLs, cSelected]);

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

  function onCheckboxBtnClick(element) {
    const selected = parseInt(element.target.dataset.rooms);

    const index = cSelected.indexOf(selected);

    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
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
            onCheckRooms={onCheckboxBtnClick}
            onChangeCity={handleChangeCity}
            valueFrom={ls ? ls.priceFrom : priceFrom}
            valueTo={ls ? ls.priceTo : priceTo}
            cSelected={cSelected}
          />
        </Col>
        <Col md="9">
          {isLoading ? (
            <Loader />
          ) : !isLoading && response && response.count > 0 ? (
            response.items
              .slice(20, 40)
              .map((id, key) => (
                <PreviewCard
                  key={key}
                  id={id}
                  location={location}
                  onChangeSaved={handleSaved}
                  rateUSD={rateUSD}
                />
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
