import ReactDOM from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root');

// create the root with the new createRoot method
const root = ReactDOM.createRoot(rootElement);

// asynchronously render your components using the new root
root.render(<App />);