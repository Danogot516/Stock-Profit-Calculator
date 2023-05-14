import { useContext, useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { useTimespan } from '../../hooks/useTimespan';
import { AppContext } from '../../contexts/AppContext';
import Box from '../Box/Box';
import { Player } from '@lottiefiles/react-lottie-player';
import stocks from '../../assets/stocks.json';
import Spinner from '../Spinner';
import styles from './Form.module.scss';
import customDateRenderer from '../../utils/customDateRenderer';

const { combine, before, after } = DateRangePicker;

const Form = () => {
	const { setTimestamps } = useContext(AppContext);
	const [values, setValues] = useState(null);
	const [funds, setFunds] = useState('');
	const { isLoading, isError, data: timespan } = useTimespan();

	const handleDatesChange = value => {
		if (!value) {
			return setValues(null);
		}

		setValues(value.map(date => date.getTime()));
	};

	const handleFundsChange = e => {
		if (e.target.value < 0) {
			return;
		}

		setFunds(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (!values) {
			return;
		}

		setTimestamps({ start: values[0], end: values[1] });
	};

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<p>Error</p>
	) : (
		<>
			<form
				action='#'
				className={styles['form-stocks']}
				onSubmit={handleSubmit}
			>
				<h2>Stock Profit Calculator</h2>

				<DateRangePicker
					format='yyyy-MM-dd hh:mm'
					onChange={handleDatesChange}
					character=' - '
					editable={false}
					shouldDisableDate={combine(
						before(new Date(timespan.startDate)),
						after(new Date(timespan.endDate))
					)}
					placeholder='Select a date range'
					renderValue={value =>
						`${customDateRenderer(value[0])} ~ ${customDateRenderer(value[1])}`
					}
				/>

				<input
					className={styles['form__field']}
					type='number'
					name='funds'
					id='funds'
					step='any'
					placeholder='Available funds'
					value={funds}
					onChange={handleFundsChange}
				/>

				<button
					type='submit'
					className={styles['form__submit-btn']}
					disabled={!values}
				>
					Get Prices
				</button>
			</form>

			<div className={styles.player}>
				<Player autoplay loop src={stocks} style={{ width: '210px' }} />
			</div>
		</>
	);
};

export default Form;
