import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BlogsContextProvider } from './context/BlogsContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BlogsContextProvider>
			<App />
		</BlogsContextProvider>
	</React.StrictMode>
);