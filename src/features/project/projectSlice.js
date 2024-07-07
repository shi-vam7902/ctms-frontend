import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProject, getAllProject, addTasks, getAllTask, updateTaskStatus,getUserProject,getTaskByProjectId } from "./projectApi";

export const getAllProjectsAsync = createAsyncThunk(
  'projects/getAllProject',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllProject();
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTasksAsync = createAsyncThunk(
  'projects/getAllTask',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllTask();
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProjectAsync = createAsyncThunk(
  'projects/addProject',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addProject(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  'projects/addTask',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addTasks(formData);
      return data;
    } catch (error) {
      console.log("error",error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  'projects/updateTaskStatus',
  async ({ taskId, taskStatus }, { rejectWithValue }) => {
    try {
      const data = await updateTaskStatus(taskId, taskStatus);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProjectAsync = createAsyncThunk(
  'projects/getUserProject',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserProject();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTaskByProjectIdAsync = createAsyncThunk(
  'projects/getTaskByProjectId',
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await getTaskByProjectId(projectId);
      console.log("projectSlice data:",data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    loading: false,
    projects: [],
    tasks: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjectsAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getAllProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getAllProjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(getAllTasksAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getAllTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getAllTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(addProjectAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(addTaskAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(updateTaskStatusAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
        // Update task status logic here if needed
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(updateTaskStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(getUserProjectAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getUserProjectAsync.fulfilled, (state, action) => {
        // Update task status logic here if needed
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(getUserProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(getTaskByProjectIdAsync.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(getTaskByProjectIdAsync.fulfilled, (state, action) => {
        // Update task status logic here if needed
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(getTaskByProjectIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  }
});



export default projectSlice.reducer;
export const selectProjects = (state) => state.projects.projects;
export const selectTasks = (state) => state.projects.tasks;
export const selectError = (state) => state.projects.error;
export const selectStatus = (state) => state.projects.status;
export const selectLoader = (state) => state.projects.loading;
