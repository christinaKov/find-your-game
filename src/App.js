// Components
import Home from "./pages/Home";
import Nav from "./components/Nav";
// Styles
import GlobalStyles from "./components/GlobalStyle";
// Router
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<GlobalStyles />
			<Nav />
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
				<Route exact path="/game/:id" element={<Home />}></Route>
			</Routes>
		</div>
	);
}

export default App;
