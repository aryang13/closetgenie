import { postRequest, getRequest, deleteRequest } from "../helpers/requestHelpers.js";

const laundryController = {
    getAllLaundry: async () => {
        return await getRequest("laundry");
    },

    addToLaundry: async (clothingId) => {
        await postRequest("laundry", {clothingId});
    },

    deleteLaundryItem: async (clothingId) => {
        await deleteRequest(`laundry/${clothingId}`);
    },

    deleteAllLaundry: async () => {
        await deleteRequest("laundry");
    },
};

export default laundryController;