import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoaded: false,
    isPending: false,
    isRejected: false,
    errorMessage: '',
    products: [],
    cart: [],
    newQty: 0
}

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

function getCurrentDateTime() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime
}

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
                // console.log('stock ',addStock)
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

function changeQty(itemId, qtyState) {
        const response = JSON.parse(localStorage.getItem("cart"))
        const data = response.map((x) => {
            // console.log(itemId) 
            if(x.cart_id == itemId) {
                const newQty = x.qty + (qtyState)
                return {...x, qty: newQty}
            } else {
                return x 
            }
        })
        const loginInfo = JSON.parse(localStorage.getItem("login"))
        const userId = loginInfo.id_user
        const filteredData = data.filter((x) => x.id_user === userId)
        localStorage.setItem("cart", JSON.stringify(filteredData))
        return filteredData
}

function restoreStock(id, returnedStock) {
    const response = JSON.parse(localStorage.getItem("products"))
    const data = response.map((x) => {
        if(x.id === id) {
            return {...x, stock: x.stock + returnedStock}
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

export const fetchOneProduct = createAsyncThunk('products/fetchOneProduct', async (id) => {
    try {
        const response = await getProductAPI()
        // debugger
        const data = response.filter((x) => x.id === parseInt(id))
        // console.log('data ', data)
        return data
    } catch(err) {
        throw(err)
    }
})

export const showCart = createAsyncThunk('cart/showCart', async () => {
    try {
        const response = await JSON.parse(localStorage.getItem("cart"))
        const loggedUser = JSON.parse(localStorage.getItem("login"))
        const userId = loggedUser.id_user
        const filteredCart = response.filter((x) => x.id_user === userId)
        // console.log('response', response)
        return filteredCart
    } catch(err) {
        throw('error showing cart: ', err)
    }
})

export const addToCart = createAsyncThunk('products/addToCart', async (id) => {
    try {
        const response = await getProductAPI()
        const data = response.filter((x) => x.id === id)
        delete data[0]["stock"]
        return data
    } catch(err) {
        throw(err)
    }
}) 

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (id) => {
    try {
        const response = await JSON.parse(localStorage.getItem("cart"))
        const returnItem = response.filter((x) => {
            if(x.cart_id === id) {
                return [x.id, x.qty]
            }
        })
        restoreStock(returnItem[0][0], returnItem[0][1])
        const data = response.filter((x) => x.cart_id !== id)
        localStorage.setItem("cart", JSON.stringify(data))
        // console.log('data cart ', data)
        return data
    } catch(err) {
        throw(err)
    }
})

export const checkout = createAsyncThunk('cart/checkout', async () => {
    try {
        const response = await JSON.parse(localStorage.getItem("cart"))
        const products = await JSON.parse(localStorage.getItem("products"))
        const purchaselogs = await (JSON.parse(localStorage.getItem("buyrecord")) || [])
        const loggedUser = JSON.parse(localStorage.getItem("login"))
        const userId = loggedUser.id_user
        const filteredCart = response.filter((x) => x.id_user === userId)
        // const data = filteredCart.map((x) => {
        //     return {...x, status: 'paid'}
        // })
        const data = products.map((x) => {
            const filtered = filteredCart.filter((y) => y.id === x.id)
            if(filtered.length > 0) {
                return {...x, stock: x.stock - filtered[0].qty}
            } else {
                return x
            }
        })
        const emptyCart = response.filter((x) => x.id_user !== userId)
        // console.log('filteredcart ',filteredCart)
        const buyRecord = filteredCart.map((x) => {
            return {...x, status: 'paid', date: getCurrentDateTime()}
        })
        const newRecord = [...purchaselogs, ...buyRecord]
        localStorage.setItem("cart", JSON.stringify(emptyCart))
        localStorage.setItem("products", JSON.stringify(data))
        // console.log('record ', newRecord)
        localStorage.setItem("buyrecord", JSON.stringify(newRecord))
        // console.log('filteredCart ', filteredCart)
        return data
    } catch(err) {
        throw(err)
    }
})

const handleCart = createSlice({
    name: 'products',
    initialState,
    reducers: {
        increment: (state, action) => {
            const {id} = action.payload
            state.cart = changeQty(id, 1)
        },
        decrement: (state, action) => {
            const {id} = action.payload
            state.cart = changeQty(id, -1)
        }
    },
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

        .addCase(fetchOneProduct.pending, (state, action) => {
            state.isPending = true;
            state.isLoaded = false;
            state.isRejected = false;
        })
        .addCase(fetchOneProduct.fulfilled, (state, action) => {
            state.isPending = false;
            state.isLoaded = true;
            state.isRejected = false;
            state.products = action.payload;
        })
        .addCase(fetchOneProduct.rejected, (state, action) => {
            state.isPending = false;
            state.isLoaded = false;
            state.isRejected = true;
            state.errorMessage = action.error.message;
        })

        .addCase(showCart.pending, (state, action) => {
            state.isPending = true;
            state.isLoaded = false;
            state.isRejected = false;
        })
        .addCase(showCart.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.isPending = false;
            state.isLoaded = true;
            state.isRejected = false;
        })
        .addCase(showCart.rejected, (state, action) => {
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
            const loggedUser = JSON.parse(localStorage.getItem("login"))
            const cart = (JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
            const userId = loggedUser.id_user
            const data = action.payload[0]
            const index = cart.findIndex((x) => x.id === data.id && x.id_user === userId)
            const cartId = uuidv4()
            if(index === -1) {
                const newData = {cart_id: cartId, id_user: userId, ...data, qty: 1, total: data.price}
                state.cart = [...cart, newData]
            } else {
                const newData = {cart_id: cartId, id_user: userId, ...data, qty: state.cart[index].qty + 1, total: state.cart[index].total + data.price}
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

        .addCase(deleteFromCart.pending, (state, action) => {
            state.isPending = true;
            state.isLoaded = false;
            state.isRejected = false;
        })
        .addCase(deleteFromCart.fulfilled, (state, action) => {
            state.isPending = false;
            state.isLoaded = true;
            state.isRejected = false;
            state.cart = action.payload;
        })
        .addCase(deleteFromCart.rejected, (state, action) => {
            state.isPending = false;
            state.isLoaded = false;
            state.isRejected = true;
            state.errorMessage = action.error.message;
        })

        .addCase(checkout.pending, (state, action) => {
            state.isPending = true;
            state.isLoaded = false;
            state.isRejected = false;
        })
        .addCase(checkout.fulfilled, (state, action) => {
            state.isPending = false;
            state.isLoaded = true;
            state.isRejected = false;
            state.products = action.payload;
            state.cart = [];
            alert('Checkout Success')
        })
        .addCase(checkout.rejected, (state, action) => {
            state.isPending = false;
            state.isLoaded = false;
            state.isRejected = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const {increment, decrement} = handleCart.actions;
export default handleCart.reducer;