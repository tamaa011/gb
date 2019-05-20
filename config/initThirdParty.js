
const admin = require("firebase-admin");
const config = require("../config/config.json")
const serviceAccount = require("./../groomandbride-57ebd-firebase-adminsdk-u7ma0-46158fe88d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
databaseURL: config.fireBaseDataBaseUrl
});

const db = admin.database()

module.exports = db