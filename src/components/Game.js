import React, { useEffect } from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { popup } from "../animations";
// Redux
import { useDispatch } from "react-redux";
import { loadDetail } from "../slices/detailSlice";
// Router
import { Link } from "react-router-dom";

import { smallImage } from "../util";

const Game = ({ name, released, image, id }) => {
	const stringPathId = id.toString();
	//Load Detail Handler
	const dispatch = useDispatch();

	const loadDetailsHandler = () => {
		document.body.style.overflow = "hidden";
		dispatch(loadDetail(id));
	};
	return (
		<StyledGame
			variants={popup}
			initial="hidden"
			animate="show"
			layoutId={stringPathId}
			onClick={loadDetailsHandler}
		>
			<Link to={`/game/${id}`}>
				<motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
				<p>{released}</p>
				<motion.img
					layoutId={`image ${stringPathId}`}
					src={image ? smallImage(image, 640) : ""}
					alt={name}
				/>
			</Link>
		</StyledGame>
	);
};

const StyledGame = styled(motion.div)`
	min-height: 30vh;
	box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
	text-align: center;
	border-radius: 1rem;
	cursor: pointer;
	overflow: hidden;
	img {
		width: 100%;
		height: 40vh;
		object-fit: cover;
	}
`;

export default Game;