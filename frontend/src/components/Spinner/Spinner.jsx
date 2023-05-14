import { Player } from '@lottiefiles/react-lottie-player';
import loading from '../../assets/loading.json';
import styles from './Spinner.module.scss';

const Spinner = () => {
	return (
		<div className={styles.spinner}>
			<div className={styles.spinner__graphic}>
				<Player autoplay loop src={loading} />
			</div>

			<p>Loading</p>
		</div>
	);
};

export default Spinner;
