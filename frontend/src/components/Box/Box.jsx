import PropTypes from 'prop-types';
import './Box.scoped.scss';

const Box = ({ children }) => {
	return <div className='box'>{children}</div>;
};

Box.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Box;
