import SearchSection from "./container/SearchSection.js";
import ContentSection from "./container/ContentSection.js";

import catAPI from "./api/catAPI.js";
export default class App {
  constructor($target) {
    this.$target = $target;
    this.content = null;
    this.searchSection = new SearchSection({ $target: this.$target });
    // this.contentSection = new ContentSection({
    //   $target: this.$target,
    //   content
    // });
  }
}
