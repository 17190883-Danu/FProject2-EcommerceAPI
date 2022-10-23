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