import PropTypes from 'prop-types';
import customDateRenderer from '../../utils/customDateRenderer';
import './Price.scoped.scss';
const Price = ({ label, price, timestamp }) => {
	return (
		<div className='price'>
			<div className='price__row'>
				<p>
					<strong>{label}:</strong>
				</p>

				<p>{price}$</p>
			</div>

			<div className='price__row'>
				<p>
					<strong>Listed on:</strong>
				</p>

				<p>{customDateRenderer(new Date(timestamp))}</p>
			</div>
		</div>
	);
};

Price.propTypes = {
	label: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	timestamp: PropTypes.number.isRequired,
};

export default Price;
