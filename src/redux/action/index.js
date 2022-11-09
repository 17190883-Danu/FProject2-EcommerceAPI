// Add Item To Cart 
export const addCart = (prodet) => {
    return{
        type : "ADDCART",
        payload : prodet
    }
}

// Delete Item To Cart 
export const delCart = (prodet) => {
    return{
        type : "DELCART",
        payload : prodet
    }
}

// Login
export const Login = (Login) => {
    return{
        type : "LOGIN",
        payload : Login
    }
}

// updateStock
export const updateStock = (products) => {
    return {
      type: "UPDATESTOCK",
      payload: products,
    };
  };
  
  // update Stock From Admin
  export const updateStockAdmin = (products) => {
    return {
      type: "UPDATESTOCKFROMADMIN",
      payload: products,
    };
  };