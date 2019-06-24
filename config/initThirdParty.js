
const admin = require("firebase-admin");
const config = require("../config/config.json")
const serviceAccount = require("./../groom-and-bride-app-firebase-adminsdk-k5zo1-5961c22068.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
databaseURL: config.fireBaseDataBaseUrl
});

const db = admin.database()

module.exports = db