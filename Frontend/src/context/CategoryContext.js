import React, { createContext, useContext } from 'react';
const CategoryContext = createContext({ categories: [] });
export function CategoryProvider({ children, value }) { const v = value || { categories: [] }; return <CategoryContext.Provider value={v}>{children}</CategoryContext.Provider>; }
export function useCategories() { return useContext(CategoryContext).categories || []; }
export default CategoryContext;
