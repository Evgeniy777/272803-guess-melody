const loadAudio = (url) => {
  const getAudio = () => new Promise((resolve) => {
    const audio = document.createElement(`audio`);
    audio.src = url;

    audio.onloadeddata = (evt) => resolve(evt.target.response);
    audio.onerror = (evt) => resolve(evt.target.response);
  });
  return getAudio();
};

export default loadAudio;
