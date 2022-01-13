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
    console.log("request",res,req)
    try {
        let response = await fetch(url);
        const image = await response.json();
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
}

export default getImages;
