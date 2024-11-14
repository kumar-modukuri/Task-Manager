import Footer from "../../components/footer/Footer.js";
import Header from "../../components/header/Header.js";
import Middle from "../../components/middle/Middle.js";
import "../../index.css";
import "./HomeStyles.css";

const Home = () => {
	return (
		<div className="home-container">
			<Header />
			<Middle />
			<Footer />
		</div>
	);
};

export default Home;
