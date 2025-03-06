const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session:'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid09FMGRHbkpKVGQ0enl5aHZ3QnNtbWZGMU9OMUlaRHZIa0N5SklXWGZYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXRtTWNKTHEySFB6TngrNzVnZzJUOGlUTnZrV2xrM3ZLRjB3RWxlN2tUQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SFJsRU1VV2pHOHBHenBNSHlTWnE0aVJpa296QXNzSkowTWlRQWxJc2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlV1VmNTdZVWtVV3BtN1RoN2lDb2tMTTFEd3lybzFkY0pPUzRJQU9zYmk4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFNR1drRDBzWVlJNmdnbk5wV0FWcVIvNWlsbVZ3a3NEVkhNTGpvRzBBVVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhDNnhBNDFJbHRSZnc3ZXp6QmtXb3N6d2lDc24zVGF6dlBzNjZma3lNeHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUpVM1cyVzlvbHBWcU1tNXZodk8ySmQ2N0srSk51dklvUlluTUMxRHRFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTZkN2dZbTJXZ2FpR2F2NnI0YkJ2VEwyRzBWTnkrcG1vd0hIN1lEZEdoMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdGbys1NXIweEE1MW5Gd1ZqSnZsNThaL2pKalpBcDVWLzNkU0xMY0ZMWEhQWmRWN1loWld1WjRoUjBYa1lPK2tnSnBwc3prUnV4VHk1YWgxOFl6eUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMxLCJhZHZTZWNyZXRLZXkiOiJmNWdkSzg2RHBuR2FMNG1QdXhKSkQxSy9waUJXMHEvMHI2TXBmakNUTU4wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxZjhGUXRjTFRwVzVGLTNya2hxT2pBIiwicGhvbmVJZCI6IjUyNjU2YTc3LWJjODctNGFmZS1iMmU1LTM1ZmJiYjAwODk5MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQTEFkZElPUm9OQnArVmNvN2diOHJRNDJaYlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkRNVEFhWkxjazg2TDFwRGZ3aG5LUDEyTE5BPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhMQTRKV1hQIiwibWUiOnsiaWQiOiI2MDExMTc1MDg1MjU6NjNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ096TmtLZ0VFTGFIcGI0R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZBTlJxVThBVytDcWhsVWVyMm5oa0VSK0dqTzkrd2Jvb2J3ZFZuVEUwRkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImRGaUdvVTY2VS9yR3ViUnIrYXQ0eTVsM2dTZ3RrUm1EQjR5SkxpeGxhb3ZLOVQ5TU5iNEgzRFVDdENzelc5ZjFHb096N0YxQi9oNnhJKzhzbUcwV0JBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDZDZFSVlTdXgvZDd0Q3FDUTJlWDMxS2hsRTEvZm5DbGxyQjl5NnZsVDY5TG1zSnRXNzgraGJNQnFseWEwbEtoTGtrVVFLS1hVWFhZdFRHUCtWOVNBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYwMTExNzUwODUyNTo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYd0RVYWxQQUZ2Z3FvWlZIcTlwNFpCRWZob3p2ZnNHNktHOEhWWjB4TkJSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMjQzMzMwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUx5USJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255784766591",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
