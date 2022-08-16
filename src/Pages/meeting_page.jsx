import React, { useEffect } from "react";
import dbref, { conectedRef } from "../Utilites/firebase";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
} from "../Store/actioncreator";
import MainScreen from "../Components/Meeting_MainScreen/meeting_mainScreen";

const Meeting_page = (props) => {
  const particepentRef = dbref.child("participants");
  const userName = localStorage.getItem("username");
  const params = useParams();
  const id = params.id;

  //   //getting the room id from the url params
  //   const urlParmas = new URLSearchParams(window.location.search);
  //   const roomID = urlParmas.get("id");

  //   //checking rooom id already available or not if available create a new room
  //   if (roomID) {
  //     dbref = dbref.child(roomID);
  //   } else {
  //     dbref = dbref.push();
  //     window.history.replaceState(null, "meeting-page", "?id=" + dbref.key);
  //   }
  const link = window.location.href;

  const data = {
    link,
  };

  useEffect(() => {
    if (localStorage.getItem("type") === "teacher") {
      axios
        .put(
          `https://chat-app-v2-node-backend.herokuapp.com/detail/meeting/update/${id}`,
          data
        )
        .then(() => {
          console.log("Link published");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [id]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((mediaStream) => {
        props.setMainStream(mediaStream);
      });
    conectedRef.on("value", (snap) => {
      if (snap.val()) {
        const defaultPrefernces = {
          audio: true,
          video: true,
          screen: false,
        };

        const useRef = particepentRef.push({
          userName,
          preferance: defaultPrefernces,
        });

        props.setUser({
          [useRef.key]: {
            name: userName,
            ...defaultPrefernces,
          },
        });
        useRef.onDisconnect().remove(); // removing the user from the database participant table
      }
    });
  }, []);

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      particepentRef.on("child_added", (snap) => {
        const preferenceUpdateEvent = particepentRef
          .child(snap.key)
          .child("preferences");
        preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      particepentRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
    }
  }, [isStreamSet, isUserSet]);

  return (
    <div>
      <MainScreen />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meeting_page);
