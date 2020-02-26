import { lazy } from 'react'
export const Page = lazy(() => import('./Page'))
export const List = lazy(() => import('./List'))
export const ListC = lazy(() => import('./ListC'))
export const User = lazy(() => import('./User'))
export const Hooks = lazy(() => import('./Hooks'))
export const ReduxPage = lazy(() => import('./Redux'))

// export { default as Page } from "./Page";
// export { default as List } from "./List";
// export { default as ListC } from "./ListC";
// export { default as User } from "./User";
// export { default as Hooks } from "./Hooks";
// export { default as ReduxPage } from "./Redux";