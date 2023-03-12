const userStorage = {
  read<TReturnType = string>(key: string): TReturnType | null {
    const value = localStorage.getItem(key);

    if (!value) return null;

    try {
      const parsedValue = JSON.parse(value);
      return parsedValue as TReturnType;
    } catch {
      return value as TReturnType;
    }
  },

  create(key: string, value: unknown) {
    const isString = typeof value === 'string';

    if (isString) {
      return localStorage.setItem(key, value);
    }

    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },

  delete(key: string) {
    localStorage.removeItem(key);
  },
};

export { userStorage };
