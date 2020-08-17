export default class InfiniteScroller {
  constructor(onInf) {
    this.onInf = onInf;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset < document.body.offsetHeight - window.innerHeight)
        return;
      // document 크기보다 더 많이 스크롤한 경우 onInf 함수 호출
      this.onInf();
    });
  }
}
