import { useContext, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { AppContext } from '../../contexts/AppContext';
import { useStocks } from '../../hooks/useStocks';

const { combine, before, after } = DateRangePicker;

const BoxPrices = () => {
	const { isLoading, isError, data: prices } = useStocks();

	return (
		<div className='box-stocks'>
			{isLoading ? (
				<p>Loading</p>
			) : isError ? (
				<p>Error</p>
			) : (
				<>
					<p>
						Price 1: {prices[0].price} on{' '}
						{new Date(prices[0].timestamp).toString()}
					</p>
					<p>
						Price 2: {prices[1].price} on{' '}
						{new Date(prices[1].timestamp).toString()}
					</p>
				</>
			)}
		</div>
	);
};

export default BoxPrices;
