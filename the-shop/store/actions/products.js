export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

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
  return { type: DELETE_PRODUCT, pid: productId };
};

export const updateProduct = (id, title, description, imageURL) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: { title, description, imageURL }
  };
};
