export const speakText = (text: string, lang: string) => {
  if (!text) return;

  // Varsa önceki konuşmayı durdur
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  // Daha doğal ses için
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  const speakWithVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    // Dile uygun voice seç
    const voice =
      voices.find(v => v.lang === lang) ||
      voices.find(v => v.lang.startsWith(lang.split("-")[0]));

    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Chrome / Edge bug fix
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.onvoiceschanged = speakWithVoice;
  } else {
    speakWithVoice();
  }
};
