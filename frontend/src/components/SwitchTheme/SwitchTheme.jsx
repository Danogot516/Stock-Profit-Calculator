import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { AppContext } from '../../contexts/AppContext';
import './SwitchTheme.scoped.scss';

const SwitchTheme = () => {
	const { isDarkTheme, toggleIsDarkTheme } = useContext(AppContext);

	return (
		<DarkModeSwitch
			className='switch-theme'
			checked={isDarkTheme}
			onChange={toggleIsDarkTheme}
			size={60}
		/>
	);
};

export default SwitchTheme;
