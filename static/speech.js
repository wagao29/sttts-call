export function getViceList() {
  return new Promise((resolve, _reject) => {
    speechSynthesis.onvoiceschanged = (_e) => {
      const voiceList = speechSynthesis
        .getVoices()
        .filter((voice) => {
          return voice.lang.match("ja-JP");
        })
        .map((voice) => voice.name);
      resolve(voiceList);
    };
  });
}

export function speech(text) {
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = "ja-JP";
  speechSynthesis.speak(uttr);
}
