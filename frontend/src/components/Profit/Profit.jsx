import PropTypes from 'prop-types';
import styles from './Profit.module.scss';

const Profit = ({ funds, prices: [minPrice, maxPrice] }) => {
	const stocksAmmount =
		funds / minPrice.price < 1 ? 10 : Math.ceil(funds / minPrice.price);

	return (
		<div className={styles.profit}>
			<div className={styles['profit__row']}>
				<p>
					<strong>Investment:</strong>
				</p>

				<p>{(stocksAmmount * minPrice.price).toFixed(2)}$</p>
			</div>

			<div className={styles['profit__row']}>
				<p>
					<strong>Exit price:</strong>
				</p>

				<p>{(stocksAmmount * maxPrice.price).toFixed(2)}$</p>
			</div>

			<div className={styles['profit__row']}>
				<p>
					<strong>Profit:</strong>
				</p>

				<p>{(stocksAmmount * (maxPrice.price - minPrice.price)).toFixed(2)}$</p>
			</div>
		</div>
	);
};

Profit.propTypes = {
	funds: PropTypes.number,
	prices: PropTypes.array.isRequired,
};

export default Profit;
