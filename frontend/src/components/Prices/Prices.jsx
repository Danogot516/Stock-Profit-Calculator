import { useContext, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { AppContext } from '../../contexts/AppContext';
import { useStocks } from '../../hooks/useStocks';
import Box from '../Box/Box';
import Spinner from '../Spinner';

const { combine, before, after } = DateRangePicker;

const Prices = () => {
	const { isLoading, isError, data: prices } = useStocks();
	const { setTimestamps } = useContext(AppContext);

	const handleClick = e => {
		e.preventDefault();

		setTimestamps(null);
	};

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<p>Error</p>
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
