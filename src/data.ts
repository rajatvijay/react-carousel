export const complexCarouselData = [
  {
    id: 1,
    title: "First Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=1",
      "https://dummyimage.com/600x400/000/fff&text=2",
      "https://dummyimage.com/600x400/000/fff&text=3",
    ],
  },
  {
    id: 2,
    title: "Second Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=4",
      "https://dummyimage.com/600x400/000/fff&text=5",
    ],
  },
  {
    id: 3,
    title: "Third Block",
    images: ["https://dummyimage.com/600x400/000/fff&text=6"],
  },
  {
    id: 4,
    title: "Fourth Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=1",
      "https://dummyimage.com/600x400/000/fff&text=2",
      "https://dummyimage.com/600x400/000/fff&text=3",
    ],
  },
  {
    id: 5,
    title: "Fifth Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=4",
      "https://dummyimage.com/600x400/000/fff&text=5",
    ],
  },
  {
    id: 6,
    title: "Sixth Block",
    images: ["https://dummyimage.com/600x400/000/fff&text=6"],
  },
  {
    id: 7,
    title: "Seventh Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=1",
      "https://dummyimage.com/600x400/000/fff&text=2",
      "https://dummyimage.com/600x400/000/fff&text=3",
    ],
  },
  {
    id: 8,
    title: "Eight Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=4",
      "https://dummyimage.com/600x400/000/fff&text=5",
    ],
  },
  {
    id: 9,
    title: "Ninth Block",
    images: ["https://dummyimage.com/600x400/000/fff&text=6"],
  },
  {
    id: 10,
    title: "Tenth Block",
    images: [
      "https://dummyimage.com/600x400/000/fff&text=1",
      "https://dummyimage.com/600x400/000/fff&text=2",
      "https://dummyimage.com/600x400/000/fff&text=3",
    ],
  },
];

export const simpleCarouselItem = Array(15)
  .fill(1)
  .map((_, index) => ({
    title: `${index + 1} Item`,
    id: index + 1,
    images: [`https://dummyimage.com/600x400/000/fff&text=${index + 1}`],
  }));
