import throttle from "./throttle.js";
import debounce from "./debounce.js";
export default class InfiniteScroller {
  constructor(onInf) {
    this.onInf = onInf;
  }
}
