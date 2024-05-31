import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  project: null,
  loading: true,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjectsSuccess: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
    },
    getProjectSuccess: (state, action) => {
      state.project = action.payload;
      state.loading = false;
    },
    createProjectSuccess: (state, action) => {
      state.projects.push(action.payload);
      state.loading = false;
    },
    updateProjectSuccess: (state, action) => {
      state.projects = state.projects.map(project => project._id === action.payload._id ? action.payload : project);
      state.loading = false;
    },
    deleteProjectSuccess: (state, action) => {
      state.projects = state.projects.filter(project => project._id !== action.payload);
      state.loading = false;
    },
    projectFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  getProjectsSuccess,
  getProjectSuccess,
  createProjectSuccess,
  updateProjectSuccess,
  deleteProjectSuccess,
  projectFailure,
  setLoading,
} = projectSlice.actions;

export default projectSlice.reducer;
