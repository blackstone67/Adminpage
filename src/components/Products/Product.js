import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

import configData from "../../configdata.json";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <div className="img-wrap">
            <img src={ product.thumbnail != null && product.thumbnail.url != null ? product.thumbnail.url.includes("cdn") ? product.thumbnail.url : configData.URL_SERVER + "/api/ImageUploads/" + product.thumbnail.url : ""} alt="Product" />
          </div>
          <div className="info-wrap">
            <div className="title text-truncate">
              {product.name}
            </div>
            <div className="price mb-2">{product.price}đ</div>
            <div className="row">
              <Link
                to={`/product/${product.id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <div
                to="#"
                onClick={() => deletehandler(product.id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
