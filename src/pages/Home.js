import React, { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../slices/gamesSlice";
// Router
import { useLocation } from "react-router-dom";
// Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { fadeIn } from "../animations";
// Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";

const Home = () => {
	// Get the current Location
	const location = useLocation();
	const pathId = location.pathname.split("/")[2];
	const { popular, newGames, upcoming, searched } = useSelector(
		(state) => state.games
	);
	const dispatch = useDispatch();

	useEffect(() => {
		// Fetch games
		dispatch(fetchGames());
	}, [dispatch]);
	return (
		<StyledGameList variants={fadeIn} initial="hidden" animate="show">
			<AnimateSharedLayout type="crossfade">
				<AnimatePresence>
					{pathId && <GameDetail pathId={pathId} />}
				</AnimatePresence>
				{searched.length > 0 && (
					<div className="searched">
						<StyledGames>
							{searched.map((game) => (
								<Game
									name={game.name}
									released={game.released}
									id={game.id}
									image={game.background_image}
									key={game.id}
								/>
							))}
						</StyledGames>
					</div>
				)}
				<h2>Upcoming Games</h2>
				<StyledGames>
					{upcoming.map((game) => (
						<Game
							name={game.name}
							released={game.released}
							id={game.id}
							image={game.background_image}
							key={game.id}
						/>
					))}
				</StyledGames>
				<h2>Popular Games</h2>
				<StyledGames>
					{popular.map((game) => (
						<Game
							name={game.name}
							released={game.released}
							id={game.id}
							image={game.background_image}
							key={game.id}
						/>
					))}
				</StyledGames>
				<h2>New Games</h2>
				<StyledGames>
					{newGames.map((game) => (
						<Game
							name={game.name}
							released={game.released}
							id={game.id}
							image={game.background_image}
							key={game.id}
						/>
					))}
				</StyledGames>
			</AnimateSharedLayout>
		</StyledGameList>
	);
};

const StyledGameList = styled(motion.div)`
	padding: 0rem 5rem;
	h2 {
		padding: 5rem 0rem;
	}
`;

const StyledGames = styled(motion.div)`
	min-height: 80vh;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	grid-column-gap: 3rem;
	grid-row-gap: 5rem;
`;

export default Home;
