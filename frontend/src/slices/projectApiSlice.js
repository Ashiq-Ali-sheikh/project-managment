import { apiSlice } from './apiSlice';

const PROJECTS_URL = '/api/projects';

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
        query: ({ page, limit }) => `${PROJECTS_URL}?page=${page}&limit=${limit}`,
        providesTags: ['Project'],
        keepUnusedDataFor: 5,
      }),
    getProject: builder.query({
      query: (id) => `${PROJECTS_URL}/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Project', id: arg }],
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: PROJECTS_URL,
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: (project) => ({
        url: `${PROJECTS_URL}/${project._id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg._id }],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;