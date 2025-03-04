const { createSlice, nanoid, createAsyncThunk, current } = require("@reduxjs/toolkit");

const initialState = {
    employees: JSON.parse(localStorage.getItem('emp')) || [],
    isLoading: false,
    error: null,
    employeesAPIData: []
}

// Common function for API requests
const fetchData = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

// Async thunk for fetching API data
export const apiData = createAsyncThunk("apidata", async () => {
    return fetchData('https://jsonplaceholder.typicode.com/users');
});

// Async thunk for adding employee via API
export const addEmployeeAPI = createAsyncThunk("addEmployeeAPI", async (name) => {
    return fetchData('https://jsonplaceholder.typicode.com/users', 'POST', { name });
});


// Async thunk for deleting employee via API
export const deleteEmployeeAPI = createAsyncThunk("deleteEmployeeAPI", async (id) => {
    await fetchData(`https://jsonplaceholder.typicode.com/users/${id}`, 'DELETE');
    return id; // Return id to update state
});

const Slice = createSlice({
    name: 'employeeSlice',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            const data = { id: nanoid(), name: action.payload };
            state.employees.push(data);
            localStorage.setItem("emp", JSON.stringify(current(state.employees)));
        },
        removeEmployee: (state, action) => {
            state.employees = state.employees.filter(item => item.id !== action.payload);
            localStorage.setItem("emp", JSON.stringify(state.employees));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(apiData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(apiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employeesAPIData = action.payload;
            })
            .addCase(apiData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addEmployeeAPI.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(deleteEmployeeAPI.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            });
    }
});

export const { addEmployee, removeEmployee } = Slice.actions;
export default Slice.reducer;

