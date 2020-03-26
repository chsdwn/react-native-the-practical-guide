import Product from "../../models/product";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const SET_PRODUCTS = "SET_PRODUCTS";

export const createProduct = (title, description, imageURL, price) => {
  return async dispatch => {
    const response = await fetch(
      "https://the-shop-dde6a.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, imageURL, price })
      }
    );

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageURL,
        price
      }
    });
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://the-shop-dde6a.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId
    });
  };
};

export const updateProduct = (id, title, description, imageURL) => {
  return async dispatch => {
    const response = await fetch(
      `https://the-shop-dde6a.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, imageURL })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: { title, description, imageURL }
    });
  };
};

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://the-shop-dde6a.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedProducts = [];
      for (const key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            responseData[key].title,
            responseData[key].imageURL,
            responseData[key].description,
            responseData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};
