import createElement from "../util/createElement.js";
import throttle from "../util/throttle.js";

export default class Card {
  constructor({ $target, data }) {
    this.$target = $target;
    this.state = {
      data
    };
    this.$card = createElement("li", {
      class: "card"
    });

    this.$target.appendChild(this.$card);

    this.render();
  }
  getState() {}
  setState() {}

  render() {
    const { name, image, alt_names, description } = this.state.data;
    this.$cardImg = createElement("img", {
      class: "card__img lazy",
      // src: image ? image.url : "statics/images/450px-No_image_available.png",
      alt: alt_names || `cat ${name} image`,
      "data-src": image
        ? image.url
        : "statics/images/450px-No_image_available.png"
    });
    this.$cardTitle = createElement(
      "h1",
      {
        class: "card__title"
      },
      elem => (elem.innerText = name)
    );
    this.$cardDesc = createElement(
      "p",
      {
        class: "card__description"
      },
      elem => (elem.innerText = description)
    );
    this.$card.appendChild(this.$cardImg);
    this.$card.appendChild(this.$cardTitle);
    this.$card.appendChild(this.$cardDesc);
  }
}
