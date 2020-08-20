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

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.body.classList.add(currentTheme);
    }

    this.$target.appendChild(this.$container);
    this.$randCatBtn = createElement(
      "button",
      {
        class: "serach__random",
        type: "button"
      },
      elem => {
        elem.innerText = "🐱 random!";
      }
    );
    this.$container.appendChild(this.$randCatBtn);

    this.$searchInput = createElement("input", {
      type: "text",
      class: "search__input",
      placeholder: "고양이를 검색하세요!",
      autofocus: ""
    });
    this.$container.appendChild(this.$searchInput);

    this.$darkModeBtn = createElement(
      "button",
      {
        type: "button",
        class: "darkmode-btn"
      },
      elem => {
        elem.innerText = "🐈";
      }
    );
    this.$container.appendChild(this.$darkModeBtn);

    const $historyGroup = createElement("ul", {
      class: "search__history-group"
    });
    this.$container.appendChild($historyGroup);

    $historyGroup.addEventListener("click", this.onHistoryClicked.bind(this));
    this.onDarkModeBtnClicked = this.onDarkModeBtnClicked.bind(this);

    this.render();
  }

  onHistoryClicked(event) {
    console.log(event.target);
  }

  onDarkModeBtnClicked(event) {
    const isDarkClient = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const theme = isDarkClient ? "light-theme" : "dark-theme";
    document.body.classList.toggle(theme);
    const curTheme = Array.from(document.body.classList).find(cls =>
      cls.match(/(\w+)-theme/i)
    );
    localStorage.setItem("theme", curTheme);
  }

  render(init) {
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
