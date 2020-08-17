import SearchSection from "./container/SearchSection.js";
import ContentSection from "./container/ContentSection.js";
import NotFound from "./component/NotFound.js";
import Loading from "./component/Loading.js";

import catAPI from "./api/catAPI.js";
export default class App {
  constructor($target) {
    this.$target = $target;
    this.state = {
      isInitial: true,
      dataset: []
    };
    this.searchSection = new SearchSection({ $target: this.$target });
    this.contentSection = new ContentSection({ $target: this.$target });
    this.notFound = new NotFound();
    this.Loading = new Loading();
    this.render();
  }

  getStateRef() {
    return this.state;
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  setState(nextState) {
    console.log(nextState);
    const curState = this.getState();
    this.state = JSON.parse(JSON.stringify({ ...curState, ...nextState }));
  }

  // 최초 고양이 사진 랜덤 fetch
  fetchCats() {
    return Promise.resolve([
      {
        breeds: [
          {
            adaptability: 5,
            affection_level: 5,
            alt_names: "Ankara",
            cfa_url: "http://cfa.org/Breeds/BreedsSthruT/TurkishAngora.aspx",
            child_friendly: 4,
            country_code: "TR",
            country_codes: "TR",
            description:
              "This is a smart and intelligent cat which bonds well with humans. With its affectionate and playful personality the Angora is a top choice for families. The Angora gets along great with other pets in the home, but it will make clear who is in charge, and who the house belongs to",
            dog_friendly: 5,
            energy_level: 5,
            experimental: 0,
            grooming: 2,
            hairless: 0,
            health_issues: 2,
            hypoallergenic: 0,
            id: "tang",
            indoor: 0,
            intelligence: 5,
            life_span: "15 - 18",
            name: "Turkish Angora",
            natural: 1,
            origin: "Turkey",
            rare: 0,
            rex: 0,
            shedding_level: 2,
            short_legs: 0,
            social_needs: 5,
            stranger_friendly: 5,
            suppressed_tail: 0,
            temperament:
              "Affectionate, Agile, Clever, Gentle, Intelligent, Playful, Social",
            vcahospitals_url:
              "https://vcahospitals.com/know-your-pet/cat-breeds/turkish-angora",
            vetstreet_url: "http://www.vetstreet.com/cats/turkish-angora",
            vocalisation: 3,
            weight: {
              imperial: "5 - 10",
              metric: "2 - 5"
            },
            wikipedia_url: "https://en.wikipedia.org/wiki/Turkish_Angora"
          }
        ],
        height: 739,
        id: "ZDIuYg5UZ",
        url: "https://cdn2.thecatapi.com/images/ZDIuYg5UZ.png",
        width: 1100
      }
    ]);
  }

  async render() {
    if (this.getState().isInitial) {
      try {
        const initData = await this.fetchCats();
        this.setState({
          dataset: initData
        });
      } catch (error) {
        // 고양이 사진 없는 경우
      }

      this.setState({
        isInitial: false
      });
    }

    const { dataset } = this.getState();
    this.contentSection.setState({ dataset });
  }
}
