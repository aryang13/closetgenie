import { collection, query, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase/db.js';
import { auth } from '../firebase/auth.js';

const controller = {
    addUser: async (req, res) => {
        try {
            const { email, password }  = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
            const newUser = await auth.createUser({ email, password });
            console.log(newUser);
            const userRef = doc(db, `/users/${newUser.uid}`);
            await setDoc(userRef, { temperature: 0, stylePreference: null });
            return res.json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to create user");
        }
    },

    deleteUser: async (req, res) => {
        try {
            let queryStatement = query(collection(db, `/users/${req.user}/clothing`));
            let querySnapshot = await getDocs(queryStatement);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            queryStatement = query(collection(db, `/users/${req.user}/stylePreferences`));
            querySnapshot = await getDocs(queryStatement);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            const docRef = doc(db, `/users/${req.user}`);
            await deleteDoc(docRef);
            await auth.deleteUser(req.user);
            return res.status(200).send("User has been deleted");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to delete user");
        }
    },

    getTemperature: async (req, res) => {
        try {
            const docRef = doc(db, `/users/${req.user}`);
            const docSnap = await getDoc(docRef);
            return res.json({temperature: docSnap.data().temperature});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to get temperature");
        }
    },

    changeTemperature: async (req, res) => {
        try {
            const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
            const docRef = doc(db, `/users/${req.user}`);
            await updateDoc(docRef, { temperature: body.temperature });
            return res.status(200).send("Temperature has been updated");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to update temperature");
        }
    },

    getStylePreferences: async (req, res) => {
        try {
            const docRef = doc(db, `/users/${req.user}`);
            const docSnap = await getDoc(docRef);
            return res.json({stylePreference: docSnap.data().stylePreference});
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to update style");
        }
    },

    changeStylePreference: async (req, res) => {
        try {
            const body = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
            const docRef = doc(db, `/users/${req.user}`);
            await updateDoc(docRef, { stylePreference: body.style });
            return res.status(200).send("Style has been updated");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to add style");
        }
    },

    removeStylePreference: async (req, res) => {
        try {
            const docRef = doc(db, `/users/${req.user}/stylePreferences/${req.param.styleId}`);
            await deleteDoc(docRef);
            return res.status(200).send("Style has been deleted");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Unable to delete style");
        }
    }
}

export default controller;