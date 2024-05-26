export function getViceList(lang) {
  return new Promise((resolve, _reject) => {
    speechSynthesis.onvoiceschanged = (_e) => {
      const voiceList = speechSynthesis.getVoices().filter((voice) => {
        return voice.lang.match(lang);
      });
      resolve(voiceList);
    };
  });
}

export function speech(text, voice, lang) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = lang;
  uttr.voice = voice;
  speechSynthesis.speak(uttr);
}
