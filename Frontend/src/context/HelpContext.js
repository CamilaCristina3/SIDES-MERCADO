import React, { createContext, useContext } from 'react';
const HelpContext = createContext({});
export function HelpProvider({ children }) { return <HelpContext.Provider value={{}}>{children}</HelpContext.Provider>; }
export function useHelp() { return useContext(HelpContext); }
export default HelpContext;
