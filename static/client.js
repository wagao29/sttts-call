const wsUri = "ws://localhost:8000/ws";
const output = document.querySelector("#output");
const msgInput = document.querySelector("#msg-input");
const sendBtn = document.querySelector("#send-btn");
const websocket = new WebSocket(wsUri);

function writeToScreen(message) {
  output.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
}

function sendMessage(message) {
  writeToScreen(`SENT: ${message}`);
  websocket.send(message);
}

function handleClick() {
  const msg = msgInput.value;
  if (msg) {
    sendMessage(msg);
  }
}

websocket.onopen = () => {
  writeToScreen("CONNECTED");
  sendBtn.addEventListener("click", handleClick);
};

websocket.onclose = () => {
  writeToScreen("DISCONNECTED");
  sendBtn.removeEventListener("click", handleClick);
};

websocket.onmessage = (e) => {
  writeToScreen(`RECEIVED: ${e.data}`);
};

websocket.onerror = (e) => {
  writeToScreen(`ERROR: ${e.data}`);
};
