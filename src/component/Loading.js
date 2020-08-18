import createElement from "../util/createElement.js";
export default class Lodading {
  constructor({ $target }) {
    this.$target = $target;
    this.$lodingContainer = createElement("figure", {
      class: "loading"
    });
    this.$lodingContainer.appendChild(
      createElement("img", {
        class: "loading__img",
        src: "statics/images/loading.gif"
      })
    );
    this.$target.appendChild(this.$lodingContainer);
  }

  open() {
    this.$lodingContainer.classList.remove("loading--hidden");
  }

  close() {
    this.$lodingContainer.classList.add("loading--hidden");
  }
}
