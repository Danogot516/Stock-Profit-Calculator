import PropTypes from 'prop-types';
import styles from './Box.module.scss';

const Box = ({ children }) => {
	return <div className={styles.box}>{children}</div>;
};

Box.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Box;
