import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";

import axios from "axios";
import { logout } from "./userActions";

import configData from "../../configdata.json";


export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products`, config);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProduct =
  (name, url, categoryId, colors, sizes, price, inventory, content, thumbnail, images) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      var myData = {};

      images = images.map((image, index) => ({ name: name + "_Image_" + index, url: image.url }));

      myData.productData = { name, url, category: categoryId, price, inventory, content, images };
      myData.thumbnailData = { name, url: thumbnail.name};
      myData.lstSizeIds = sizes.map(({ value }) => value);
      myData.lstColorIds = colors.map(({ value }) => value);

      const { data } = await axios.post(
        `/api/products/`,
        myData,
        config
      );
      
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = 
(id, name, url, category, colors, sizes, price, content, inventory, thumbnail, images) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    var myData = {};

    if(images.length > 5)
    {  
      for(var i = 0; i < 5; i++){
        images[i+5] = { name: name + "_Image_" + i, url: images[i+5].url, id : images[i].id };
      }
      images.splice(0, 5);
    }
    // images = images.map((image, index) => ({ name: name + "_Image_" + index, url: image.url }));
    myData.productData = { id, name, url, category, price, inventory, content, images };
    myData.thumbnailData = thumbnail;
    // myData.imagesData = images.map((image, index) => ({ name: name + "_Image_" + index, url: image.name }));
    myData.lstSizeIds = sizes.map(({ value }) => value);
    myData.lstColorIds = colors.map(({ value }) => value);


    const { data } = await axios.put(
      `/api/products/${id}`,
      myData,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// CREATE THUMBNAIL
export const createThumbnail = (thumbnail, id, name) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    await axios.post(
      `/api/thumbnails/`,
      { name, url: thumbnail.name, productId: id},
      config
    );
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
  }
};

// UPDATE THUMBNAIL
export const updateThumbnail = (thumbnail) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    await axios.put(
      `/api/thumbnails/${thumbnail.id}`,
      thumbnail,
      config
    );
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
  }
};

// UPLOAD THUMBNAIL
export const uploadThumbnail = (thumbnail) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const formData = new FormData();
      formData.append('files',thumbnail);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'content-type': 'multipart/form-data'
        },
      };

      await axios.post(
        `/api/imageuploads/`,
        formData,
        config
      );
      
      document.getElementById('display-thumbnail').src=`${configData.URL_SERVER}/api/ImageUploads/${thumbnail.name}`;

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
    }
};


// UPLOAD IMAGE
export const uploadImage = (image) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const formData = new FormData();
    formData.append('files',image);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'content-type': 'multipart/form-data'
      },
    };

    await axios.post(
      `/api/imageuploads/`,
      formData,
      config
    );
    //$("#display-images").append(`<img src=${configData.URL_SERVER}/api/ImageUploads/${image.name} alt="Product" />`);
    //document.getElementById('display-images').append(`<img src=${configData.URL_SERVER}/api/ImageUploads/${image.name} alt="Product" />`);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
  }
};