import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";


const initialState:FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    pageCount: 1,      
    openSort: false,
    searchValue: '',
    sort:{
        name:'популярности(DESC)',
        sortProperty:SortPropertyEnum.RAITING_DESC,
    }, 
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategoryId(state, action:PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setPageCount(state, action:PayloadAction<number>) {
            state.pageCount = action.payload;
        },
        setSortType(state, action:PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setOpenSort(state, action:PayloadAction<boolean>) {
            state.openSort = action.payload;
        },
        setSearchValue(state, action:PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action:PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.pageCount = Number(action.payload.pageCount);
            state.sort = action.payload.sort;
            state.searchValue=action.payload.searchValue;
        },
    }
})



export const { setCategoryId, setCurrentPage, setPageCount, setSortType, setOpenSort, setSearchValue, setFilters } = filterSlice.actions;
export default filterSlice.reducer;