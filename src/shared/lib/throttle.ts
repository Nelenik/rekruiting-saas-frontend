export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): T {
  let lastExecTime = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime >= delay) {
      lastExecTime = currentTime;
      return func.apply(this, args);
    }
  } as T;
}
