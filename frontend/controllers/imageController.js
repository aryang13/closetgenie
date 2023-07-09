import { postRequest } from "../helpers/requestHelpers";

const imageController = {
    upload: async (imageb64) => {
        return await postRequest("image", {imageb64});
    }
};

export default imageController;