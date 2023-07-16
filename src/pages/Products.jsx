import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import axiosClient from '../services/axiosClient';
import getPageNum from '../utils/get-page-number';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  async function getProducts() {
    try {
      const requestedPage = searchParams.get('page') ?? '1';
      const { data } = await axiosClient(`/products?page=${requestedPage}`);
      return setProducts(data);
    } catch (error) {
      const err = error;
      if (err.response?.status !== 409) {
        throw error;
      }
    }
  }

  function previousPage() {
    setSearchParams({ page: getPageNum(products.links.prev) });
  }

  // function nextPage() {
  //   setSearchParams({ page: getPageNum(products.links.next) });
  // }

  // function nextPageLink() {
  //   return `/products?page=${getPageNum(products?.links?.next)}`;
  // }

  const nextPageLink = `/products?page=${getPageNum(products?.links?.next)}`;

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  async function deleteHandler(product) {
    if (confirm(`Are you sure you want to delete ${product.name} product?`)) {
      try {
        await axiosClient.delete(`/products/${product.id}`);
        window.location = '/products';
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (!products) return <p>Loading...</p>;

  return (
    <>
      <Link
        to="/products/store"
        className="text-white my-28 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        + Add New Product
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.data &&
              products?.data.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </th>
                    <td className="px-6 py-4">{product.description.substring(0, 30) + '...'}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="font-medium mr-2 text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      /
                      <button
                        onClick={() => deleteHandler(product)}
                        className="font-medium ml-2 text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center bg-slate-800">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {products.meta && products.meta.current_page}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {products.meta && products.meta.last_page}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {products.meta && products.meta.total}
          </span>{' '}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={previousPage}
            disabled={products.links && products.links.prev === null}
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <Link
            to={nextPageLink}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            // onClick={nextPage}
            disabled={products.links && products.links.next === null}
          >
            Next
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
