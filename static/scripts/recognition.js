export function initSpeechRecognition(lang) {
  const SpeechRecognition =
    globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.continuous = true;

  return recognition;
}
