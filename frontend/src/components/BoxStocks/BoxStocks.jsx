import { useContext, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useTimespan } from '../../hooks/useTimespan';
import { AppContext } from '../../contexts/AppContext';

const { combine, before, after } = DateRangePicker;

const BoxStocks = () => {
	const { setTimestamps } = useContext(AppContext);
	const [values, setValues] = useState([]);
	const { isLoading, isError, data: timespan } = useTimespan();

	const handleChange = value => {
		if (!value) {
			return setValues([]);
		}

		setValues(value.map(date => date.getTime()));
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (!values) {
			return;
		}

		setTimestamps({ start: values[0], end: values[1] });
	};

	return (
		<div className='box-stocks'>
			{isLoading ? (
				<p>Loading</p>
			) : isError ? (
				<p>Error</p>
			) : (
				<form action='#' className='form-stocks' onSubmit={handleSubmit}>
					<DateRangePicker
						format='yyyy-MM-dd hh:mm'
						onChange={handleChange}
						character=' - '
						editable={false}
						shouldDisableDate={combine(
							before(new Date(timespan.startDate)),
							after(new Date(timespan.endDate))
						)}
					/>

					<button type='submit' className='form__submit-btn'>
						Get Prices
					</button>
				</form>
			)}
		</div>
	);
};

export default BoxStocks;
