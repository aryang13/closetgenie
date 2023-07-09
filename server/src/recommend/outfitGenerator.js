import { allColours } from "./colours.js";

const temperatureHandler = (documents, temperature) => {
    const temperatureTops = [];
    const temperatureBottoms = [];

    documents.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if(temperature > 20) {
            if(data.type === "tshirt" || data.type === "shirt") {
                temperatureTops.push(data);
            }
        } else {
            if(data.type === "sweatshirt") {
                temperatureTops.push(data);
            }
        }

        if(data.type === "pant") {
            temperatureBottoms.push(data);
        }
    });

    return { temperatureTops, temperatureBottoms};
}

const occasionHandler = (tops, bottoms, occasion) => {
    const occasionTops = tops;
    const occasionBottoms = bottoms;
    switch (occasion) {
        case "formal": {
            occasionTops.filter((top) => {
                return top.type === "shirt" || top.type === "coat";
            });

            occasionBottoms.filter((bottom) => {
                return bottom.type === "pant" || bottom.type === "dress";
            });

            return { occasionTops, occasionBottoms };
        }
        case "casual": {
            occasionTops.filter((top) => {
                return top.type === "tshirt" || top.type === "sweatshirt";
            });

            occasionBottoms.filter((bottom) => {
                return bottom.type === "pant";
            });

            return { occasionTops, occasionBottoms };
        }
        case "comfy": {
            occasionTops.filter((top) => {
                return top.type === "tshirt" || top.type === "sweatshirt";
            });

            occasionBottoms.filter((bottom) => {
                return bottom.type === "pant";
            });

            return { occasionTops, occasionBottoms };
        }
    }

    return { occasionTops, occasionBottoms };
};

const styleHandler = (tops, bottoms, style) => {
    // streetwear, formal, athleisure, minimalist
    const styleTops = tops;
    const styleBottoms = bottoms;

    switch (style) {
        case "streetwear": {
            styleTops.filter((top) => {
                return top.type === "tshirt" || top.type === "sweatshirt";
            });

            styleBottoms.filter((bottom) => {
                return bottom.type === "pant";
            });

            return { styleTops, styleBottoms };
        }
        case "formal": {
            styleTops.filter((top) => {
                return top.type === "shirt" || top.type === "coat";
            });

            styleBottoms.filter((bottom) => {
                return bottom.type === "pant" || bottom.type === "dress";
            });

            return { styleTops, styleBottoms };
        }
        case "athleisure": {
            styleTops.filter((top) => {
                return top.type === "tshirt" || top.type === "sweatshirt";
            });

            styleBottoms.filter((bottom) => {
                return bottom.type === "pant";
            });

            return { styleTops, styleBottoms };
        }
        case "minimalist": {
            styleTops.filter((top) => {
                return top.type === "tshirt" || top.type === "sweatshirt";
            });

            styleBottoms.filter((bottom) => {
                return bottom.type === "pant";
            });

            return { styleTops, styleBottoms };
        }
    }

    return { styleTops, styleBottoms };
};

const colourHandler = (tops, bottoms) => {
    const matchingOutfits = [];

    tops.forEach((top) => {
        bottoms.forEach((bottom) => {
            if(bottom.colour == "black" || bottom.colour == "white") {
                matchingOutfits.push({top: top, bottom: bottom});
            } else {
                allColours[top.colour]["Complementary"].forEach((colour) => {
                    if(colour == bottom.colour) {
                        matchingOutfits.push({top: top, bottom: bottom});
                    }
                });
                allColours[top.colour]["Analogous"].forEach((colour) => {
                    if(colour == bottom.colour) {
                        matchingOutfits.push({top: top, bottom: bottom});
                    }
                });
            }
        });
    });

    return matchingOutfits;
};

const getOutfits = (documents, style, occasion, temperature) => {
    
    const { temperatureTops, temperatureBottoms } = temperatureHandler(documents, temperature);
    const { occasionTops, occasionBottoms } = occasionHandler(temperatureTops, temperatureBottoms, occasion);
    const matchingOutfits = colourHandler(occasionTops, occasionBottoms);

    return matchingOutfits;
}

export { getOutfits }