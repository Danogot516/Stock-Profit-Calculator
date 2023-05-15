import { useContext } from 'react';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { AppContext } from '../../contexts/AppContext';
import { useStocks } from '../../hooks/useStocks';
import Spinner from '../Spinner';
import { Player } from '@lottiefiles/react-lottie-player';
import noProfit from '../../assets/no-profit.json';
import Error from '../Error';
import Price from '../Price/Price';
import './Prices.scoped.scss';
import Funds from '../Funds';
import profit from '../../assets/profit.json';
import Button from '../Button';
import Profit from '../Profit';

const Prices = () => {
	const { isLoading, isError, data: prices, error } = useStocks();
	const { resetData, funds } = useContext(AppContext);

	const handleClick = e => {
		resetData();
	};

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<>
			<Error
				title={`Error ${error?.response?.status ? error.response.status : ''}`}
				message={
					error?.response?.data
						? error.response.data
						: 'Something went wrong, please try again later.'
				}
				showBackButton
			/>

			<div className='player player--error'>
				<Player autoplay keepLastFrame src={noProfit} />
			</div>
		</>
	) : (
		<>
			<div className='prices'>
				<Price
					label='Best buy price'
					price={prices[0].price}
					timestamp={prices[0].timestamp}
				/>

				<Price
					label='Best sell price'
					price={prices[1].price}
					timestamp={prices[1].timestamp}
				/>

				<Funds funds={funds} minPrice={prices[0].price} />

				<Profit funds={funds} prices={prices} />
			</div>

			<div className='actions'>
				<div className='player'>
					<Player autoplay keepLastFrame src={profit} />
				</div>

				<Button label='Find other prices' onClick={handleClick} />
			</div>
		</>
	);
};

export default Prices;
