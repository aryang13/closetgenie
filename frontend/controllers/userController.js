import {
    postRequest,
    getRequest,
    deleteRequest,
    patchRequest,
    addNewUser,
} from "../helpers/requestHelpers.js";

const userController = {
    addNewUser: async (email, password) => {
        const data = await addNewUser(email, password);
        return data;
    },

    deleteUser: async () => {
        await deleteRequest("user");
    },

    getUserTemp: async () => {
        const data = await getRequest("user/temperature");
        return data.temperature;
    },

    updateUserTemp: async (temperature) => {
        await patchRequest("user/temperature", { temperature });
    },

    getUserStyle: async () => {
        const data = await getRequest("user/style");
        return data.styles;
    },

    updateUserStyle: async (style) => {
        await patchRequest("user/style", { style });
    },

    removeUserStyle: async (style) => {
        await deleteRequest(`user/style/${style}`);
    },
};

export default userController;
