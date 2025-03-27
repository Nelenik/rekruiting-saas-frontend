export const throttle = (fn: () => unknown, throttleTime: number) => {
  let time = Date.now();
  return () => {
    if (time + throttleTime - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};
