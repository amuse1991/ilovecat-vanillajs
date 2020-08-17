import createElement from "../util/createElement.js";

export default class SearchSection {
  constructor({ $target, state }) {
    const initialState = {
      searchLogs: ["hello", "hi"],
      darkmode: false
    };
    this.$target = $target;
    this.state = state || initialState;
    this.$container = createElement("section", {
      class: "search"
    });
    this.$target.appendChild(this.$container);
    this.render(true);
  }

  init() {
    this.$container.appendChild(
      createElement(
        "button",
        {
          class: "serach__random",
          type: "button"
        },
        elem => {
          elem.innerText = "🐱 random!";
        }
      )
    );

    this.$container.appendChild(
      createElement("input", {
        type: "text",
        class: "search__input",
        placeholder: "고양이를 검색하세요!"
      })
    );

    this.$container.appendChild(
      createElement(
        "button",
        {
          type: "button",
          class: "darkmode-btn"
        },
        elem => {
          elem.innerText = "🐈";
        }
      )
    );

    const $historyGroup = createElement("ul", {
      class: "search__history-group"
    });
    this.$container.appendChild($historyGroup);
    $historyGroup.addEventListener("click", this.onHistoryClicked.bind(this));
  }

  onHistoryClicked(event) {
    console.log(event.target);
  }

  render(init) {
    if (init) this.init();
    const { searchLogs, darkmode } = this.state;
    if (searchLogs && searchLogs.length > 0) {
      const $historyGroup = document.querySelector(".search__history-group");
      searchLogs.forEach(log => {
        $historyGroup.appendChild(
          createElement(
            "li",
            {
              class: "search__history-item"
            },
            elem => {
              elem.innerText = log;
            }
          )
        );
      });
    }
  }
}
