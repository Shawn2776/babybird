export const useStorage = () => {
  const isBrowser = typeof window !== "undefined";

  const getItem = (key) => {
    if (isBrowser) {
      return window.localStorage.getItem(key);
    }
  };

  return { getItem };
};

export const setStorage = () => {
  const isBrowser = typeof window !== "undefined";

  const setItem = (key, value) => {
    if (isBrowser) {
      return window.localStorage.setItem(key, value);
    }
  };

  return { setItem };
};
