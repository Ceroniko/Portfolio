import { AuthContext } from '@contexts';
import { useContext, useSyncExternalStore } from 'react';

function useAuth() {
  const store = useContext(AuthContext);

  if (!store) {
    throw new Error('Store not found');
  }

  const state = useSyncExternalStore(store.subscribe, store.get);

  return state;
}

export { useAuth };
