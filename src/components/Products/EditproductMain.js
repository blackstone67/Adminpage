import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
  uploadThumbnail,
  uploadImage
} from "./../../Redux/Actions/ProductActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { listColors } from "../../Redux/Actions/ColorAction";
import { listSizes } from "../../Redux/Actions/SizeAction";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {colourStyles} from "../Utility/SelectColor"
import Select from 'react-select';

import configData from "../../configdata.json";


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [inventory, setInventory] = useState(0);
  const [content, setContent] = useState("");
  const [colors, setColors]=useState([]);
  const [lstColors, setListColors]=useState([]);
  const [sizes, setSizes]=useState([]);
  const [lstSizes, setListSizes]=useState([]);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product.id != productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setUrl(product.url);
        setCategoryId(product.category);
        setContent(product.content);
        setInventory(product.inventory);
        setThumbnail(product.thumbnail);
        setImages(product.images);
        setPrice(product.price);
        setColors(product.colors.map(({id, name, codeColor, priorityNumber}) => ({value: id, label: name, color: codeColor, priorityNumber: priorityNumber})));
        setSizes(product.sizes.map(({id, name}) => ({value: id, label: name})));
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  useEffect(() => {
    dispatch(listCategories())
  },[dispatch]);

  const {userInfo} = useSelector((state) => state.userLogin);

  useEffect(() => {
    listColors(userInfo).then(function(data)
    {
      setListColors(data);
    });
  },[]);
  useEffect(() => {
    listSizes(userInfo).then(function(data)
    {
      setListSizes(data);
    });
  },[]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(
        productId,
        name,
        url,
        categoryId,
        colors,
        sizes,
        price,
        content,
        inventory,
        thumbnail,
        images
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_url" className="form-label">
                          Url
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_url"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_category" className="form-label">
                          Category
                        </label>
                        <select required value={categoryId}  onChange={(e) => setCategoryId(e.target.value)} className="form-select">
                        <option value="">Pick Category</option>
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_colors" className="form-label">
                          Colors
                        </label>
                        <Select
                          closeMenuOnSelect={false}
                          isMulti
                          options={lstColors}
                          styles={colourStyles}
                          placeholder={'Pick Colors'}
                          value={colors}
                          onChange={(e) => setColors(e)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_sizes" className="form-label">
                          Sizes
                        </label>
                        <Select
                          closeMenuOnSelect={false}
                          isMulti
                          options={lstSizes}
                          placeholder={'Pick Sizes'}
                          value={sizes}
                          onChange={(e) => setSizes(e)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Inventory
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={inventory}
                          onChange={(e) => setInventory(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Content</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Thumbnail</label>
                        <input 
                          className="form-control mt-3" 
                          id="thumbnail"
                          type="file"
                          onChange={(e) =>
                            {
                              dispatch(uploadThumbnail(e.target.files[0]));
                              thumbnail.url = e.target.files[0].name;
                              // setThumbnail(e.target.files[0]);
                            }} />
                        {
                          ((product.thumbnail != null && product.thumbnail.url != null) || (thumbnail != null && thumbnail.name != null)) &&
                          <div className="card card-product-grid shadow-sm mt-3">
                            <div className="img-wrap">
                              <img id="display-thumbnail" src={ product.thumbnail != null && product.thumbnail.url != null ? product.thumbnail.url.includes("cdn") ? product.thumbnail.url : configData.URL_SERVER + "/api/ImageUploads/" + product.thumbnail.url : ""} alt="Product" />
                            </div>
                          </div>
                        }
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input 
                          className="form-control mt-3" 
                          id="images"
                          type="file"
                          onChange={(e) =>
                            {
                              dispatch(uploadImage(e.target.files[0]));
                              e.target.files[0].url=e.target.files[0].name;
                              setImages([...images,e.target.files[0]]);
                            }} 
                            />
                          {
                            images.length > 0 &&
                            <div className="card card-product-grid shadow-sm mt-3">
                              <div className="img-wrap" id="display-images"> 
                                {images.map((image, index) => (<img 
                                  key={index.toString()}
                                  src={ image.url.includes("cdn") ? image.url : `${configData.URL_SERVER}/api/ImageUploads/${image.url}`} alt="Product" />
                                ))}
                              </div>
                            </div>
                          }
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
