import createElement from "../util/createElement.js";
import CardList from "../component/CardList.js";
import lazyload from "../util/lazyload.js";

const CAT_STORAGE_KEY = "cats";
export default class ContentSection {
  constructor({ $target }) {
    this.$target = $target;
    this.state = {
      Contnent: null,
      dataset: []
    };
    const storedData = JSON.parse(localStorage.getItem(CAT_STORAGE_KEY));
    if (storedData) {
      this.state.dataset = storedData;
    }
    this.$contentContainer = createElement("section", {
      class: "content"
    });
    this.$content = null;
    this.$noContent = createElement("p", { class: "no-content" }, elem => {
      elem.innerText = "컨텐츠가 없습니다.";
    });

    this.$target.appendChild(this.$contentContainer);
    this.render();
  }

  setState(nextState) {
    this.state = JSON.parse(JSON.stringify({ ...this.state, ...nextState }));
    localStorage.setItem(CAT_STORAGE_KEY, JSON.stringify(this.state.dataset));
    this.render();
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  render() {
    this.$contentContainer.innerText = ``;

    const { dataset } = this.getState();
    if (!Array.isArray(dataset) || dataset.length < 1) {
      this.$content = this.$noContent;
      this.$contentContainer.appendChild(this.$content);
    } else {
      this.content = new CardList({ $target: this.$contentContainer, dataset });
    }

    lazyload();
  }
}
