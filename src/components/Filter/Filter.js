import React, { useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button, ButtonGroup } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import Select from "react-select";

const API_KEY = process.env.REACT_APP_API_KEY;

const Filter = ({
  onChangeCountPrice,
  count_res,
  onSubmitForm,
  onCheckRooms,
  onChangeCity,
  valueFrom,
  valueTo,
  cSelected,
  cityID,
}) => {
  const [{ response: citiesResponse, isLoading: citiesIsLoading }, doFetchCities] = useFetch(
    `/states?api_key=${API_KEY}&lang_id=4`
  );

  // const [{ response: paramsResponse, isLoading: paramsIsLoading }, doFetchParams] = useFetch(
  //   `/options?category=4&realty_type=2&operation_type=1&api_key=${API_KEY}`
  // );

  // useEffect(() => {
  //   doFetchParams();
  // }, [doFetchParams]);

  useEffect(() => {
    doFetchCities();
  }, [doFetchCities]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitForm();
  }

  function handleChangeCity(data) {
    onChangeCity(data);
  }

  function handleChangeCountRooms(e) {
    e.preventDefault();
    onCheckRooms(e);
  }
  let arr = [];

  !citiesIsLoading &&
    citiesResponse &&
    citiesResponse
      .sort((a, b) => a.stateID - b.stateID)
      .map((item) =>
        arr.push({
          value: item.stateID,
          label: `${item.region_name}, ${item.name} обл.`,
        })
      );

  return (
    <Form className="position-sticky" style={{ top: "60px" }}>
      <FormGroup>
        <Label for="exampleSelect">
          <b>Виберіть місто</b>
        </Label>
        <Select
          options={arr}
          onChange={handleChangeCity}
          value={arr.find((op) => op.value === cityID)}
        />
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
            onClick={handleChangeCountRooms}
            data-rooms={"1"}
            active={cSelected.includes(1)}
          >
            1{" "}
          </Button>
          <Button
            outline
            className="mr-2 ml-2"
            color="secondary"
            onClick={handleChangeCountRooms}
            data-rooms={"2"}
            active={cSelected.includes(2)}
          >
            2{" "}
          </Button>
          <Button
            outline
            className="mr-2 ml-2"
            color="secondary"
            onClick={handleChangeCountRooms}
            data-rooms={"3"}
            active={cSelected.includes(3)}
          >
            3{" "}
          </Button>
          <Button
            className="ml-2"
            outline
            color="secondary"
            onClick={handleChangeCountRooms}
            data-rooms={"4"}
            active={cSelected.includes(4)}
          >
            4+
          </Button>
        </ButtonGroup>
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
              placeholder="від (UAH)"
              value={valueFrom}
              onChange={(e) => onChangeCountPrice(e.target)}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              name="priceTo"
              id="priceTo"
              placeholder="до (UAH)"
              value={valueTo}
              onChange={(e) => onChangeCountPrice(e.target)}
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
