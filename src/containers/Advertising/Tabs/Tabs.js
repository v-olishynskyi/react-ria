import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import classnames from "classnames";
import "./Tabs.scss";

const Tabs = ({ objInfo, rate }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="mt-4">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Основна інформація
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Характеристики
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <h5>Опис</h5>
          <p>{objInfo.description}</p>
          <Row></Row>
          <h5>Ціна:</h5>
          <p>
            <b
              style={{
                color: "#3c9806",
                fontSize: "22px",
              }}
            >
              {objInfo.currency_type === "$"
                ? `${objInfo.price.toLocaleString()} $`
                : `${Math.floor(objInfo.price / rate).toLocaleString()} $`}
            </b>{" "}
            за об’єкт
          </p>
          <p>
            {objInfo.currency_type === "$"
              ? (objInfo.price * rate).toLocaleString()
              : objInfo.price.toLocaleString()}{" "}
            грн &middot; &nbsp;
            {`${objInfo.price_item.toLocaleString()} ${objInfo.currency_type}`} за м²
          </p>
          <h5>Адреса:</h5>
          <p>
            {objInfo.district_name ? `р-н ${objInfo.district_name}, ` : ""}{" "}
            {objInfo.street_name ? `${objInfo.street_name}, ` : ""}
            {objInfo.building_number_str ? `дім ${objInfo.building_number_str}` : ""}
          </p>
        </TabPane>
        <TabPane tabId="2">
          <ul className="pl-0 characteristics_list">
            <Row className="mt-2">
              <Col xs="4">
                <li>Кімнат: </li>
              </Col>
              <Col xs="5">
                <div>{objInfo.rooms_count}</div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="4">
                <li>Поверх: </li>
              </Col>
              <Col xs="5">
                <div>{objInfo.floor}</div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="4">
                <li>Поверховість: </li>
              </Col>
              <Col xs="5">
                <div>{objInfo.floors_count}</div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="4">
                <li>Площа: </li>
              </Col>
              <Col xs="5">
                <div>
                  {objInfo.characteristics_values[214]}
                  {objInfo.characteristics_values[216]
                    ? ` · ${objInfo.characteristics_values[216]}`
                    : ""}
                  {objInfo.characteristics_values[218]
                    ? ` · ${objInfo.characteristics_values[218]} `
                    : ""}{" "}
                  м²
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="4">
                <li>Тип стін: </li>
              </Col>
              <Col xs="5">
                <div>{objInfo.wall_type}</div>
              </Col>
            </Row>
            {/* <Row className="mt-2">
              <Col xs="4">
                <div>Опалення: </div>
              </Col>
              <Col xs="5">
                <div>централізоване</div>
              </Col>
            </Row> */}
          </ul>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
