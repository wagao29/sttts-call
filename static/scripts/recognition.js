const SpeechRecognition =
  globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

export { recognition };
