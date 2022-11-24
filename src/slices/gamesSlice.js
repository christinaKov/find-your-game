import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
	popularGamesURL,
	upcomingGamesURL,
	newGamesURL,
	searchGameURL,
} from "../api";

const initialState = {
	popular: [],
	newGames: [],
	upcoming: [],
	searched: [],
};

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
	const popularData = await axios.get(popularGamesURL());
	const upcomingData = await axios.get(upcomingGamesURL());
	const newData = await axios.get(newGamesURL());
	return {
		popular: popularData.data.results,
		newGames: upcomingData.data.results,
		upcoming: newData.data.results,
	};
});

export const fetchSearched = createAsyncThunk(
	"games/fetchSearched",
	async (name) => {
		const searchedData = await axios.get(searchGameURL(name));
		return searchedData.data.results;
	}
);

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		clearSerched: (state) => {
			state.searched = [];
		},
	},
	extraReducers: {
		[fetchGames.fulfilled]: (state, action) => {
			state.popular = action.payload.popular;
			state.newGames = action.payload.newGames;
			state.upcoming = action.payload.upcoming;
		},
		[fetchSearched.fulfilled]: (state, action) => {
			state.searched = action.payload;
		},
	},
});

export const { clearSerched } = gamesSlice.actions;
