const chatBoxContainer = document.querySelector("#chat-box-container");
const baseChatBox = document.querySelector("#chat-box");

const uiState = {};

export function appendUser(name, isInit) {
  const chatBox = isInit ? baseChatBox : baseChatBox.cloneNode(true);
  chatBox.id = `chat-box-${name}`;
  const chatBoxName = chatBox.querySelector(".chat-box-name");
  const chatBoxMsg = chatBox.querySelector(".chat-box-msg");
  chatBoxName.textContent = name;
  chatBoxMsg.textContent = "...";
  chatBoxContainer.appendChild(chatBox);

  uiState[name] = {
    chatBox: chatBox,
    chatBoxMsg: chatBoxMsg,
  };
}

export function removeUser(name) {
  const chatBox = uiState[name].chatBox;
  chatBox.remove();

  delete uiState[name];
}

export function updateMessage(name, msg) {
  const chatBoxMsg = uiState[name].chatBoxMsg;
  chatBoxMsg.textContent = msg;
}
