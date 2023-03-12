import { userStorage } from '@adapters';
import { auth } from '@adapters/auth';
import { firebaseAuth } from '@configs';
import { User } from 'firebase/auth';
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useRef } from 'react';

interface AuthContextData {
  currentUser: User | null;
  isSignedIn: boolean | null;
  wasSignedIn: boolean;
  signOut: () => void;
}

interface AuthContextProps {
  get: () => AuthContextData;
  subscribe: (callback: VoidFunction) => VoidFunction;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useRef<AuthContextData>({
    isSignedIn: null,
    currentUser: null,
    wasSignedIn: userStorage.read('wasSignedIn') ?? false,
    signOut: () => auth.signOut(),
  });
  const subscribers = useRef(new Set<() => void>());

  const get = useCallback<AuthContextProps['get']>(() => store.current, []);

  const set = useCallback((value: Partial<AuthContextData>) => {
    store.current = { ...store.current, ...value };

    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback<AuthContextProps['subscribe']>((callback) => {
    subscribers.current.add(callback);

    return () => subscribers.current.delete(callback);
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      const isUserExist = !!user;

      userStorage.create('wasSignedIn', isUserExist);

      set({ currentUser: user, isSignedIn: isUserExist });
    });

    return () => unsubscribe();
  }, []);

  const value = {
    get,
    subscribe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
export type { AuthContextData, AuthContextProps };
