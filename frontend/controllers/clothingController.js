import { postRequest, getRequest, deleteRequest, patchRequest } from "../helpers/requestHelpers.js";

const clothingController = {
    getAllClothes: async () => {
        return await getRequest("clothing");
    },

    getTypeClothing: async (type) => {
        return await getRequest(`clothing/type/${type}`);
    },

    getColourClothing: async (colour) => {
        return await getRequest(`clothing/colour/${colour}`);
    },

    getTypeAndColourClothing: async (type, colour) => {
        return await getRequest(`clothing/type/${type}/colour/${colour}`);
    },

    getFavoriteClothing: async () => {
        return await getRequest(`clothing/favourites`);
    },

    addNewClothes: async (clothes) => {
        // clothes is an array of objects
        await postRequest("clothing", {clothes});
    },

    addFavoriteClothes: async (clothingId) => {
        await postRequest(`clothing/favourites`, {clothingId});
    },

    removeFavoriteClothes: async (clothingId) => {
        await deleteRequest(`clothing/favourites/${clothingId}`);
    },

    updateClothes: async (clothing, clothingId) => {
        await patchRequest("clothing", {clothing, clothingId});
    },

    deleteClothes: async (clothingId) => {
        await deleteRequest(`clothing/${clothingId}`);
    },
};

export default clothingController;