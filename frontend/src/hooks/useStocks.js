import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const useStocks = (
	url = import.meta.env.VITE_API_URL + import.meta.env.VITE_STOCKS_PATH
) => {
	const { timestamps } = useContext(AppContext);

	return useQuery(['stocks', timestamps], async ({ signal }) => {
		const response = await axios.get(url, {
			signal,
			params: {
				timespan: `${timestamps.start}:${timestamps.end}`,
			},
		});

		return response.data;
	});
};
