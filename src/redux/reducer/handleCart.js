import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoaded: false,
    isPending: false,
    isRejected: false,
    errorMessage: '',
    products: [],
    cart: []
}

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

function getProductAPI() {
    const tempData = JSON.parse(localStorage.getItem("products"))
    // console.log('tempData', tempData) 
    if(tempData !== null) {
        return JSON.parse(localStorage.getItem("products"))
    }
    const data = new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(PRODUCTS_URL)
            .then(res => {
                const addStock = res.data.map((x) => {
                    return {...x, stock: 20}
                })
                // const addStock = {...res.data, stock: 20}
                console.log('stock ',addStock)
                localStorage.setItem("products", JSON.stringify(addStock))
                resolve(addStock)
            })
            .catch(err => {
                reject(err)
            })
        }, 1000)
    })
    return data;
}

function reduceStock(id) {
    const tempData = JSON.parse(localStorage.getItem("products"))
    const data = tempData.map((x) => {
        if(x.id === id) {
            return {...x, stock: x.stock - 1}
        } else {
            return x
        }
    })
    localStorage.setItem("products", JSON.stringify(data))
    return data
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await getProductAPI()
        return response
    } catch(err) {
        throw(err)
    }
})

export const addToCart = createAsyncThunk('products/addToCart', async (id) => {
    try {
        const response = await getProductAPI()
        const data = response.filter((x) => x.id === id)
        return data
    } catch(err) {
        throw(err)
    }
})

const handleCart = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isPending = true;
            state.isLoaded = false;
            state.isRejected = false;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isPending = false;
            state.isLoaded = true;
            state.isRejected = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isPending = false;
            state.isLoaded = false;
            state.isRejected = true;
            state.errorMessage = action.error.message;
        })
        .addCase(addToCart.pending, (state, action) => {
            state.isPending = true;
            state.isLoaded = false;
            state.isRejected = false;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isPending = false;
            state.isLoaded = true;
            state.isRejected = false;
            const data = action.payload[0]
            const index = state.cart.findIndex((x) => x.id === data.id)
            if(index === -1) {
                const newData = {...data, qty: 1, total: data.price}
                state.cart = [...state.cart, newData]
            } else {
                const newData = {...data, qty: state.cart[index].qty + 1, total: state.cart[index].total + data.price}
                state.cart[index] = newData
            }
            reduceStock(data.id)
            localStorage.setItem("cart", JSON.stringify(state.cart))
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isPending = false;
            state.isLoaded = false;
            state.isRejected = true;
            state.errorMessage = action.error.message;
        })
    }
})

// const handleCart = (state = cart, action) => {
//     const prodet = action.payload;
//     switch (action.type) {
//         case "ADDCART":
//             // Check if product is already exist
//             const exist = state.find((x) => x.id === prodet.id);
//             if(exist){
//                 return state.map((x)=>
//                 x.id === prodet.id ? {...x, qty: x.qty +1} :x
//                 );
//             }else{
//                 const prodet = action.payload;
//                 return[
//                     ...state,
//                     {
//                         ...prodet,
//                         qty: 1,
//                     }
//                 ]
//             }
//             break;

//             case "DELCART":
//                 const exist1 = state.find((x) => x.id === prodet.id);
//                 if(exist1.qry === 1){
//                     return state.filter((x) => x.id !== exist1.id);
//                 }else{
//                     return state.map((x)=>
//                         x.id === prodet.id ? {...x, qty: x.qty -1} :x
//                     );
//                 }
//                 break;

//         default:
//             return state;
//             break;
//     }
// }

export default handleCart.reducer;