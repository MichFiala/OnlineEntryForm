import { createContext, useContext } from "react";
import LanguageStore from './languangeStore';

interface Store {
     languageStore: LanguageStore
}

export const store: Store = {
     languageStore: new LanguageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
     return useContext(StoreContext);
}