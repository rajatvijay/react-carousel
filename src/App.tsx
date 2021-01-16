import React, { useEffect, useState } from "react";
import { Carousel, CarouselData } from "./Carousel";
import { CarouselItem } from "./CarouselItem";
import { complexCarouselData, simpleCarouselItem } from "./data";

const getComplexCarouselData = (): Promise<CarouselData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(complexCarouselData);
    }, 2000);
  });
};

function App() {
  const [serverCarouselData, setServerCarouselData] = useState<CarouselData[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getComplexCarouselData().then((data) => {
      setServerCarouselData(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="application">
      <h2>Server Carousel</h2>
      {/* TODO: Show a better loader when doing styling */}
      {loading ? <p>Loading...</p> : null}
      {serverCarouselData.length ? (
        <Carousel ItemComponent={CarouselItem} data={serverCarouselData} />
      ) : null}
      <br />
      <h2>Complex Carousel</h2>
      <Carousel ItemComponent={CarouselItem} data={complexCarouselData} />
      <br />
      <h2>Simple Carousel</h2>
      <Carousel ItemComponent={CarouselItem} data={simpleCarouselItem} />
    </div>
  );
}

export default App;
