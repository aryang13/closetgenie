import { collection, query, getDocs, where, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase/db.js';

const controller = {
    getAllClothes: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("type", "!=", "undefined"));
            const querySnapshot = await getDocs(queryStatement);
            const clothes = [];
            querySnapshot.forEach((doc) => {
                clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
            });
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get clothes");
        }
    },

    getClothesByType: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("type", "==", req.params.type));
            const querySnapshot = await getDocs(queryStatement);
            const clothes = [];
            querySnapshot.forEach((doc) => {
                clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
            });
    
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get clothes");
        }
    },

    getClothesByColour: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("colour", "==", req.params.colour));
            const querySnapshot = await getDocs(queryStatement);
            const clothes = [];
            querySnapshot.forEach((doc) => {
                clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
            });
    
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get clothes");
        }
    },

    getClothesByTypeAndColour: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("type", "==", req.params.type), where("colour", "==", req.params.colour));
            const querySnapshot = await getDocs(queryStatement);
            let clothes = [];
            querySnapshot.forEach((doc) => {
                clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
            });
    
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get clothes");
        }
    },

    getFavouriteClothes: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("isFavourite", "==", true), where("inLaundry", "==", false));
            const querySnapshot = await getDocs(queryStatement);
            const clothes = [];
            querySnapshot.forEach((doc) => {
                clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
            });
    
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get clothes");
        }
    },

    postClothes: async (req, res) => {
        try {
            const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
            const clothes = []
    
            await new Promise((resolve) => {
                body.clothes.forEach(async (clothing, index, array) => {
                    const obj = {
                        type: clothing.type ? clothing.type : "",
                        colour: clothing.colour ? clothing.colour : "",
                        isFavourite: clothing.isFavourite ? clothing.isFavourite : false,
                        lastTimeWorn: clothing.lastTimeWorn ? clothing.lastTimeWorn : new Date(),
                        timesOfWear: clothing.timesWorn ? clothing.timesWorn : 0,
                        inLaundry: clothing.inLaundry ? clothing.inLaundry : false,
                        name: clothing.name ? clothing.name : "",
                    }
                    const doc = await addDoc(collection(db, `/users/${req.user}/clothing`), obj);
                    clothes.push(Object.assign({}, obj, {id: doc.id}));
                    if (index === array.length -1) resolve();
                });
            });
    
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to Add Clothes");
        }
    },

    postFavouriteClothes: async (req, res) => {
        try {
            await updateDoc(doc(db, `/users/${req.user}/clothing/${req.body.clothingId}`), {isFavourite: true});
            return res.status(200).send("Clothing Added to Favourites");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to add clothing to favourites");
        }
    },

    patchClothing: async (req, res) => {
        try {
            const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
            await updateDoc(doc(db, `/users/${req.user}/clothing/${body.clothingId}`), body.clothing);
            return res.status(200).send("Clothing Updated");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to update clothing");
        }
    },

    deleteClothing: async (req, res) => {
        try {
            await deleteDoc(doc(db, `/users/${req.user}/clothing/${req.params.clothingId}`));
            return res.status(200).send("Clothing Deleted");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to delete clothing");
        }
    },

    deleteFavouriteClothing: async (req, res) => {
        try {
            await updateDoc(doc(db, `/users/${req.user}/clothing/${req.params.clothingId}`), {isFavourite: false});
            return res.status(200).send("Clothing Removed from Favourites");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to remove clothing from favourites");
        }
    }
}

export default controller