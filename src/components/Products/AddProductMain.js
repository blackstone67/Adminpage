import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct, uploadImage, uploadThumbnail } from "./../../Redux/Actions/ProductActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { listColors } from "../../Redux/Actions/ColorAction";
import { listSizes } from "../../Redux/Actions/SizeAction";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {colourStyles} from "../Utility/SelectColor"
import configData from "../../configdata.json";
import Select from 'react-select';


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [colors, setColors]=useState([]);
  const [lstColors, setListColors]=useState([]);
  const [sizes, setSizes]=useState([]);
  const [lstSizes, setListSizes]=useState([]);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;


  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setUrl("");
      setCategoryId("");
      setColors([]);
      setSizes([]);
      setContent("");
      setInventory(0);
      setThumbnail(null);
      setImages([]);
      setPrice(0);
      document.getElementById('thumbnail').value="";
      document.getElementById('images').value="";
    }
  }, [product, dispatch]);

  useEffect(() => {
    dispatch(listCategories())
  },[]);
  
  
  // useEffect(() => {
  //   listColors(userInfo).then((colors)=>setListColors(colors)).catch(error=>console.log(error));
  // },[]);

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
    dispatch(createProduct(name, url, categoryId, colors, sizes, price, inventory, content, thumbnail, images));
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
            <h2 className="content-title">Add product</h2>
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
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
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
                    <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-select">
                    <option value="">Pick Category</option>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id} >{category.name}</option>
                    ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    {/* <SelectColor 
                      colourOptions={lstColors} 
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                    /> */}
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
                      min={0}
                      step={500}
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
                      min={0}
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
                      required
                      onChange={(e) =>
                        {
                          dispatch(uploadThumbnail(e.target.files[0]));
                          setThumbnail(e.target.files[0]);
                        }} />
                    {
                      thumbnail != null && thumbnail.name != null &&
                      <div className="card card-product-grid shadow-sm mt-3">
                        <div className="img-wrap">
                          <img id="display-thumbnail" alt="Product" />
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
                      required
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
                              src={`${configData.URL_SERVER}/api/ImageUploads/${image.url}`} alt="Product" />
                            ))}
                          </div>
                        </div>
                      }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
