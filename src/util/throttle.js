function throttle(fn, threshhold = 250) {
  let lastCallTime, deferTimer;
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();

    if (lastCallTime && now < lastCallTime + threshhold) {
      // 호출된 적이 있다면, 마지막 호출 시점부터 threshhold 만큼 시간이 지났을 때만 재호출
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        lastCallTime = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      // 한번도 호출된 적 없으면 즉시 호출
      lastCallTime = now;
      fn.apply(context, args);
    }
  };
}

export default throttle;
