import PropTypes from 'prop-types';
import styles from './Funds.module.scss';

const Funds = ({ funds, minPrice }) => {
	return (
		<div className={styles.funds}>
			<div className={styles['funds__row']}>
				<p>
					<strong>Available funds:</strong>
				</p>

				<p>{funds ? `${funds}$` : 'None'}</p>
			</div>

			<div className={styles['funds__row']}>
				<p>
					<strong>Stock ammount:</strong>
				</p>

				<p>
					{funds / minPrice < 1 ? '0 (10 free)' : Math.ceil(funds / minPrice)}
				</p>
			</div>
		</div>
	);
};

Funds.propTypes = {
	funds: PropTypes.number,
	minPrice: PropTypes.number.isRequired,
};

export default Funds;
