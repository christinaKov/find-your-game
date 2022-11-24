import React from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
// Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Resizing
import { smallImage } from "../util";
// Images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
// Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
	// Exit Detail
	const navigate = useNavigate();
	const exitDetail = (e) => {
		const element = e.target;
		if (element.classList.contains("shadow")) {
			document.body.style.overflow = "auto";
			navigate("/");
		}
	};

	// Get Stars
	const getStars = () => {
		const stars = [];
		const rating = Math.floor(game.rating);
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(<img alt="full star" key={i} src={starFull} />);
			} else {
				stars.push(<img alt="empty star" key={i} src={starEmpty} />);
			}
		}
		return stars;
	};

	// Get platform Images
	const getPlatform = (platform) => {
		const platformsImages = {
			"PlayStation 4": playstation,
			"Xbox One": xbox,
			PC: steam,
			"Nintendo Switch": nintendo,
			iOS: apple,
		};
		return platformsImages[platform] ? platformsImages[platform] : gamepad;
	};

	// Data
	const { game, screen, isLoading } = useSelector((state) => state.detail);
	return (
		<>
			{!isLoading && (
				<StyledCardShadow className="shadow" onClick={exitDetail}>
					<StyledDetail layoutId={pathId}>
						<StyledStats>
							<div className="rating">
								<motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
								<p>Rating: {game.rating}</p>
								{getStars()}
							</div>
							<StyledInfo>
								<h3>Platforms</h3>
								<StyledPlatforms>
									{game.platforms.map((platform) => (
										<img
											key={platform.platform.id}
											alt={platform.platform.name}
											src={getPlatform(platform.platform.name)}
										/>
									))}
								</StyledPlatforms>
							</StyledInfo>
						</StyledStats>
						<StyledMedia>
							<motion.img
								layoutId={`image ${pathId}`}
								src={smallImage(game.background_image, 1280)}
								alt={game.background_image}
							/>
						</StyledMedia>
						<StyledDescription>
							<p>{game.description_raw}</p>
						</StyledDescription>
						<div className="gallery">
							{screen.map((item) => (
								<img
									src={smallImage(item.image, 1280)}
									key={item.id}
									alt={game.background_image}
								/>
							))}
						</div>
					</StyledDetail>
				</StyledCardShadow>
			)}
		</>
	);
};

const StyledCardShadow = styled(motion.div)`
	width: 100%;
	min-height: 100vh;
	overflow-y: scroll;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
	&::-webkit-scrollbar {
		width: 0.5rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ff7676;
	}
	&::-webkit-scrollbar-track {
		background: white;
	}
`;

const StyledDetail = styled(motion.div)`
	width: 80%;
	border-radius: 1rem;
	padding: 2rem 5rem;
	background: white;
	position: absolute;
	left: 10%;
	color: black;
	z-index: 10;
	img {
		width: 100%;
	}
`;

const StyledStats = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	img {
		width: 2rem;
		height: 2rem;
		display: inline;
	}
`;

const StyledInfo = styled(motion.div)`
	text-align: center;
`;

const StyledPlatforms = styled(motion.div)`
	display: flex;
	justify-content: space-evenly;
	img {
		margin-left: 3rem;
	}
`;

const StyledMedia = styled(motion.div)`
	margin-top: 5rem;
	img {
		width: 100%;
	}
`;

const StyledDescription = styled(motion.div)`
	margin: 5rem 0rem;
`;

export default GameDetail;
