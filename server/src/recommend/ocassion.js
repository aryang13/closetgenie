// formal, casual, comfy

function getTopsBasedOnOccasion(occasion, tops) {
  // ...
  const filteredTops = [];
  switch (occasion) {
    case "formal": {
      filteredTops = tops.filter((top) => {
        return top.type === "shirt" || top.type === "coat";
      });
      return filteredTops;
    }
    case "casual": {
      filteredTops = tops.filter((top) => {
        return top.type === "tshirt" || top.type === "sweatshirt" || top == "coat";
      });

      return filteredTops;
    }
    case "comfy": {
      filteredTops = tops.filter((top) => {
        return top.type === "tshirt" || top.type === "sweatshirt";
      });

      return filteredTops;
    }
  }

  return filteredTops;
}

function getBottomsBasedOnOccasion(occasion, bottoms) {
  // ...
  const filteredBottoms = [];
  switch (occasion) {
    case "formal": {
      filteredBottoms = bottoms.filter((bottom) => {
        return bottom.type === "pant" || bottom.type === "dress";
      });
      return filteredBottoms;
    }
    case "casual": {
      filteredBottoms = bottoms.filter((bottom) => {
        return bottom.type === "pant";
      });
      return filteredBottoms;
    }
    case "comfy": {
      filteredBottoms = bottoms.filter((bottom) => {
        return bottom.type === "pant";
      });
      return filteredBottoms;
    }
  }
  return filteredBottoms;
}

export { getTopsBasedOnOccasion, getBottomsBasedOnOccasion };