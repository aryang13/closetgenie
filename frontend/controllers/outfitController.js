import { postRequest, getRequest } from "../helpers/requestHelpers.js";

const outfitController = {
    getOutfit: async (occasion) => {
        const data = await getRequest(`outfit?occasion=${occasion}`);
        return data.outfit;
    },

    getAllOutfits: async () => {
        const data = await getRequest("outfit/get-all");
        return data.outfits;
    },

    postOutfit: async (outfit) => {
        await postRequest("outfit", {outfit});
    },

    getMultipleOutfits: async (number) => {
        const data = await getRequest(`outfit/${number}`);
        return data.outfits;
    },
};

export default outfitController;