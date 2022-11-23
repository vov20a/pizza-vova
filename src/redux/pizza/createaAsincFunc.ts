import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pagesCount } from "../../utils/pagesCount";
import { sortMode } from "../../utils/sort";
import { setPageCount } from "../filter/slice";
import { FetchPizzasArgs, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params:FetchPizzasArgs, thunkAPI) => {
      const { category, sort, searchInCategory, limit, currentPage } = params;
      const { data} = await axios.get<Pizza[]>(
        `https://62c2e7f4876c4700f531e25f.mockapi.io/items?${category}`,
      );
      let json:Pizza[] = sortMode(sort.sortProperty, data);
      json = json.filter((item ) => item.title.toLowerCase().includes(searchInCategory.toLowerCase()));
      thunkAPI.dispatch(setPageCount(pagesCount(json.length, limit)));
      json = json.slice((currentPage - 1) * limit, currentPage * limit);
      // thunkAPI.rejectWithValue('error');
      // console.log(thunkAPI.getState().filter)
  
      return json;
    },
  );