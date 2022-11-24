import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { gameDetailsURL, gameScreenShotsURL } from "../api";

export const loadDetail = createAsyncThunk(
	"detail/fetchGameDetails",
	async (id) => {
		const detailData = await axios.get(gameDetailsURL(id));
		const gameScreen = await axios.get(gameScreenShotsURL(id));
		return { game: detailData.data, screen: gameScreen.data.results };
	}
);

const initialState = { game: {}, screen: {}, isLoading: true };

export const detailSlice = createSlice({
	name: "detail",
	initialState,
	extraReducers: {
		[loadDetail.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loadDetail.fulfilled]: (state, action) => {
			state.game = action.payload.game;
			state.screen = action.payload.screen;
			state.isLoading = false;
		},
	},
});
