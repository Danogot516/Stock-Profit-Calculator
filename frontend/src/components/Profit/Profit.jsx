import PropTypes from 'prop-types';
import './Profit.scoped.scss';

const Profit = ({ funds, prices: [minPrice, maxPrice] }) => {
	const stocksAmmount =
		funds / minPrice.price < 1 ? 10 : Math.ceil(funds / minPrice.price);

	return (
		<div className='profit'>
			<div className='profit__row'>
				<p>
					<strong>Investment:</strong>
				</p>

				<p>
					$
					{(stocksAmmount * minPrice.price).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
			</div>

			<div className='profit__row'>
				<p>
					<strong>Exit price:</strong>
				</p>

				<p>
					$
					{(stocksAmmount * maxPrice.price).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
			</div>

			<div className='profit__row'>
				<p>
					<strong>Profit:</strong>
				</p>

				<p>
					$
					{(stocksAmmount * (maxPrice.price - minPrice.price)).toLocaleString(
						'en-US',
						{
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}
					)}
				</p>
			</div>
		</div>
	);
};

Profit.propTypes = {
	funds: PropTypes.number,
	prices: PropTypes.array.isRequired,
};

export default Profit;
