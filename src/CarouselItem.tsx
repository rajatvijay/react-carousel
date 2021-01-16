import React, { FC } from "react";
import { CarouselData } from "./Carousel";

const CarouselItem: FC<{
  data: CarouselData;
  width: number;
}> = (props) => {
  const { data, width } = props;
  const randomImage = data.images[Date.now() % data.images.length];
  return (
    <div style={{ width, display: "flex", flexDirection: "column" }}>
      <img src={randomImage} alt={data.title} />
      <p style={{ textAlign: "center" }}>{data.title}</p>
    </div>
  );
};

const MemoizedItem = React.memo(CarouselItem);
export { MemoizedItem as CarouselItem };
