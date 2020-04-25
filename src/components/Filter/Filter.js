import React, { useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button, ButtonGroup } from "reactstrap";
import useFetch from "../../hooks/useFetch";

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

  function handleChangeCountRooms(e) {
    e.preventDefault();
    onCheckRooms(e);
  }

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
              onChange={handleChangePrice}
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              name="priceTo"
              id="priceTo"
              placeholder="до (UAH)"
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
