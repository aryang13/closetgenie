import { collection, query, getDocs, getDoc, where, updateDoc, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase/db.js';

const controller = {
    getAllLaundry: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("inLaundry", "==", true));
            const querySnapshot = await getDocs(queryStatement);
            const clothes = [];
            querySnapshot.forEach((doc) => {
                clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
            });
    
            return res.json({clothes});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get laundry");
        } 
    },

    postLaundry: async (req, res) => {
        try {
            const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
            const clothing = await getDoc(doc(db, `/users/${req.user}/clothing/${body.clothingId}`));
            await updateDoc(doc(db, `/users/${req.user}/clothing/${clothing.id}`), Object.assign({}, clothing.data(), {inLaundry: true}));
            return res.status(200).send("Added to Laundry Basket");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Was not Added to Laundry Basket");
        }
    },

    deleteAllLaundry: async (req, res) => {
        try {
            const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("inLaundry", "==", true));
            const querySnapshot = await getDocs(queryStatement);
            querySnapshot.forEach(async (snapshot) => {
                await updateDoc(doc(db, `/users/${req.user}/clothing/${snapshot.id}`), Object.assign({}, snapshot.data(), {inLaundry: false, timesOfWear: 0}));
            });
            return res.status(200).send("Deleted all laundry");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Not deleted");
        }
    },

    deleteLaundryItem: async (req, res) => {
        try {
            const snapshot = await getDoc(doc(db, `/users/${req.user}/clothing/${req.params.clothingId}`));
            await updateDoc(doc(db, `/users/${req.user}/clothing/${snapshot.id}`), Object.assign({}, snapshot.data(), {inLaundry: false, timesOfWear: 0}));
            return res.status(200).send("Deleted laundry item");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Not deleted");
        }
    }
};

export default controller;