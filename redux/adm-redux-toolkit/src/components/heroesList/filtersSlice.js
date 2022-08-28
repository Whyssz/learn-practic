import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/filters');
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    changedActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle';
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changedActiveFilter,
} = actions;
// export const filtersFetching = createAction('FILTERS_FETCHING');
// export const filtersFetched = createAction('FILTERS_FETCHED');
// export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
// export const changedActiveFilter = createAction('CHANGED_ACTIVE_FILTER');
