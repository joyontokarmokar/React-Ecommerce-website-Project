import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Wishlist from './components/Wishlist/Wishlist.jsx';
import MainRoot from './components/MainRoot/MainRoot.jsx';
import Cart from './components/Cart/Cart.jsx';
import CheckOut from './components/CheckOut/CheckOut.jsx';
import NotFound from './components/Not Found/NotFound.jsx';
import Profile from './components/Profile/Profile.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import CategoryProduct from './components/CategoryProduct/CategoryProduct.jsx';
import firebaseConfig from './firebaseConfig .js'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import Shop from './components/Shop/Shop.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      { index: true, Component: App },
      { path: "Wishlist", Component: Wishlist },
      { path: "Cart", Component: Cart },
      { path: "CheckOut", Component: CheckOut },
      { path: "*", Component: NotFound },
      { path: "Profile", Component: Profile },
      { path: "Product/Details/:id", Component: ProductDetails },
      { path: "Register", Component: Register },
      { path: "login", Component: Login },
      { path: "/products/category/:slug", Component: CategoryProduct },
      { path: "/Shop", Component:Shop },
     
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>
)
