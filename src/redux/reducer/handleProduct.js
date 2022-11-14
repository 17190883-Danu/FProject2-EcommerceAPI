import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    errorMessage: '',
    products: [],
    purchaselogs: []
};

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

function changeStock(itemId, changedQty, method = null) {
    const response = JSON.parse(localStorage.getItem("products"))
    // console.log('changedQty', changedQty)
    const data = response.map((x) => {
        if(x.id === itemId) {
            const newQty = (method === 'inc' || method === 'dec') ? x.stock + changedQty : changedQty
            return {...x, stock: newQty}
        } else {
            return x 
        }
    })
    // console.log('data', data)
    localStorage.setItem("products", JSON.stringify(data))
    return data
}

function getPurchaseRecordSummary() {
    const tempData = (JSON.parse(localStorage.getItem("buyrecord")) !== null) ? JSON.parse(localStorage.getItem("buyrecord")) : []
    // console.log('tempData', tempData) 
    const groupBy = tempData.reduce((acc, obj) => {
        acc[obj.id] = acc[obj.id] || 0;
        acc[obj.id] += obj.qty;
        return acc;
    }, {});
    // console.log('groupBy', groupBy)
    const data = Object.keys(groupBy).map((key) => {
        const itemData = tempData.find((x) => x.id === parseInt(key))
        return {...itemData, qty: groupBy[key]}
        // return {id: key, qty: groupBy[key]}
    })
    console.log('merge object ', data)
   
    return data;
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await getProductAPI()
        return response
    } catch(err) {
        throw(err)
    }
})

export const fetchPurchaseRecord = createAsyncThunk('products/fetchPurchaseRecord', async () => {
    try {
        const response = await getPurchaseRecordSummary()
        return response
    } catch(err) {
        throw(err)
    }
})

const handleProduct = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state, action) => {
            const {id} = action.payload
            state.cart = changeStock(id, 1, 'inc')
        },
        decrement: (state, action) => {
            const {id} = action.payload
            state.cart = changeStock(id, -1, 'dec')
        },
        onChangeStock: (state, action) => {
            const {id, stock} = action.payload
            state.cart = changeStock(id, stock)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isPending = true;
            state.isFulfilled = false;
            state.isRejected = false;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isPending = false;
            state.isFulfilled = true;
            state.isRejected = false;
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = true;
            state.errorMessage = action.error.message
        })

        .addCase(fetchPurchaseRecord.pending, (state, action) => {
            state.isPending = true;
            state.isFulfilled = false;
            state.isRejected = false;
        })
        .addCase(fetchPurchaseRecord.fulfilled, (state, action) => {
            state.isPending = false;
            state.isFulfilled = true;
            state.isRejected = false;
            state.purchaselogs = action.payload
        })
        .addCase(fetchPurchaseRecord.rejected, (state, action) => {
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = true;
            state.errorMessage = action.error.message
        })
    }
});

export const {increment, decrement, onChangeStock} = handleProduct.actions;
export default handleProduct.reducer;