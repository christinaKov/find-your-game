import React, { useState } from "react";
// Animations
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fadeIn } from "../animations";
// Redux and Routes
import { fetchSearched } from "../slices/gamesSlice";
import { useDispatch } from "react-redux";
import { clearSerched } from "../slices/gamesSlice";

const Nav = () => {
	const dispatch = useDispatch();
	const [textInput, setTextInput] = useState("");

	const inputHandler = (e) => {
		setTextInput(e.target.value);
	};

	const submitSearch = (e) => {
		e.preventDefault();
		dispatch(fetchSearched(textInput));
		setTextInput("");
	};

	const clearSerchedHandler = () => {
		dispatch(clearSerched());
	};

	return (
		<StyledNav variants={fadeIn} initial="hidden" animate="show">
			<StyledLogo onClick={clearSerchedHandler}>
				<img src={logo} alt="logo" />
				<h1>Games Source</h1>
			</StyledLogo>
			<form onSubmit={submitSearch} className="search">
				<input value={textInput} onChange={inputHandler} type="text" />
				<button type="submit">Search</button>
			</form>
		</StyledNav>
	);
};

const StyledNav = styled(motion.nav)`
	padding: 3rem 5rem;
	text-align: center;
	input {
		width: 30%;
		font-size: 1.5rem;
		padding: 0.5rem;
		border: none;
		margin-top: 1rem;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
	}
	button {
		font-size: 1.5rem;
		border: none;
		padding: 0.5rem 2rem;
		cursor: pointer;
		background: #ff7676;
		color: white;
	}
`;

const StyledLogo = styled(motion.div)`
	display: flex;
	justify-content: center;
	padding: 1rem;
	cursor: pointer;
	img {
		height: 2rem;
		width: 2rem;
	}
`;

export default Nav;
