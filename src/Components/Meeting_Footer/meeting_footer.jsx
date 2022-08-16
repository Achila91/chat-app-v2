import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router-dom";

import "../../Css/meeting_footer.css";

const Meeting_footer = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: true,
    screen: false,
  });

  const navigate = useNavigate();

  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const endMeeting = () => {
    if (localStorage.getItem("type") === "student") {
      navigate("/student");
      window.location.reload(false);
    } else {
      navigate("/teacher");
      window.location.reload(false);
    }
  };

  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);

  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  return (
    <div className="footer-wrapper">
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div>
      <div
        className="meeting-icons end-meeting"
        data-tip="End Meeting"
        onClick={endMeeting}
      >
        <FontAwesomeIcon icon={faPhone} />
      </div>
      <ReactTooltip />
    </div>
  );
};

export default Meeting_footer;
