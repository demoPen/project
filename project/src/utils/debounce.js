export  default function debounce(fn, delay=500) {
  let t = null;
  return function () {
    if (t !== null) {
      clearTimeout(t);
    }

    t = setTimeout(() => {
      fn.call(this);
    }, delay);
  };
}