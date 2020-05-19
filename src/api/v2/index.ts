import axios, { AxiosPromise } from 'axios'
import config from '../../config'
import {
  FacetFilters,
  GetFiltersParams,
  GetProductsParams,
  PaginateResponse,
  PopularBrandsParams,
  ShortProduct
} from './types'
import { formQueryGetFilters, formQueryGetProductsList } from './lib'


export const request = axios.create({
  method: 'get',
  baseURL: config.api.main.v2,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.ssr ? 5000 : 15000,
})

export const api = {
  getPopularBrands: (params: PopularBrandsParams): AxiosPromise<Array<string>> => request
    .get(`/popular-brands?sex_id=${params.sexId}&limit=${params.limit}`),
  
  getProductsList: (params: GetProductsParams): AxiosPromise<PaginateResponse<ShortProduct>> => request
    .get(`/products${formQueryGetProductsList(params)}`),
  
  filters: {
    facet: (params: GetFiltersParams): AxiosPromise<FacetFilters> => request
      .get(`/facet-filters${formQueryGetFilters(params)}`),
    
    brands: (params: GetFiltersParams): AxiosPromise<Array<string>> => request
      .get(`/brand-filters${formQueryGetFilters(params)}`),
  }
}


