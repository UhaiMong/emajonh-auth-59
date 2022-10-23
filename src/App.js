import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Main from './layouts/Main';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './loaders/productsAndCartLoader';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Shipping from './components/Shipping/Shipping';
import Privaterout from './routs/Privaterout';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path:'orders',
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: 'inventory',
          element: <Privaterout><Inventory></Inventory></Privaterout>
        },
        {
          path: '/shipping',
          element: <Privaterout><Shipping></Shipping></Privaterout>
        },
        {
          path:'about',
          element:<About></About>
        },
        {
          path: '/login',
          element:<Login></Login>
        },
        {
          path: '/signup',
          element:<Signup></Signup>
        }
      ]
    },
    {
      path: '*',
      element: <>
        <h1>The page is not found!</h1>
        <p>You requested 404</p>
      </>
    }
    
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
