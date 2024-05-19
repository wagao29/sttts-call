const SpeechRecognition =
  globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

const roomId = location.pathname.split("/").pop();
const wsUri = `ws://localhost:8000/ws/${roomId}`;
const output = document.querySelector("#output");
const speakBtn = document.querySelector("#speak-btn");
const websocket = new WebSocket(wsUri);

function writeToScreen(message) {
  output.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
}

function sendMessage(message) {
  writeToScreen(`SENT: ${message}`);
  websocket.send(message);
}

function speech(text) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = "ja-JP";
  speechSynthesis.speak(uttr);
}

function handleClick() {
  recognition.start();
}

websocket.onopen = () => {
  writeToScreen("CONNECTED");
  speakBtn.addEventListener("click", handleClick);
};

websocket.onclose = () => {
  writeToScreen("DISCONNECTED");
  speakBtn.removeEventListener("click", handleClick);
};

websocket.onmessage = (e) => {
  speech(e.data);
  writeToScreen(`RECEIVED: ${e.data}`);
};

websocket.onerror = (e) => {
  writeToScreen(`ERROR: ${e.data}`);
};

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;

  if (event.results[event.results.length - 1].isFinal && transcript) {
    sendMessage(transcript);
  }
};

recognition.onspeechend = () => {
  recognition.stop();
};
