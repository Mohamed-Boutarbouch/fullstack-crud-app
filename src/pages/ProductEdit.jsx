import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../services/axiosClient';
import { useEffect, useState } from 'react';

export default function ProductEdit() {
  const { register, handleSubmit } = useForm();
  const [product, setProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  async function getProduct(id) {
    try {
      const { data } = await axiosClient(`/products/${id}`);
      return setProduct(data);
    } catch (error) {
      const err = error;
      if (err.response?.status !== 409) {
        throw error;
      }
    }
  }

  useEffect(() => {
    getProduct(params.id);
  }, [params]);

  if (!product.data) {
    return <p>Loading...</p>;
  }

  async function editProduct(data) {
    try {
      await axiosClient.put(`/products/${params.id}`, data);
      navigate('/products');
    } catch (error) {
      console.error(error);
    }
  }

  const submitHandler = (data) => editProduct(data);

  return (
    <>
      <Link
        to={-1}
        className="text-white my-28 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        &larr; Go Back
      </Link>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="my-6">
          <label
            htmlFor="product-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product name
          </label>
          <input
            id="product-name"
            defaultValue={product.data.name}
            {...register('name')}
            placeholder="Product name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            defaultValue={product.data.description}
            {...register('description')}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your product description here..."
          ></textarea>
        </div>
        <div className="my-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            step="any"
            id="default-input"
            placeholder="Price"
            defaultValue={product.data.price}
            {...register('price')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            type="number"
            id="default-input"
            placeholder="Quantity"
            defaultValue={product.data.quantity}
            {...register('quantity')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
          Submit
        </button>
      </form>
    </>
  );
}
