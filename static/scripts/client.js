import { recognition } from "../scripts/recognition.js";
import { speech } from "../scripts/speech.js";
import {
  appendUser,
  getUserVoice,
  removeUser,
  updateMessage,
} from "./room-manager.js";

const url = new URL(location.href);
const roomId = url.pathname.split("/").pop();
const name = url.searchParams.get("name");
const wsScheme = url.protocol === "https:" ? "wss" : "ws";
const wsUri = `${wsScheme}://${url.host}/ws/${roomId}?name=${name}`;
const speakBtn = document.querySelector("#speak-btn");
const speakBtnIcon = speakBtn.querySelector("img");
const leaveBtn = document.querySelector("#leave-btn");
const websocket = new WebSocket(wsUri);

let isMute = true;

function unmute() {
  recognition.start();
  speakBtnIcon.src = "/static/images/icon-mic.png";
  isMute = false;
}

function mute() {
  recognition.stop();
  speakBtnIcon.src = "/static/images/icon-mute.png";
  isMute = true;
}

appendUser(name, true);

leaveBtn.onclick = () => {
  window.location.href = "/";
};

function sendMessage(msg) {
  console.log(`SENT: ${msg}`);
  websocket.send(
    JSON.stringify({
      type: "message",
      name: name,
      content: msg,
    })
  );
}

function handleSpeakBtnClick() {
  if (isMute) {
    unmute();
  } else {
    mute();
  }
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  if (!transcript) return;

  updateMessage(name, transcript);

  if (event.results[event.results.length - 1].isFinal && transcript) {
    sendMessage(transcript);
  }
};

recognition.onspeechend = () => {
  console.log("recognition.onspeechend");
  mute();
};
recognition.onerror = () => {
  console.log("recognition.onerror");
  mute();
};

websocket.onopen = () => {
  console.log("CONNECTED");
  speakBtn.addEventListener("click", handleSpeakBtnClick);
};

websocket.onclose = () => {
  console.log("DISCONNECTED");
  speakBtn.removeEventListener("click", handleSpeakBtnClick);
};

websocket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  const { type, name, content } = data;

  // {
  //   type: "message" | "join" | "leave";
  //   name: string;
  //   content?: string;
  // }

  switch (type) {
    case "message": {
      console.log(`RECEIVED: [${name}] ${content}`);
      updateMessage(name, content);
      speech(content, getUserVoice(name));
      break;
    }
    case "join": {
      console.log(`JOIN: ${name}`);
      appendUser(name, false);
      break;
    }
    case "leave": {
      console.log(`LEAVE: ${name}`);
      removeUser(name);
      break;
    }
  }
};

websocket.onerror = (e) => {
  console.error(`ERROR: ${e.data}`);
};
