import { Player } from '@lottiefiles/react-lottie-player';
import loading from '../../assets/loading.json';
import './Spinner.scoped.scss';

const Spinner = () => {
	return (
		<div className='spinner'>
			<div className='spinner__graphic'>
				<Player autoplay loop src={loading} />
			</div>

			<p>Loading</p>
		</div>
	);
};

export default Spinner;
