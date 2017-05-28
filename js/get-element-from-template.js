const getElementFromTemplate = (html) => {
  const helpElement = document.createElement(`div`);

  helpElement.innerHTML = html;

  return helpElement.firstElementChild;
};

export default getElementFromTemplate;
