import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl, authApiUrl } from '../lib/apiUrl'
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import Razorpay from 'react-razorpay/dist/razorpay';

// Modify your thunks to properly handle errors
export const fetchProduct = createAsyncThunk('product/fetchProduct', async (_, { rejectWithValue }) => {
    try {
        const res = await apiUrl.get('product/fetchAllProduct')
        console.log(res.data);
        return res.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message || 'An error occurred');
    }
})

export const fetchsupplierProduct = createAsyncThunk('product/supplierProduct', async (_, { rejectWithValue }) => {
    try {
        const res = await authApiUrl.get(`product/fetchProductBySupplier`)
        return res.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message || 'An error occurred');
    }
})

export const fetchSingleProduct = createAsyncThunk('product/fetchSingleProduct', async (id, { rejectWithValue }) => {
    try {
        const res = await apiUrl.get(`product/fetchProduct/${id}`)
        return res.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message || 'An error occurred');
    }
})

export const addProduct = createAsyncThunk('product/addProduct', async (formData, { rejectWithValue }) => {

    try {
        const res = await authApiUrl.post('product/addProduct', formData)
        // Move this to after the action completes, or handle in a component
        // window.location.href = '/view-product'
        return res.data
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message || 'An error occurred');
    }
})

export const fetchAllCategory = createAsyncThunk('product/fetchcategory', async () => {
    try {
        const res = await apiUrl.get('product/fetchAllCategory');
        return res.data
    } catch (error) {
        console.log(error);

    }
})

export const addreview = createAsyncThunk('product/addReview', async (review) => {
    console.log(review);
    try {
        const res = await authApiUrl.post('product/addReview', review)
        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})

export const fetchPrdReview = createAsyncThunk('product/fetchPrdReview', async (id) => {
    try {
        const res = await apiUrl.get(`product/fetchPrdReview/${id}`)
        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})

export const fetchReviews = createAsyncThunk('product/fetchReviews', async (id) => {
    try {
        const res = await apiUrl.get(`product/fetchReviews`)
        console.log(res.data);

        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})


export const addcategory = createAsyncThunk('product/addcategory', async (category) => {
    try {
        const res = await apiUrl.post('product/newCategory', category)
        window.location.reload()
        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})

export const delcategory = createAsyncThunk('product/delcategory', async (cateId) => {
    try {
        const res = await apiUrl.post(`product/delcategory/${cateId}`, cateId)
        window.location.reload()
        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})


export const addToCart = createAsyncThunk('product/addToCart', async (product) => {
    console.log(product);

    try {
        const res = await authApiUrl.post('product/addToCart', { product })
        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})

export const fetchCart = createAsyncThunk('product/fetchCart', async () => {
    try {
        const res = await authApiUrl.get('product/fetchCart')
        console.log(res.data);
        return res.data
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
})

export const decreasequantity = createAsyncThunk('product/decreasCart', async (productId) => {
    console.log(productId);
    try {
        const response = await authApiUrl.put(`/product/decrease/${productId}`)
        return response.data

    } catch (error) {
        console.error(error);

    }
})
export const removeFromCart = createAsyncThunk('product/removeFromCart', async (productId) => {
    try {
        const response = await authApiUrl.delete(`/product/remove/${productId}`)
        return response.data

    } catch (error) {
        console.error(error);
    }
})

//? ordering products with razorpay
export const orderProduct = createAsyncThunk('product/orderProduct', async ({ cartItems, totalPrice, user }) => {
    console.log(cartItems, totalPrice, user);

    try {
        const response = await authApiUrl.post('/product/payment', { cartItems, totalPrice })
        console.log(response.data.order);

        const { id: orderId, amount: orderAmount } = response.data.order

        const options = {
            key: import.meta.env.VITE_key_id,
            amount: orderAmount,
            currency: 'INR',
            name: 'Shopping Cart',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async (res) => {
                if (res) {
                    await authApiUrl.post('/product/order', { orderId, cartItems, totalPrice })
                    window.location.href = `/success?paymentId=${res.razorpay_payment_id}`
                } else {
                    window.location.href = '/failed';
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone,
            },
            theme: {
                color: "#F37254",
            },
        }
        const razorpayInstance = new Razorpay(options)
        razorpayInstance.open()
        // return response.data
    } catch (error) {
        console.error(error);
    }
})
export const maternityProductOrder = createAsyncThunk('product/MaternityorderProduct', async ({ quantities, totalPrice, user, prsize }) => {
    console.log(quantities, totalPrice, user);

    try {
        const response = await authApiUrl.post('/product/payment', { totalPrice })
        console.log(response.data.order);

        const { id: orderId, amount: orderAmount } = response.data.order

        const options = {
            key: import.meta.env.VITE_key_id,
            amount: orderAmount,
            currency: 'INR',
            name: 'Shopping',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async (res) => {
                if (res) {
                    await authApiUrl.post('/product/maternityorder', { orderId, quantities, totalPrice, prsize })
                    window.location.href = `/success?paymentId=${res.razorpay_payment_id}`
                } else {
                    window.location.href = '/failed';
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone,
            },
            theme: {
                color: "#F37254",
            },
        }
        const razorpayInstance = new Razorpay(options)
        razorpayInstance.open()
        // // return response.data
    } catch (error) {
        console.error(error);
    }
})




export const maternityorderByUser = createAsyncThunk('product/maternityorderByUser', async () => {
    try {
        const response = await authApiUrl.get('/product/fetchMaternityOrderByUser')
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const orderByUser = createAsyncThunk('product/orderByUser', async () => {
    try {
        const response = await authApiUrl.get('/product/fetchOrderByUser')
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const fetchAllMaternityorders = createAsyncThunk('product/fetchAllMaternityorders', async () => {
    try {
        const response = await authApiUrl.get('/product/fetchAllMaternityorders')
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const fetchorders = createAsyncThunk('product/fetchorders', async () => {
    try {
        const response = await authApiUrl.get('/product/fetchorders')
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const updateOrderStatus = createAsyncThunk('product/updateOrderStatus', async ({ orderId, status }) => {
    try {
        console.log(orderId, status);

        const response = await authApiUrl.put(`/product/updateOrderStatus/${orderId}`, { status })
        // window.location.reload()
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const updateMaternityOrderStatus = createAsyncThunk('product/updateMaternityOrderStatus', async ({ orderId, status }) => {
    try {
        console.log(orderId, status);

        const response = await authApiUrl.put(`/product/updateMaternityOrderStatus/${orderId}`, { status })
        // window.location.reload()
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const shopByCategory = createAsyncThunk('product/shopByCategory', async (category) => {
    try {
        const response = await apiUrl.get(`/product/shopByCategory/${category}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
    }
})

export const fetchPayments = createAsyncThunk('product/fetchPayments', async () => {
    try {
        const response = await authApiUrl.get('/product/fetchPayments')
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const fetchUserrPayments = createAsyncThunk('product/fetchUserrPayments', async () => {
    try {
        const response = await authApiUrl.get('/product/fetchUserrPayments')
        return response.data
    } catch (error) {
        console.error(error);
    }
})

export const communitProduct = createAsyncThunk('product/communityProduct', async (commId) => {
    try {
        const res = await authApiUrl.get(`/product/communityProduct/${commId}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const getSingleProduct = createAsyncThunk('product/getSingleProduct', async (prdId) => {
    try {
        const res = await apiUrl.get(`/product/getSingleProduct/${prdId}`);
        return res.data

    } catch (error) {
        console.error(error)
    }
})

export const updateProductDetails = createAsyncThunk('product/updateProductDetails', async (formData) => {
    try {
        const res = await authApiUrl.put(`/product/updateProductDetails`, formData);
        // window.location.reload()
        return res.data

    } catch (error) {
        console.error(error)
    }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId) => {
    try {
        const res = await authApiUrl.delete(`product/deleteProduct/${productId}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
})



export const addMaternityProducts = createAsyncThunk('product/addmaternityProducts', async (formData) => {
    try {
        const res = await authApiUrl.post('product/addmaternityProducts', formData)
        return res.data
    } catch (error) {
        console.error(error)
    }
})


export const fetchmaternityProducts = createAsyncThunk('product/fetchmaternityProducts', async () => {
    try {
        const res = await apiUrl.get('product/fetchmaternityProducts')
        return res.data
    } catch (error) {
        console.error(error)
    }
})

export const fetchMaternityProductbyCategory = createAsyncThunk('product/fetchmaternityProductbyCategory', async (cate) => {
    try {
        const res = await apiUrl.get(`product/maternityProductsbyCategory/${cate}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
})




const initialState = {
    error: null,
    products: [],
    supplierProduct: [],
    commuProducts: [],
    productByCategory: [],
    currentProduct: [],
    categories: [],
    reviews: [],
    cart: [],
    orders: [],
    maternityorders: [],
    maternityordersByUser: [],
    payments: [],
    userpayments: [],
    maternityProducts: [],
    maternityProductsbyCategory: [],
    loading: true
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                console.log("Fetch Products Fulfilled:", action); // Debugging log
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                console.error("Fetch Products Rejected:", action.error.message); // Debugging log
                state.loading = false;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                console.log("Fetch Single Product Fulfilled:", action.payload);
                state.currentProduct = action.payload; // Add a currentProduct field to your state
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                console.log("Product Added:", action.payload);
                state.products.push(action.payload); // Add the new product to the array
            })
            .addCase(addcategory.fulfilled, (state, action) => {
                console.log("Category Added:", action.payload);
                state.categories.push(action.payload);
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(delcategory.fulfilled, (state, action) => {
                console.log("Category Deleted:", action.payload);
                state.categories = state.categories.filter(cate => cate._id !== action.payload); // Filter the categories array to remove the deleted category
            })

            .addCase(fetchsupplierProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchsupplierProduct.fulfilled, (state, action) => {
                console.log("Fetch Supplier Products Fulfilled:", action);
                state.supplierProduct = action.payload;
                state.loading = false;
            })
            .addCase(fetchsupplierProduct.rejected, (state, action) => {
                console.error("Fetch Supplier Products Rejected:", action.error.message);
                state.loading = false;
            })

            .addCase(fetchPrdReview.fulfilled, (state, action) => {
                console.log("Fetch Product Reviews Fulfilled:", action);
                state.reviews = action.payload;
            })

            .addCase(fetchPrdReview.rejected, (state, action) => {
                console.error("Fetch Product Reviews Rejected:", action.error.message);
            })

            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload
            })

            .addCase(orderByUser.fulfilled, (state, action) => {
                state.orders = action.payload
            })

            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload
            })

            .addCase(fetchorders.fulfilled, (state, action) => {
                state.orders = action.payload
            })

            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.payments = action.payload
            })

            .addCase(fetchUserrPayments.fulfilled, (state, action) => {
                state.userpayments = action.payload
            })

            .addCase(shopByCategory.fulfilled, (state, action) => {
                state.productByCategory = action.payload
                console.log(state.productByCategory)
            })

            .addCase(communitProduct.fulfilled, (state, action) => {
                state.commuProducts = action.payload
            })

            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.currentProduct = action.payload
            })

            .addCase(fetchmaternityProducts.fulfilled, (state, action) => {
                state.maternityProducts = action.payload
                console.log(state.maternityProducts)
            })

            .addCase(fetchMaternityProductbyCategory.fulfilled, (state, action) => {
                state.maternityProductsbyCategory = action.payload
                console.log(state.maternityProductsbyCategory)
            })

            .addCase(maternityorderByUser.fulfilled, (state, action) => {
                state.maternityordersByUser = action.payload
            })

            .addCase(fetchAllMaternityorders.fulfilled, (state, action) => {
                state.maternityorders = action.payload
            })
    }


});


export default productSlice.reducer