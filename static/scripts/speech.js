export function getViceList() {
  return new Promise((resolve, _reject) => {
    speechSynthesis.onvoiceschanged = (_e) => {
      const voiceList = speechSynthesis.getVoices().filter((voice) => {
        return voice.lang.match("ja-JP");
      });
      resolve(voiceList);
    };
  });
}

export function speech(text, voice) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = "ja-JP";
  uttr.voice = voice;
  speechSynthesis.speak(uttr);
}
