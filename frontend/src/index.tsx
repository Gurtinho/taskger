import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './index.css';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<>
		<App />
		<Toaster
			position='top-right'
			reverseOrder={false}
			gutter={8}
			containerClassName=''
			containerStyle={{}}
			toastOptions={{
				className: '',
				duration: 3000,
				style: {
					background: '#fff',
					color: '#363636',
				}
			}}
		/>
	</>
);
