import PropTypes from 'prop-types';
import './Funds.scoped.scss';

const Funds = ({ funds, minPrice }) => {
	return (
		<div className='funds'>
			<div className='funds__row'>
				<p>
					<strong>Available funds:</strong>
				</p>

				<p>
					{funds
						? `$${funds.toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
						  })}`
						: 'None'}
				</p>
			</div>

			<div className='funds__row'>
				<p>
					<strong>Stock ammount:</strong>
				</p>

				<p>
					{funds / minPrice < 1
						? '0 (10 free)'
						: Math.ceil(funds / minPrice).toLocaleString('en-US')}
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
