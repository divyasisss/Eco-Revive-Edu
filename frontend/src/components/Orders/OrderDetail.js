import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config/config';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order', err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order Detail</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Amount:</strong> ${order.amount}</p>
      <p><strong>Status:</strong> {order.status}</p>
    </div>
  );
};

export default OrderDetail;
