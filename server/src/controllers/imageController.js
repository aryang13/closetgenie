import fs from 'fs';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase/db.js';
import { numberConversion } from '../model/modelPredictionConversion.js';
import { PythonShell } from 'python-shell';
import vibrant from 'node-vibrant';

function hexToColor(rgbValue) {
    const colors = {
        black: [0, 0, 0],
        white: [255, 255, 255],
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        yellow: [255, 255, 0],
        gray: [128, 128, 128],
        pink: [255, 0, 255],
        orange: [255, 165, 0],
    };
  
    const distances = {};
    Object.entries(colors).forEach(([colorName, colorRgb]) => {
      const distance = Math.sqrt(
        Math.pow(rgbValue[0] - colorRgb[0], 2) +
        Math.pow(rgbValue[1] - colorRgb[1], 2) +
        Math.pow(rgbValue[2] - colorRgb[2], 2)
      );
      distances[colorName] = distance;
    });
  
    const closestColor = Object.keys(distances).reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );
  
    return closestColor;
  }
 
const findDominantColor = async (imageUrl) => {
  try {
    const vib = new vibrant(imageUrl);
    const palette = await vib.getPalette();
    const dominantColor = palette.Vibrant.rgb;
    const colorName = hexToColor(dominantColor);
    return colorName;
  } catch (err) {
    console.error('Error finding dominant color:', err);
  }
};

const controller = {
    upload: async (req, res) => {
        const buffer = Buffer.from(req.body.imageb64, 'base64');
        fs.writeFileSync('src/predict.jpg', buffer);

        const colour = await findDominantColor('src/predict.jpg')

        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: 'src/model'
        };

        PythonShell.run('runmodel.py', options).then(async (result) => {  
            const prediction = result[result.length - 1];
            const obj = {
                type: numberConversion[prediction] || "",
                colour: colour || "",
                isFavourite: false,
                lastTimeWorn: new Date(),
                timesOfWear: 0,
                inLaundry: false,
                name: "",
            };
            const doc = await addDoc(collection(db, `/users/${req.user}/clothing`), obj);
            return res.json(Object.assign({}, obj, {id: doc.id}));
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }
};

export default controller;