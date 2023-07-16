import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';
import ProductStore from './pages/ProductStore';
import ProductEdit from './pages/ProductEdit';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Link className="mx-auto" to="/products">
          Go to Products Page
        </Link>
      ),
    },
    {
      path: '/products',
      element: <Products />,
    },
    {
      path: '/products/:id',
      element: <Product />,
    },
    {
      path: '/products/store',
      element: <ProductStore />,
    },
    {
      path: '/products/edit/:id',
      element: <ProductEdit />,
    },
  ]);

  return <RouterProvider router={router} />;
}
