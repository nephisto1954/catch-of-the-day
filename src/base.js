// always import that for firebase (database) to work in real time
import Rebase from 're-base';
import firebase from 'firebase';


// need to configure the application.
// get the below api key... from the Project overview in firebase.google.com in the 'add firebase to webApp'
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD3zZrRFWRlUSy4VUTcMYEXPD2YXAamlwM",
  authDomain: "catch-of-the-day-tg.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-tg.firebaseio.com",
});

// need to configure Rebase.
// .database will bind the database together.
const base = Rebase.createClass(firebaseApp.database());


// named export for this one
export { firebaseApp };
// standard default export for this one.
export default base;
