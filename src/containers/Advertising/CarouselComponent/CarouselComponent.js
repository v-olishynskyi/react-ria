import React, { useState } from "react";
import { Carousel, CarouselControl, CarouselItem, Row, Col } from "reactstrap";
import "./CarouselComponent.scss";

const Advertising = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === photos.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? photos.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = photos.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.file}
      >
        <picture>
          <source
            srcSet={"https://cdn.riastatic.com/photos/" + item.file.replace(/\.jpg/gi, "b.webp")}
            type="image/webp"
          />
          <img src={`https://cdn.riastatic.com/photos/${item.file}`} alt={item.altText} />
        </picture>
      </CarouselItem>
    );
  });

  return (
    <>
      <Row>
        <Col lg="7" md="12">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={false}
            slide={false}
          >
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </Col>
        <Col lg="5" md="12">
          <ol className="list-photos d-flex flex-row flex-wrap">
            {photos.map((item, key) => (
              <li key={key} className="photo" onClick={() => goToIndex(key)}>
                <picture>
                  <source
                    srcSet={
                      "https://cdn.riastatic.com/photos/" + item.file.replace(/\.jpg/gi, "b.webp")
                    }
                    type="image/webp"
                  />
                  <img
                    className={activeIndex === key ? "active-img" : ""}
                    src={`https://cdn.riastatic.com/photos/${item.file}`}
                    alt={item.altText}
                  />
                </picture>
              </li>
            ))}
          </ol>
        </Col>
      </Row>
    </>
  );
};

export default Advertising;
