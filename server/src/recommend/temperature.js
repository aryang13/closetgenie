import { collection, query, getDocs, where } from "firebase/firestore"; 
import { db } from '../firebase/db.js';

async function getTopsBasedOnTemperature(temperature, user) {
    const queryStatement = temperature > 20 ? 
                        query(collection(db, `/users/${user}/clothing`), where("type", "in", [["tshirt", "shirt"]])) : 
                        query(collection(db, `/users/${user}/clothing`), where("type", "in", [["sweatshirt", "coat"]]));
    const querySnapshot = await getDocs(queryStatement);
    let clothes = [];
    querySnapshot.forEach((doc) => {
        clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
    });
    return clothes;
}

async function getBottomsBasedOnTemperature(user) {
    const queryStatement = query(collection(db, `/users/${user}/clothing`), where("type", "in" [["pant", "dress"]]));
    const querySnapshot = await getDocs(queryStatement);
    let clothes = [];
    querySnapshot.forEach((doc) => {
        clothes.push(Object.assign({}, doc.data(), {id: doc.id}));
    });
    return clothes;
}

export { getTopsBasedOnTemperature, getBottomsBasedOnTemperature }