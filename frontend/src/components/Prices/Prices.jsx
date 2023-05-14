import { useContext } from 'react';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { AppContext } from '../../contexts/AppContext';
import { useStocks } from '../../hooks/useStocks';
import Spinner from '../Spinner';
import { Player } from '@lottiefiles/react-lottie-player';
import noProfit from '../../assets/no-profit.json';
import Error from '../Error';

const Prices = () => {
	const { isLoading, isError, data: prices, error } = useStocks();
	const { setTimestamps } = useContext(AppContext);

	const handleClick = e => {
		e.preventDefault();

		setTimestamps(null);
	};

	console.log(error);

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
				<Player autoplay loop src={noProfit} />
			</div>
		</>
	) : (
		<>
			<p>
				Price 1: {prices[0].price} on {new Date(prices[0].timestamp).toString()}
			</p>
			<p>
				Price 2: {prices[1].price} on {new Date(prices[1].timestamp).toString()}
			</p>

			<a href='#' onClick={handleClick}>
				Find other prices
			</a>
		</>
	);
};

export default Prices;
