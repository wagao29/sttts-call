import { recognition } from "../scripts/recognition.js";
import { getViceList, speech } from "../scripts/speech.js";

const url = new URL(location.href);
const roomId = url.pathname.split("/").pop();
const name = url.searchParams.get("name");
const wsUri = `ws://localhost:8000/ws/${roomId}?name=${name}`;
const speakBtn = document.querySelector("#speak-btn");
const leaveBtn = document.querySelector("#leave-btn");
const websocket = new WebSocket(wsUri);

const voiceList = await getViceList();
console.log(voiceList);

leaveBtn.onclick = () => {
  window.location.href = "http://localhost:8000";
};

function writeToScreen(message) {
  console.log(message);
}

function sendMessage(msg) {
  writeToScreen(`SENT: ${msg}`);
  websocket.send(
    JSON.stringify({
      type: "message",
      name: name,
      content: msg,
    })
  );
}

function handleClick() {
  recognition.start();
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  if (event.results[event.results.length - 1].isFinal && transcript) {
    sendMessage(transcript);
  }
};

recognition.onspeechend = () => {
  recognition.stop();
};

websocket.onopen = () => {
  writeToScreen("CONNECTED");
  speakBtn.addEventListener("click", handleClick);
};

websocket.onclose = () => {
  writeToScreen("DISCONNECTED");
  speakBtn.removeEventListener("click", handleClick);
};

websocket.onmessage = (e) => {
  const data = JSON.parse(e.data);

  // {
  //   type: "message" | "join" | "leave";
  //   name: string;
  //   content?: string;
  // }

  switch (data.type) {
    case "message": {
      speech(data.content);
      writeToScreen(`RECEIVED: [${data.name}] ${data.content}`);
      break;
    }
    case "join": {
      writeToScreen(`JOIN: ${data.name}`);
      break;
    }
    case "leave": {
      writeToScreen(`LEAVE: ${data.name}`);
      break;
    }
  }
};

websocket.onerror = (e) => {
  writeToScreen(`ERROR: ${e.data}`);
};
