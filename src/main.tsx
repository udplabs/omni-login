import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import 'styles/index.css';

const rootElement = document.createElement('div');
rootElement.id = 'root';

document.body.appendChild(rootElement);
document.body.style.overflow = 'hidden';

const { VITE_GOOGLE_CLIENT_ID: CLIENT_ID } = import.meta.env;

ReactDOM.createRoot(rootElement!).render(
	<React.StrictMode>
		<BrowserRouter basename='/u'>
			{CLIENT_ID ? (
				<GoogleOAuthProvider clientId={CLIENT_ID}>
					<Router />
				</GoogleOAuthProvider>
			) : (
				<Router />
			)}
		</BrowserRouter>
	</React.StrictMode>
);
