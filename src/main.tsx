import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import 'styles/index.css';

const rootElement = document.createElement('div');
rootElement.id = 'root';

document.body.appendChild(rootElement);
document.body.style.overflow = 'hidden';

ReactDOM.createRoot(rootElement!).render(
	<React.StrictMode>
		<BrowserRouter basename='/u'>
			<Router />
		</BrowserRouter>
	</React.StrictMode>
);
