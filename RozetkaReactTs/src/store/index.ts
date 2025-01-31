import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
    reducer: {

    },
})

// Infer the☻ `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//typical
//export const useAppDispatch: () => AppDispatch = useDispatch;
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// import { configureStore } from '@reduxjs/toolkit';
// import { postApi } from '../services/postApi.ts';
// import { categoryApi } from '../services/categoryApi.ts';
//
// const store = configureStore({
//     reducer: {
//         [postApi.reducerPath]: postApi.reducer,
//         [categoryApi.reducerPath]: categoryApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(
//             postApi.middleware,
//             categoryApi.middleware),
// });
//
// export default store;