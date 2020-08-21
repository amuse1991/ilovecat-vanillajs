function debounce(fn, delay) {
  // 타이머 선언
  let timer = null;
  // 타이머 변수에 접근 가능한 클로져 함수
  return function () {
    // 클로져 함수 안에서 this 와 arguments 변수로 디바운싱 함수의 스코프와 변수를 접근한다.
    let context = this;
    let args = arguments;
    clearTimeout(timer); // delay 함수가 다시 호출되면 타이머를 리셋한다.
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay); // delay 동안 호출이 없으면 fn을 실행한다.
  };
}

export default debounce;
