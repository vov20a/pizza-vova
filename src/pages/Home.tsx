import React from 'react';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import SortPopup, { list } from '../components/SortPopup';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import {
  selectFilter,
} from '../redux/filter/selectors';
import {
  FilterSliceState,
} from '../redux/filter/types';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/pizza/createaAsincFunc';
import { selectPizza } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { categoryId, currentPage, pageCount, sort, searchValue } = useSelector(selectFilter);
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectPizza);

  const navigate = useNavigate();

  const [limit] = React.useState(3);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const pizzas = items
    // .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  // console.log(pizzas);
  const skeletons = [...new Array(limit)].map((_, index) => <Skeleton key={index} />);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const searchInCategory = searchValue ? searchValue : '';

  async function getPizzas() {
    const params = {
      category,
      sort,
      searchInCategory,
      limit,
      currentPage,
    };
    dispatch(
      fetchPizzas(params));
  }
  //на первом месте-работает только на первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      let params = qs.parse(window.location.search.substring(1));
      let sort = list.find((item) => item.sortProperty === params.sortProperty);
      sort = sort || list[0];
      // console.log("Sort:", sort);
      params = { ...params, sort }
      const prms = (params as unknown) as FilterSliceState;
      // console.log("Params:", prms);
      dispatch(setFilters({ ...prms }));
      isSearch.current = true;
    }
  }, []);
  //на втором месте
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (searchInCategory) {
      dispatch(setCurrentPage(1));
    }
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        pageCount,
        sortProperty: sort.sortProperty,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const changeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
      dispatch(setCurrentPage(1));
    }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id: number) => changeCategory(id)} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">___________</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Pizza error </h2>
          <p>Wrong https address</p>
        </div>
      ) : (
        <div>
          <div className="content__items">
            {status === 'loading' ? skeletons : pizzas.length ? pizzas : <h3>"Ничего нет"</h3>}
          </div>
          {pageCount > 1 && (
            <Pagination
              limit={limit}
              pageCount={pageCount}
              currentPage={currentPage}
              onChangePage={(page: number) => dispatch(setCurrentPage(page))}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
