import React, { useEffect, useState } from "react";
import { Row, Col, NavLink, CardImg, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AddToWishlist from "../AddToWishlist/AddToWishlist";

const API_KEY = process.env.REACT_APP_API_KEY;

const PreviewCard = ({ id, location, onChangeSaved, rateUSD }) => {
  const [{ response, isLoading }, doFetch] = useFetch(`info/${id}?api_key=${API_KEY}`);

  const [saved, setSaved] = useState(JSON.parse(localStorage.getItem("savedItem")));

  const addToWishlist = React.useCallback(() => {
    const ls = localStorage.getItem("savedItem");
    let arr = JSON.parse(ls);

    if (arr) {
      if (arr.includes(id)) {
        arr.splice(arr.indexOf(id), 1);
      } else {
        arr.push(id);
      }
      localStorage.setItem("savedItem", JSON.stringify(arr));
    } else {
      localStorage.setItem("savedItem", JSON.stringify([id]));
    }

    setSaved(arr);
  }, [id]);

  useEffect(() => {
    doFetch("Cache-Control: private, max-age=60");
  }, [doFetch]);

  useEffect(() => {
    onChangeSaved(saved);
  }, [saved, onChangeSaved]);

  return (
    <>
      {!isLoading && response && (
        <>
          <Row className="">
            <Col md="5">
              <NavLink tag={Link} to={`/ad/${response.realty_id}`} className="p-0">
                <CardImg
                  width="100%"
                  src={
                    response.main_photo
                      ? `https://cdn.riastatic.com/photos/` +
                        response.main_photo.replace(/\.jpg/gi, "b.webp")
                      : "https://i.ibb.co/3S8dYVM/unnamed.jpg"
                  }
                ></CardImg>
              </NavLink>
            </Col>
            <Col md={{ size: "7" }}>
              <CardTitle className="card-title-text">
                <NavLink tag={Link} to={`/ad/${response.realty_id}`} className="p-0">
                  {response.district_name ? "р-н. " + response.district_name + ", " : ""}{" "}
                  {response.street_name ? `${response.street_name}, ` : ""}
                  {response.city_name ? `м. ${response.city_name}` : ""}
                </NavLink>
              </CardTitle>
              <CardSubtitle>
                <b
                  style={{
                    color: "#3c9806",
                    fontSize: "22px",
                  }}
                >
                  {response.currency_type === "$"
                    ? `${response.price.toLocaleString()} $`
                    : `${Math.floor(response.price / rateUSD).toLocaleString()} $`}{" "}
                  &middot;
                </b>{" "}
                {response.currency_type === "$"
                  ? (response.price * rateUSD).toLocaleString()
                  : response.price.toLocaleString()}{" "}
                грн
              </CardSubtitle>
              <CardText className="mb-2 mt-2">
                {response.rooms_count === 1
                  ? response.rooms_count + " кімната -"
                  : (response.rooms_count > 1 && response.rooms_count < 5) ||
                    response.rooms_count > 20
                  ? response.rooms_count + " кімнати - "
                  : response.rooms_count + " кімнат - "}{" "}
                {response.characteristics_values[214] ? response.characteristics_values[214] : ""} м
                <sup>2</sup>
              </CardText>
              <CardText className="mb-5">
                {response.description_uk
                  ? `${[...response.description_uk].slice(0, 60).join("")}`
                  : response.description
                  ? `${[...response.description].slice(0, 60).join("")}...`
                  : ""}
                ...
              </CardText>
              <Row
                className="position-absolute w-100 d-flex justify-content-between "
                style={{ bottom: 0 }}
              >
                <Col
                  xs="6"
                  className="d-flex align-items-center justify-content-start"
                  style={{ color: "#7a7a7a" }}
                >
                  <i className="icon-clock">
                    <svg
                      className="bi bi-clock"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>{" "}
                  {[...response.publishing_date].slice(0, 10).join("")}
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-end"
                  xs="1"
                  onClick={addToWishlist}
                >
                  <AddToWishlist id={id} location={location} />
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
        </>
      )}
    </>
  );
};

export default PreviewCard;
