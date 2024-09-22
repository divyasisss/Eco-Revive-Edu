import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config/config';
import './ProductDetails.css';

const DEFAULT_IMAGE = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/products/${productId}`);
        setProduct(response.data);
        setMainImage(response.data.images && response.data.images.length > 0 ? response.data.images[0] : DEFAULT_IMAGE)
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail-container">
      <h2 className="product-title">{product.name}</h2>
      <div className="product-info">
        <div className="product-images">
          <img className="main-image" src={mainImage} alt={product.name} />
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <img
                key={index}
                className={`thumbnail ${image === mainImage ? 'active' : ''}`}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <div>
            <p className="product-property">
              <span className="property-label">Description:</span>
              {product.description}
            </p>
            <p className="product-property">
              <span className="property-label">Price:</span>
              <span className="price">${product.price}</span>
            </p>
          </div>
          <div className="seller-info">
            <p className="product-property">
              <span className="property-label">Published by:</span>
              {product.seller.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;