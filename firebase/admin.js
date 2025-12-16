var admin = require("firebase-admin");
var serviceAccount = require("../firebase-adminsdk-key.json");

// console.log('admin apps length:', admin.apps.length);
// initilize admin once only

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = admin;