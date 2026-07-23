export const catchServiceAsync = <TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
): ((...args: TArgs) => Promise<TReturn>) => {
  return async (...args: TArgs) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Service Layer Error:", error);
      throw error;
    }
  };
};
