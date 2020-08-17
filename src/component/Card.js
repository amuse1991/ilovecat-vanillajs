import createElement from "../util/createElement.js";

export default class Card {
  constructor({ $target, data }) {
    console.log("2", data);
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
    const { breed, url } = this.state.data;
    this.$cardImg = createElement("img", {
      class: "card__img",
      src: url,
      alt: "card img alt"
    });
    // this.$cardTitle = createElement(
    //   "h1",
    //   {
    //     class: "card__title"
    //   },
    //   elem => (elem.innerText = data.name)
    // );
    // this.$cardDesc = createElement(
    //   "p",
    //   {
    //     class: "card__description"
    //   },
    //   elem => (elem.innerText = data.origin)
    // );
    this.$card.appendChild(this.$cardImg);
  }
}
