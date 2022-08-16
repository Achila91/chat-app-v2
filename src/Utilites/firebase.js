import firebase from "firebase/app";
import database from "firebase/database";

const firebaseconfig = {
  apiKey: "AIzaSyC2olS9xe-xWFDGJ7fz6je0RB2laHjL9Mg",
  databaseURL:
    "https://test-chat-app-6a55a-default-rtdb.asia-southeast1.firebasedatabase.app",
};

//intializing the database
firebase.initializeApp(firebaseconfig);

let dbref = firebase.database().ref();

// export const userName = prompt("Wahat is your name?");
// export const userName = "era";

export let conectedRef = firebase.database().ref(".info/connected");

//getting the room id from the url params
const urlParmas = new URLSearchParams(window.location.search);
const roomID = urlParmas.get("id");

//checking rooom id already available or not if available create a new room
if (roomID) {
  dbref = dbref.child(roomID);
} else {
  dbref = dbref.push();
  window.history.replaceState(null, "/meeting-page", "?id=" + dbref.key);
}

export default dbref;
