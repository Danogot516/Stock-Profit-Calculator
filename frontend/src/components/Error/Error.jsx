import PropTypes from 'prop-types';
import './Error.scoped.scss';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Button from '../Button';

const Error = ({ title, message, showBackButton }) => {
	const { resetData } = useContext(AppContext);

	const handleClick = () => {
		resetData();
	};

	return (
		<div className='error'>
			<h2>{title}</h2>

			<p>{message}</p>

			{showBackButton && (
				<Button className='btn--error' label='Go Back' onClick={handleClick} />
			)}
		</div>
	);
};

Error.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	showBackButton: PropTypes.bool,
};

export default Error;
