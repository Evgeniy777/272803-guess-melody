class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    const helpElement = document.createElement(`div`);

    helpElement.innerHTML = this.template;

    return helpElement.firstElementChild;
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

export default AbstractView;
