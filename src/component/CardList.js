import createElement from "../util/createElement.js";
import Card from "./Card.js";

export default class CardList {
  constructor({ $target, dataset }) {
    this.$target = $target;
    this.state = {
      dataset: dataset || []
    };
    this.$cardListContainer = createElement("ul", { class: "cardlist" });
    this.cardItems = [];
    this.$target.appendChild(this.$cardListContainer);
    this.render();
  }

  appendData(newDataset) {
    if (!newDataset) return;
    if (!Array.isArray(newDataset)) {
      throw new Error("type error");
    }

    const state = this.getState();
    const { dataset } = state;
    this.setState({
      ...state,
      dataset: dataset ? [...dataset, ...newDataset] : newDataset
    });
    this.render();
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  setState(nextState) {
    this.state = JSON.parse(JSON.stringify(nextState));
    this.render();
  }

  render() {
    const state = this.getState();
    const { dataset } = state;
    if (!Array.isArray(dataset)) return;
    this.cardItems = dataset.reduce((cards, data) => {
      cards.push(new Card({ $target: this.$cardListContainer, data }));
      return cards;
    }, []);
  }
}
