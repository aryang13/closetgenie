import { setDoc, getDoc, doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import { db } from '../firebase/db.js';
import { getOutfits } from "../recommend/outfitGenerator.js";

const controller = {
    getOutfit: async (req, res) => {
        const occasion = req.query.occasion;
        const temperature = await (await getDoc(doc(db, `/users/${req.user}`))).data().temperature;
        const style = await (await getDoc(doc(db, `/users/${req.user}`))).data().stylePreference;
        const queryStatement = query(collection(db, `/users/${req.user}/clothing`), where("inLaundry", "==", false));
        const dataSnapshot = await getDocs(queryStatement);

        const outfits = getOutfits(dataSnapshot, style, occasion, temperature);
        const randomIndex = Math.floor(Math.random() * outfits.length);
        const top = outfits[randomIndex] ? outfits[randomIndex].top : {};
        const bottom = outfits[randomIndex] ? outfits[randomIndex].bottom : {};
        const outfitRef = doc(collection(db, `/users/${req.user}/outfit`));
        const id = outfitRef.id;

        return res.json({outfit: {top, bottom, id}});
    },

    getAllOutfits: async (req, res) => {
        const queryStatement = query(collection(db, `/users/${req.user}/outfit`));
        const dataSnapshot = await getDocs(queryStatement);
        const outfits = [];

        dataSnapshot.forEach((doc) => {
            outfits.push(Object.assign({}, doc.data(), {id: doc.id}));
        });

        return res.json({outfits});
    },

    getMultipleOutfits: async (req, res) => {
        
    },

    postOutfit: async (req, res) => {
        const {id, top, bottom} = req.body.outfit;
        const outfit = {top, bottom, date: new Date()};
        const updatedTop = Object.assign({}, top);
        const updatedBottom = Object.assign({}, bottom);

        updatedTop.timesOfWear++;
        updatedTop.lastTimeWorn = new Date();
        delete updatedTop.id;
        if(top.timesOfWear === 3) {
            updatedTop.inLaundry = true;
        }

        updatedBottom.timesOfWear++;
        updatedBottom.lastTimeWorn = new Date();
        delete updatedBottom.id;
        if(bottom.timesOfWear === 3) {
            updatedBottom.inLaundry = true;
        }

        await setDoc(doc(db, `/users/${req.user}/outfit`, id), outfit);
        const data = Object.assign({}, outfit, {id});

        await updateDoc(doc(db, `/users/${req.user}/clothing/${top.id}`), updatedTop);
        await updateDoc(doc(db, `/users/${req.user}/clothing/${bottom.id}`), updatedBottom);

        return res.json({outfit: data});
    }
}

export default controller;