import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ label, className, onClick }) => {
	const handleClick = e => {
		e.preventDefault();

		onClick();
	};

	const classNames = className ? `btn ${className}` : 'btn';

	return (
		<a
			className={classNames
				.split(' ')
				.reduce((acc, curr) => `${acc} ${styles[curr]}`, '')}
			href='#'
			onClick={handleClick}
		>
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
