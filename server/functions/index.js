const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// Utils

/**
 *
 * @param {number} uid
 * @param {string} name
 * @returns {Promise<{result: UserRecord, error}>}
 */
const createUser = async (uid, name) => {
  let result;
  let error;
  try {
    result = await admin.auth().createUser({
      uid: ""+uid,
      displayName: name,
      email: `${uid}@app.com`,
      password: "123456",  // TODO: Very BAD!!!!!
    })
  }
  catch (e) {
    error = e
  }
  return {result, error};
}

const updateUser = async (uid, name) => {
  let result;
  let error;
  try {
    result = await admin.auth().updateUser(
      ""+uid,
      {
        displayName: name,
      },
    )
  }
  catch (e) {
    error = e
  }
  return {result, error};
}

admin.initializeApp();


// Functions
exports.helloWorld = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send("Hello from Firebase!");
});


exports.createUser = functions.https.onRequest(async (req, res) => {
  let params = req.query;

  let {result, error} = await createUser(parseInt(params.uid), params.name)
  if (error){
    return res.status(403).json({
      'error': error
    })
  }

  return res.status(201).json({
    'user': result
  })
});


exports.updateUserData = functions.https.onRequest(async (req, res) => {
  let params = req.query;

  let {result, error} = await createUser(params.uid, params.name)
  if (error){
    return res.json({'success': false, 'error': error});
  }
  res.json({'success': true})
});


// exports.calcHungrianAlgo = functions.https.onRequest(async (req, res) => {
//   let params = req.query;
//
//   let {result, error} = await createUser(params.uid, params.name)
//   if (error){
//     return res.json({'success': false, 'error': error});
//   }
//   res.json({'success': true})
// });
