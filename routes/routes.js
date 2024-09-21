import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
const API = process.env.API_KEY;
const BASE = process.env.BASE_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const publicDir = path.join(__dirname, '..', 'public');

app.get('/',  (req,res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 

app.get('/weather', async(req, res) =>{

    const city = req.query.city;

    try{

        const response = await fetch(`${BASE}/${city}?unitGroup=metric&key=${API}&contentType=json&lang=es`)
        const data = await response.json()

       if(response.ok){

        const iconCode = data.currentConditions.icon;
        const iconUrl = `/img/icons/${iconCode}.png`

        return res.json({

            city: data.resolvedAddress,
            temperature: data.currentConditions.temp,
            datetime: data.currentConditions.datetime,
            conditions: data.currentConditions.conditions.toLowerCase(),
            description: data.description,
            icon: iconUrl,
            wind: data.currentConditions.windspeed,
            humidity: data.currentConditions.humidity
        })
       }else{

            return res.status(response.status).json({
            error: data.message
        })
       }

    }catch{
       
        res.status(500).json({ error: 'Error fetching weather data' });
    }
})
export default app