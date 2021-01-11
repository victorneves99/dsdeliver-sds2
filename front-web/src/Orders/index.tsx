import StepsHeader from './StepsHeader';
import ProductsList from './ProductsList';
import './style.css';
import { useEffect, useState } from 'react';

import { OrderLocationData, Product } from './types';
import { fetchProducts, saveorder } from '../api';
import OrdersLocation from './OrderLocation';
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelcted } from './helpers';
import { toast } from 'react-toastify';

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
  const totalPrice = selectedProducts.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  console.log(products);

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch(() => {
        toast.warning('Erro ao listar produtos');
      });
  }, []);

  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds,
    };

    saveorder(payload)
      .then((response) => {
        toast.error(`Pedido enviado com sucesso! N° ${response.data.id}`);
        setSelectedProducts([]);
      })
      .catch(() => {
        toast.warning('Erro ao enviar pedido');
      });
  };

  const handleSelectProduct = (product: Product) => {
    const isAlreadySelected = checkIsSelcted(selectedProducts, product);

    if (isAlreadySelected) {
      const selected = selectedProducts.filter(
        (item) => item.id !== product.id
      );
      setSelectedProducts(selected);
    } else {
      setSelectedProducts((previous) => [...previous, product]);
    }
  };

  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductsList
          products={products}
          onSelectProduct={handleSelectProduct}
          selectedProducts={selectedProducts}
        />
        <OrdersLocation
          onChangeLocation={(location) => setOrderLocation(location)}
        />
        <OrderSummary
          amount={selectedProducts.length}
          totalPrice={totalPrice}
          onSubmit={handleSubmit}
        ></OrderSummary>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Orders;
