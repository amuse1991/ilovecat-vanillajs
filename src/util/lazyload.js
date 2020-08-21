import throttle from "./throttle.js";

export default function lazyload() {
  const lazyloadImages = Array.from(document.querySelectorAll(".lazy"));

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // 감시중인 엘리먼트가 intersction observer의 root에 나타나면 true
        if (entry.isIntersecting) {
          const $image = entry.target;
          $image.src = $image.dataset.src;
          $image.classList.remove("lazy");
          imageObserver.unobserve($image);
        }
      });
    });

    lazyloadImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // fallback to IntersectionObserver not supported
    throttle(() => {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20)(lazyloadImages);

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
}
