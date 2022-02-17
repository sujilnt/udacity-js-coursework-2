import fetch from "node-fetch";
import dotenv from 'dotenv';
import * as path from "path";
dotenv.config({
    path: path.resolve(process.cwd(), '.env')
});

console.log("key",process.env.API_KEY);
console.log("key",process.cwd(), '.env');

const url =`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;

const getImages = async (req,res)=>{
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(201).json(data);
    } catch (err) {
        console.log('error:', err);
    }
}

export default getImages;
