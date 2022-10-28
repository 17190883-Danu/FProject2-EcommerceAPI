import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    errorMessage: '',
    loginRoute:'',
    users: []
};

const USERS_URL = 'https://fakestoreapi.com/users';

async function getUsersAPI() {
    const data = new Promise((resolve,reject) => {
        setTimeout(() => {
            axios.get(USERS_URL)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
        }, 1000)
    })
    return data;
}

export const authLoginAPI = createAsyncThunk('auth/login', async ({email, password}) => {
    try {
        const response = await getUsersAPI()
        // console.log('data ', response)
        return response
    } catch(err) {
        throw(err)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        localStorage.removeItem('login')
    } catch(err) {
        throw(err)
    }
})

const handleAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(authLoginAPI.pending, (state, action) => {
            state.isLoginPending = true;
            state.isLoginSuccess = false;
        })
        .addCase(authLoginAPI.fulfilled, (state, action) => {
            // kevin@gmail.com
            // kev02937@
            const {email, password} = action.meta.arg
            const user = action.payload.find(user => user.email === email && user.password === password)
            if(user) {
                const token = uuidv4()
                state.isLoginPending = false;
                state.isLoginSuccess = true;
                const loginInfo = [{
                    'firstname': user.name.firstname,
                    'lasttname': user.name.lastname,
                    'token': token
                }]
                localStorage.setItem('login', JSON.stringify(loginInfo))
            } else {
                alert('no')
                state.isLoginPending = false;
                state.isLoginSuccess = false;
                state.errorMessage = 'Invalid email or password'
            }
        })
        .addCase(authLoginAPI.rejected, (state, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.errorMessage = action.error.message
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoginPending = false;
            state.isLoginSuccess = false;
            state.errorMessage = '';
        })
    }
})

export default handleAuth.reducer; 