import { configureStore } from "@reduxjs/toolkit";
// Import Slices
import { gamesSlice } from "./slices/gamesSlice";
import { detailSlice } from "./slices/detailSlice";

export default configureStore({
	reducer: { games: gamesSlice.reducer, detail: detailSlice.reducer },
});
