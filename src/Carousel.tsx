import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import "./Carousel.css";

export type CarouselData = {
  id: number;
  title: string;
  images: string[];
};

// Types
type Arrow = "left" | "right";

// Constants
// TODO: Make them configurable using props when converting to a lib
const SLIDES_TO_SHOW = 4;
const SPACE_BETWEEN_SLIDES = 10;
// TODO: Add prefix to classnames when converting to a lib
// to avoid collisions
const LEFT_ARROW_CLASS_NAME = "left-arrow";
const RIGHT_ARROW_CLASS_NAME = "right-arrow";
const ROOT_CLASS_NAME = "root";

const useCarousel = (itemCount: number) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [translateIndex, setTranslateIndex] = useState(0);
  const [translate, setTranslate] = useState(0);

  // Constant Calculations
  const fullSlideDistance =
    SLIDES_TO_SHOW * (imageWidth + SPACE_BETWEEN_SLIDES);
  const fullSlides = Math.floor(itemCount / SLIDES_TO_SHOW);
  const nonFullSlides = itemCount % SLIDES_TO_SHOW;
  const nonFullSlideDistance =
    nonFullSlides * imageWidth + nonFullSlides * SPACE_BETWEEN_SLIDES;

  // Translate sequence when user clicks on next:
  // Generating whole sequence before
  // to co-locate all the calculations in a single place
  // this will reduce the bug surface area
  // and help in debugging!
  // After the seq is generated the only work left by the
  // next and previous click handler is to calculate index (+/-1)
  // and pick the corresponding translate value from this sequence
  const forwardSequence = useMemo(() => {
    // Seed, start of the scroll
    const sequence = [0];

    // Full slides scroll
    for (let i = 1; i < fullSlides; i++) {
      sequence.push(sequence[sequence.length - 1] - fullSlideDistance);
    }

    // Remaining slide scroll
    if (nonFullSlides) {
      sequence.push(sequence[sequence.length - 1] - nonFullSlideDistance);
    }
    return sequence;
  }, [fullSlideDistance, fullSlides, nonFullSlides, nonFullSlideDistance]);

  // Translate sequence when user clicks on previous
  // For more understanding read the docs for forwardSequence fn
  // Generating a different backwardSequence since
  // in the case of uneven no of slides
  // backward and forward movements will be different
  const backwardSequence = useMemo(() => {
    // Seed, end of the scroll
    const sequence = [
      -1 * (fullSlideDistance * (fullSlides - 1) + nonFullSlideDistance),
    ];

    // Full slides scroll
    for (let i = 1; i < fullSlides; i++) {
      sequence.push(sequence[sequence.length - 1] + fullSlideDistance);
    }

    // Remaining slide scroll
    if (nonFullSlides) {
      sequence.push(sequence[sequence.length - 1] + nonFullSlideDistance);
    }
    sequence.reverse();
    return sequence;
  }, [fullSlideDistance, fullSlides, nonFullSlides, nonFullSlideDistance]);

  // TODO: Use resize observer to adjust image width in response to viewport changes
  // Calculate image width after first render
  // Image width depends on the available space for the root component
  // This is just to make sure we are only rendering 4 items by default
  useEffect(() => {
    // Root will take the 100% of the width of the container its render in
    const root = document.getElementsByClassName(ROOT_CLASS_NAME)[0];
    const { width: rootWidth } = root.getBoundingClientRect();

    const leftArrowWidth = document
      .getElementsByClassName(LEFT_ARROW_CLASS_NAME)[0]
      .getBoundingClientRect().width;

    const rightArrowWidth = document
      .getElementsByClassName(RIGHT_ARROW_CLASS_NAME)[0]
      .getBoundingClientRect().width;

    // Width take by arrows and space between images
    const auxiliaryWidth =
      leftArrowWidth +
      rightArrowWidth +
      // White space between images
      (SLIDES_TO_SHOW - 1) * SPACE_BETWEEN_SLIDES;

    const imageWidth = (rootWidth - auxiliaryWidth) / SLIDES_TO_SHOW;
    setImageWidth(imageWidth);
  }, []);

  const handleArrowClick = useCallback(
    (arrow: Arrow) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (arrow === "left") {
        const nextIndex = Math.max(translateIndex - 1, 0);
        setTranslateIndex(nextIndex);
        setTranslate(backwardSequence[nextIndex]);
      } else {
        const nextIndex = Math.min(translateIndex + 1, forwardSequence.length);
        setTranslateIndex(nextIndex);
        setTranslate(forwardSequence[nextIndex]);
      }
    },
    [forwardSequence, translateIndex, backwardSequence]
  );

  const leftArrowProps = useMemo(() => {
    return {
      onClick: handleArrowClick("left"),
      className: LEFT_ARROW_CLASS_NAME,
      disabled: translateIndex === 0,
    };
  }, [handleArrowClick, translateIndex]);

  const rightArrowProps = useMemo(() => {
    return {
      onClick: handleArrowClick("right"),
      className: RIGHT_ARROW_CLASS_NAME,
      disabled: translateIndex === forwardSequence.length - 1,
    };
  }, [handleArrowClick, translateIndex, forwardSequence]);

  const slideContainerProps = useMemo(() => {
    return {
      className: "slides",
      style: { transform: `translate(${translate}px)` },
    };
  }, [translate]);

  return {
    imageWidth,
    // Passing down props obj from a hook
    // to make it headless for providing
    // user specific styles
    // when converting into a lib
    leftArrowProps,
    rightArrowProps,
    slideContainerProps,
  };
};

/**
 * Main and the only exported component for rendering the carousel
 * @prop data {CarouselData[]} Array to render items/images in the carousel
 * @prop ItemComponent {({width: number, data: CarouselData})} => JSX User provided component to render slides
 */
const Carousel: FC<{
  data: CarouselData[];
  ItemComponent: React.ElementType;
}> = (props) => {
  const { data, ItemComponent } = props;
  const {
    imageWidth,
    slideContainerProps,
    leftArrowProps,
    rightArrowProps,
  } = useCarousel(data.length);
  return (
    <div className={ROOT_CLASS_NAME}>
      <button {...leftArrowProps}>P</button>
      <div className="container">
        <ul {...slideContainerProps}>
          {data.map((item) => (
            <li key={item.id}>
              <ItemComponent data={item} width={imageWidth} />
            </li>
          ))}
        </ul>
      </div>
      <button {...rightArrowProps}>N</button>
    </div>
  );
};

export { Carousel };
