import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser, deleteUser, getUsers, getUser ,getUserTasks} from "./userApi"; 
import { setUser } from '../auth/authSlice'; 

const initialState = {
  loading: false,
  currentUser: null,
  errorMessage: null,
  successMessage: null,
};

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const data = await deleteUser(userId);
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async ({ userId, formData }, { rejectWithValue, dispatch }) => {
    try {
      const data = await updateUser(userId, formData);
      dispatch(setUser(data.data.user));
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async (filter, { rejectWithValue }) => {
    try {
      const data = await getUsers(filter);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getUser(userId);
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserTasksAsync = createAsyncThunk(
  "user/getUserTasks",
  async ({userId}, { rejectWithValue }) => {
    try {
      const data = await getUserTasks(userId);
      console.log("userSlice data",data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "User deleted successfully.";
        state.currentUser = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "User updated successfully.";
        if (Array.isArray(state.currentUser)) {
          state.currentUser = state.currentUser.map(user =>
            user._id === action.payload._id ? action.payload : user
          );
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.users;
        // console.log("action.payload.users",action.payload.users);
        state.successMessage = "Users fetched successfully.";
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.successMessage = "User fetched successfully.";
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getUserTasksAsync.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(getUserTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "User task get successfully.";
      })
      .addCase(getUserTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default userSlice.reducer;

export const selectUser = (state) => state.user.currentUser;
export const selectError = (state) => state.user.errorMessage;
export const selectSuccess = (state) => state.user.successMessage;
export const selectLoader = (state) => state.user.loading;
