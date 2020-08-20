import createElement from "../util/createElement.js";

const SEARCH_LOG_KEY = "search_logs";
export default class SearchSection {
  constructor({ $target, state }) {
    const initialState = {
      searchLogs: []
    };
    const storedSearchLogs = localStorage.getItem(SEARCH_LOG_KEY);
    if (storedSearchLogs) {
      try {
        initialState.searchLogs = JSON.parse(storedSearchLogs);
      } catch (err) {
        console.error(
          "fail to parse stored search logs. please clear your local storage and try again"
        );
      }
    }

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

    this.$historyGroup = createElement("ul", {
      class: "search__history-group"
    });
    this.$container.appendChild(this.$historyGroup);

    this.onDarkModeBtnClicked = this.onDarkModeBtnClicked.bind(this);

    this.render();
  }

  setState(nextState) {
    this.state = JSON.parse(JSON.stringify(nextState));
    localStorage.setItem(SEARCH_LOG_KEY, JSON.stringify(this.state.searchLogs));
    this.render();
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
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

  render() {
    const { searchLogs } = this.state;
    if (searchLogs && searchLogs.length > 0) {
      this.$historyGroup.innerHTML = ``;
      searchLogs.forEach(log => {
        this.$historyGroup.appendChild(
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
