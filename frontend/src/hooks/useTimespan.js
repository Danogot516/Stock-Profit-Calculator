import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useTimespan = (
	url = import.meta.env.VITE_API_URL + import.meta.env.VITE_TIMESPAN_PATH
) => {
	return useQuery(['timespan'], async ({ signal }) => {
		const response = await axios.get(url, {
			signal,
		});

		return response.data;
	});
};
