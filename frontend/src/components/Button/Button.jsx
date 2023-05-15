import PropTypes from 'prop-types';
import './Button.scoped.scss';

const Button = ({ label, className, onClick }) => {
	const handleClick = e => {
		e.preventDefault();

		onClick();
	};

	return (
		<a className={`btn ${className}`} href='#' onClick={handleClick}>
			{label}
		</a>
	);
};

Button.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

export default Button;
