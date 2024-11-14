import "../../index.css";
import "./FooterStyles.css";

const Footer = () => {
	return (
		<div className="footer-container">
			<p>
				&copy; {new Date().getFullYear()} Kumar Modukuri. All rights reserved.
			</p>
		</div>
	);
};

export default Footer;
