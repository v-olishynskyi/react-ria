import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button, ButtonGroup } from "reactstrap";
import useFetch from "../../hooks/useFetch";

const API_KEY = process.env.REACT_APP_API_KEY;

const Filter = ({
  onChangeCountPrice,
  count_res,
  onSubmitForm,
  ohCheckRooms,
  onChangeCity,
  valueFrom,
  valueTo,
}) => {
  const [cSelected, setCSelected] = useState([]);
  // const [{ response: paramsResponse, isLoading: paramsIsLoading }, doFetchParams] = useFetch(
  //   `/options?category=4&realty_type=2&operation_type=1&api_key=${API_KEY}`
  // );
  const [{ response: citiesResponse, isLoading: citiesIsLoading }, doFetchCities] = useFetch(
    `/states?api_key=${API_KEY}&lang_id=4`
  );

  // useEffect(() => {
  //   doFetchParams();
  // }, [doFetchParams]);

  useEffect(() => {
    doFetchCities();
  }, [doFetchCities]);

  const onCheckboxBtnClick = (selected) => {
    const indexOf = cSelected.indexOf(selected);

    if (indexOf < 0 && cSelected.length > 0) {
      cSelected.forEach((item, index) => (item > selected ? cSelected.splice(index, 1) : null));

      cSelected.push(selected);
    } else if (indexOf < 0 && cSelected.length === 0) {
      for (let i = 1; i <= selected; i++) {
        cSelected.push(i);
      }
    } else {
      cSelected.forEach((item, index) => (item > selected ? cSelected.splice(index, 1) : null));

      cSelected.splice(indexOf, 1);
    }
    setCSelected([...cSelected]);
    ohCheckRooms(cSelected);
  };

  function handleChangePrice(e) {
    onChangeCountPrice(e.target);
  }

  function handleChangeCity(e) {
    onChangeCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitForm();
  }

  // !paramsIsLoading && paramsResponse && console.log(paramsResponse);

  return (
    <Form className="position-sticky" style={{ top: "60px" }}>
      <FormGroup>
        <Label for="exampleSelect">
          <b>Виберіть місто</b>
        </Label>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          onChange={handleChangeCity}
          placeholder="Виберіть місто"
        >
          {!citiesIsLoading &&
            citiesResponse &&
            citiesResponse
              .sort((a, b) => a.stateID - b.stateID)
              .map((item, key) => (
                <option
                  key={key}
                  value={item.stateID}
                  selected={item.stateID === 4 ? true : false}
                >{`${item.region_name}, ${item.name} обл.`}</option>
              ))}
        </Input>
      </FormGroup>
      <FormGroup inline>
        <Label for="exampleCheckbox">
          <b>Кількість кімнат</b>
        </Label>
        <br />
        <ButtonGroup>
          <Button
            className="mr-2"
            outline
            color="secondary"
            onClick={() => onCheckboxBtnClick(1)}
            active={
              cSelected.includes(1) ||
              cSelected.includes(2) ||
              cSelected.includes(3) ||
              cSelected.includes(4)
            }
          >
            1{" "}
          </Button>
          <Button
            outline
            className="mr-2 ml-2"
            color="secondary"
            onClick={() => onCheckboxBtnClick(2)}
            active={cSelected.includes(2) || cSelected.includes(3) || cSelected.includes(4)}
          >
            2{" "}
          </Button>
          <Button
            outline
            className="mr-2 ml-2"
            color="secondary"
            onClick={() => onCheckboxBtnClick(3)}
            active={cSelected.includes(3) || cSelected.includes(4)}
          >
            3{" "}
          </Button>
          <Button
            className="ml-2"
            outline
            color="secondary"
            onClick={() => onCheckboxBtnClick(4)}
            active={cSelected.includes(4)}
          >
            4+
          </Button>
        </ButtonGroup>
        <p>Selected: {JSON.stringify(cSelected)}</p>
      </FormGroup>
      <FormGroup inline>
        <Label for="priceInput">
          <b>Ціна</b>
        </Label>
        <Row>
          <Col xs="6">
            <Input
              type="number"
              name="priceFrom"
              id="priceFrom"
              placeholder="від"
              value={valueFrom}
              onChange={handleChangePrice}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              name="priceTo"
              id="priceTo"
              placeholder="до"
              value={valueTo}
              onChange={handleChangePrice}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup className="d-flex justify-content-end">
        <Button color="success" onClick={handleSubmit}>
          Пошук {`(${count_res})`}
        </Button>
      </FormGroup>
    </Form>
  );
};

export default Filter;
