"use strict";

import SearchSection from "./container/SearchSection.js";
import ContentSection from "./container/ContentSection.js";
import NotFound from "./component/NotFound.js";
import Loading from "./component/Loading.js";

import catAPI from "./api/catAPI.js";
import InfiniteScroller from "./util/InfiniteScroller.js";
export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      isInitial: true,
      dataset: []
    };
    this.searchSection = new SearchSection({ $target: this.$target });
    this.contentSection = new ContentSection({ $target: this.$target });

    this.Loading = new Loading({ $target: this.$target });
    this.notFound = new NotFound();

    this.infScroller = new InfiniteScroller(async () => {
      const cats = await this.fetchCatData({ limit: 20 });
      this.setState({
        ...this.state,
        dataset: [...this.state.dataset, ...cats]
      });
    });

    const $randCatBtn = document.querySelector(".serach__random");
    $randCatBtn.addEventListener("click", async () => {
      const cats = await this.fetchCatData({
        limit: 20
      });
      this.contentSection.setState({ dataset: cats });
    });
    this.render();
  }

  getStateRef() {
    return this.state;
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  setState(nextState) {
    const curState = this.getState();
    this.state = JSON.parse(JSON.stringify({ ...curState, ...nextState }));
    this.render();
  }

  async fetchCatData(params) {
    const { breed_name } = params;
    let cats = null;

    this.Loading.open();

    try {
      // 고양이 종으로 검색
      if (!breed_name) {
        cats = await catAPI.breeds.getList(params);
        console.log("2", params);
      } else {
        cats = await catAPI.breeds.findByName({ name: breed_name });
      }
      const catImgPromises = cats.map(async cat => {
        let response;
        try {
          response = await catAPI.images.findByBreedID({
            breed_id: cat.id
          });
          cat.image = {
            url: response[0].url
          };
        } catch (err) {
          console.error(err);
          response = err;
        }
        return cat;
      });

      cats = await Promise.all(catImgPromises);

      // breed id를 기준으로 image link 검색
      // cats = await cats.reduce(async (prevPromise, cat) => {
      //   await prevPromise;
      //   let url;
      //   try {
      //     const response = await catAPI.images.findByBreedID({
      //       breed_id: cat.id
      //     });
      //     url = response[0].url;
      //   } catch (err) {
      //     url = null;
      //   }
      //   cat.url = url;
      //   return cats;
      // }, Promise.resolve(cats));
      this.Loading.close();
      return cats;
    } catch (err) {
      this.Loading.close();
      throw err;
    }
  }

  async render() {
    if (this.getState().isInitial) {
      try {
        const initData = await this.fetchCatData({ limit: 20 });
        this.setState({
          dataset: initData
        });
      } catch (error) {
        // handle network error
        console.error(error);
      }

      this.setState({
        isInitial: false
      });
    }

    const { dataset } = this.getState();
    this.contentSection.setState({ dataset });
  }
}
