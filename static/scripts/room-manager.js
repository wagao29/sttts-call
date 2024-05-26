import { getViceList } from "./speech.js";

const chatBoxContainer = document.querySelector("#chat-box-container");
const baseChatBox = document.querySelector("#chat-box");
const url = new URL(location.href);
const lang = url.searchParams.get("lang");
const voiceList = await getViceList(lang);

const roomState = {};

function setVoice(name) {
  const unassignedVoice = voiceList.find((voice) => {
    return !Object.values(roomState).some((user) => user.voice === voice);
  });
  roomState[name] = {
    ...roomState[name],
    voice: unassignedVoice || voiceList[0],
  };
}

export function getUserVoice(name) {
  return roomState[name].voice;
}

export function appendUser(name, isInit) {
  const chatBox = isInit ? baseChatBox : baseChatBox.cloneNode(true);
  chatBox.id = `chat-box-${name}`;
  const chatBoxName = chatBox.querySelector(".chat-box-name");
  const chatBoxMsg = chatBox.querySelector(".chat-box-msg");
  chatBoxName.textContent = name;
  chatBoxMsg.textContent = "...";
  chatBoxContainer.appendChild(chatBox);

  roomState[name] = {
    chatBox: chatBox,
    chatBoxMsg: chatBoxMsg,
  };
  if (!isInit) {
    setVoice(name);
  }

  console.log(roomState);
}

export function removeUser(name) {
  const chatBox = roomState[name].chatBox;
  chatBox.remove();

  delete roomState[name];

  console.log(roomState);
}

export function updateMessage(name, msg) {
  const chatBoxMsg = roomState[name].chatBoxMsg;
  chatBoxMsg.textContent = msg;
}
