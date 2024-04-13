// src/contexts/NavigationContext.js
import { createContext, useContext } from 'react';

const NavigationContext = createContext(null);

export const useNavigation = () => useContext(NavigationContext);

export default NavigationContext;
