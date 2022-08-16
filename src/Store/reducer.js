import {
  createOffer,
  initializeListensers,
  updatePreference,
} from "../Utilites/peerConnections";
// import {
//   ADD_PARTISIPANT,
//   REMOVE_PARTISIPANT,
//   SET_USER,
//   SET_USER_STREAM,
//   UPDATE_USER,
//   UPDATE_PARTICIPANT,
// } from "./actiontype";

// let initailState = {
//   currentUser: null,
//   participants: {},
//   mainStream: null,
// };

// const stunServers = {
//   iceServers: [
//     {
//       urls: [
//         "stun:stun1.l.google.com:19302",
//         "stun:stun2.l.google.com:19302",
//         "stun:stun.l.google.com:19302",
//         "stun:stun3.l.google.com:19302",
//         "stun:stun4.l.google.com:19302",
//         "stun:stun.services.mozilla.com",
//       ],
//     },
//   ],
// };

// export const reducer = (state = initailState, action) => {
//   switch (action.type) {
//     case SET_USER: {
//       let { payload } = action;
//       state = { ...state, currentUser: { ...payload.currentUser } };
//       initializeListensers(Object.keys(payload.currentUser)[0]);
//       return state;
//     }

//     case SET_USER_STREAM: {
//       let { payload } = action;
//       state = { ...state, ...payload };
//       return state;
//     }

//     case ADD_PARTISIPANT: {
//       let { payload } = action;
//       const currentUserId = Object.keys(state.currentUser)[0];
//       const participantId = Object.keys(payload.participant)[0];

//       if (currentUserId === participantId) {
//         payload.participant[participantId].currentUser = true;
//       }
//       if (state.mainStream && !payload.participant[participantId].currentUser) {
//         addConnection(state.currentUser, payload.participant, state.mainStream);
//       }
//       payload.participant[participantId].avatarColor = `#${Math.floor(
//         Math.random() * 16777215
//       ).toString(16)}`;
//       let participants = { ...state.participants, ...payload.participant };
//       state = { ...state, participants };
//       return state;
//     }

//     case REMOVE_PARTISIPANT: {
//       let { payload } = action;
//       let participants = { ...state, participants };

//       delete participants[payload.participantKey];
//       state = { ...state, participants };
//       return state;
//     }

//     case UPDATE_USER: {
//       let { payload } = action;
//       const userId = Object.keys(state.currentUser)[0];
//       updatePreference(userId, payload.currentUser);
//       state.currentUser[userId] = {
//         ...state.currentUser[userId],
//         ...payload.currentUser,
//       };
//       state = {
//         ...state,
//         currentUser: { ...state.currentUser },
//       };
//       return state;
//     }

//     case UPDATE_PARTICIPANT: {
//       let { payload } = action;
//       const newUserId = Object.keys(payload.newUser)[0];

//       payload.newUser[newUserId] = {
//         ...state.participants[newUserId],
//         ...payload.newUser[newUserId],
//       };
//       let participants = { ...state.participants, ...payload.newUser };
//       state = { ...state, participants };
//       return state;
//     }
//     default: {
//       return state;
//     }
//   }
// };

// const addConnection = (currentUser, newUser, mediaStram) => {
//   const peerConnection = new RTCPeerConnection(stunServers);
//   mediaStram.getTracks().forEach((track) => {
//     peerConnection.addTrack(track, mediaStram);
//   });

//   const currentUserKey = Object.keys(currentUser)[0];
//   const newUserKey = Object.keys(newUser)[0];

//   const sortedIDs = [currentUserKey, newUserKey].sort((a, b) =>
//     a.localeCompare(b)
//   );

//   newUser[newUserKey].peerConnection = peerConnection;

//   if (sortedIDs[1] === currentUserKey) {
//     createOffer(peerConnection, sortedIDs[1], sortedIDs[0]);
//   }
// };

import {
  SET_MAIN_STREAM,
  ADD_PARTICIPANT,
  SET_USER,
  REMOVE_PARTICIPANT,
  UPDATE_USER,
  UPDATE_PARTICIPANT,
} from "./actiontype";

let defaultUserState = {
  mainStream: null,
  participants: {},
  currentUser: null,
};

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const reducer = (state = defaultUserState, action) => {
  if (action.type === SET_MAIN_STREAM) {
    let payload = action.payload;
    state = { ...state, ...payload };
    return state;
  } else if (action.type === ADD_PARTICIPANT) {
    let payload = action.payload;
    const currentUserId = Object.keys(state.currentUser)[0];
    const newUserId = Object.keys(payload.newUser)[0];
    if (state.mainStream && currentUserId !== newUserId) {
      payload.newUser = addConnection(
        payload.newUser,
        state.currentUser,
        state.mainStream
      );
    }

    if (currentUserId === newUserId)
      payload.newUser[newUserId].currentUser = true;
    payload.newUser[newUserId].avatarColor = generateColor();
    let participants = { ...state.participants, ...payload.newUser };
    state = { ...state, participants };
    return state;
  } else if (action.type === SET_USER) {
    let payload = action.payload;
    let participants = { ...state.participants };
    const userId = Object.keys(payload.currentUser)[0];
    payload.currentUser[userId].avatarColor = generateColor();
    initializeListensers(userId);
    state = { ...state, currentUser: { ...payload.currentUser }, participants };
    return state;
  } else if (action.type === REMOVE_PARTICIPANT) {
    let payload = action.payload;
    let participants = { ...state.participants };
    delete participants[payload.id];
    state = { ...state, participants };
    return state;
  } else if (action.type === UPDATE_USER) {
    let payload = action.payload;
    const userId = Object.keys(state.currentUser)[0];
    updatePreference(userId, payload.currentUser);
    state.currentUser[userId] = {
      ...state.currentUser[userId],
      ...payload.currentUser,
    };
    state = {
      ...state,
      currentUser: { ...state.currentUser },
    };
    return state;
  } else if (action.type === UPDATE_PARTICIPANT) {
    let payload = action.payload;
    const newUserId = Object.keys(payload.newUser)[0];

    payload.newUser[newUserId] = {
      ...state.participants[newUserId],
      ...payload.newUser[newUserId],
    };
    let participants = { ...state.participants, ...payload.newUser };
    state = { ...state, participants };
    return state;
  }
  return state;
};

const addConnection = (newUser, currentUser, stream) => {
  const peerConnection = new RTCPeerConnection(servers);
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  const newUserId = Object.keys(newUser)[0];
  const currentUserId = Object.keys(currentUser)[0];

  const offerIds = [newUserId, currentUserId].sort((a, b) =>
    a.localeCompare(b)
  );

  newUser[newUserId].peerConnection = peerConnection;
  if (offerIds[0] !== currentUserId)
    createOffer(peerConnection, offerIds[0], offerIds[1]);
  return newUser;
};
