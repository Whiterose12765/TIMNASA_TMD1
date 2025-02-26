const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU9GSzl5Nm5ZNnpoU2IwNlg0ZU5TOXNrbUtNMWZLYlBLWGw1U1pVZzNIZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWlGNFY3UHU2YTFzcXpxdXVYdExMeklCZGE5b01uL2dDN0gzMEsxSFJpdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJR1QwOEhIaGcxVThKSEt1YVVjVEYxZlE5YzVoemtRODhGSVZuNWRUalZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0REplMWxSL0did0F4OUxlcm9jclgzcjlJOHVOYXRKTUxrRk02d0VIYzJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdCbnErM2g3eUZDRTVSN2VLNjFxZVZKcHowakNyWmNWRGFTdlNpK3pDMEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV4bUhEQ2FJZDZVRSt3Z0duQk9QTUpkY2t0d0ZmdlhNMElqc3FMWStXMjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUc4NjhtQkdKVGtZaHJqTzJkeEw1YUtIalRwNFVvOHk2bk8xSUZjOVYzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2dacU9kMnl6STRxdXJ0ZFVuOEgwTjhUV1FZN3RuRGN2Ty93YVBITXFTWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRzWlhSK3VWa3NEWnZ2WkNJR1JpM2wyWmYzbjl0M0dKWDlqVzB5MklvTkE1QTVsbHJHL2dwT2JITUc3MmZHZ3Q1M3p1WUp2bm1ObFpXQW9XN1k5d2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6IkVnZGN6Q05FenQ0S0dBek1yK2Nnalh1STZ0b3V0N3JldkxEOWNvblVoS1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNjAxMTE3NTA4NTI1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNFNjE0NDcxNjA0NTQ5NjkzQjFEQTZERjEwOUMyRDVCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA1ODA1NTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjYwMTExNzUwODUyNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQjg1QkMwMTgxMzk4QTg3RDU2NTQ2RTZDMzc2OTRDNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQwNTgwNTU2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtTTZ3V043TlRRU0xaRWpEZE9PZHBRIiwicGhvbmVJZCI6Ijg5NmZkYjM0LWVhOTgtNGNmOC1iN2E3LWViMDg4YTNmYjEzZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUd3RLYWVlaVgvRDF1b1ZyeGVPSm9VaTdFdzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEFwaEx4SmVMM3VmWmZEVjZ5RURWT0dmdVBVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVQWVRTTDZIIiwibWUiOnsiaWQiOiI2MDExMTc1MDg1MjU6MzlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi6qeB4KaU4Kej4pis8J2QmfCdkIDwnZCY8J2QgCDwnZCF8J2QjvCdkJTwnZCRIPCdkIXwnZCI8J2QjfCdkIbwnZCE8J2QkfCdkJLimKzgppTgp6Pqp4IifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09YTmtLZ0VFTHpOL0wwR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImZBTlJxVThBVytDcWhsVWVyMm5oa0VSK0dqTzkrd2Jvb2J3ZFZuVEUwRkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBXRmlwT3FUeDZTUHVZc0QvR3h1WDNwTmJnQXdqY3NqcnU2a2dEcUZjdlhOSnYzenlWUmVEZVN6U25TZUcyZ3JLZ0U2Vjk5aW41OWhxd1dPTjJFOEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqVmtmTzMzRnlHY0xVWnBSL2NUMGprNFRsSGRlM1lvQmhDQ2lyRnBLa01wY25aNzlEVUxBVTJKNjdiM0FuWlhLWWhuQ1hYcWFoblRuQ284UzY4K2NqQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYwMTExNzUwODUyNTozOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYd0RVYWxQQUZ2Z3FvWlZIcTlwNFpCRWZob3p2ZnNHNktHOEhWWjB4TkJSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNTgwNTUyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVIciJ9|| '',
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
