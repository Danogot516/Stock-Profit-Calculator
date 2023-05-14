import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext({
	timestamps: null,
	setTimestamps: newTimestamps => {},
	isDarkTheme: '',
	setIsDarkTheme: isDarkTheme => {},
});

const AppProvider = ({ children }) => {
	const [timestamps, setTimestamps] = useState(null);
	const [isDarkTheme, setIsDarkTheme] = useState(
		window.matchMedia('(prefers-color-scheme:dark)').matches
	);

	return (
		<AppContext.Provider
			value={{ timestamps, isDarkTheme, setTimestamps, setIsDarkTheme }}
		>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
