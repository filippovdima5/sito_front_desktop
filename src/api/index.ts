import axios, { AxiosPromise } from 'axios'
import config from '../config'
import {
  ProductsReqParams,
  ProductsRequest,
  FilterReqParams,
  FiltersRequest,
  MainSearchReqParams,
  MainSearchResultItem,
  UserRequest,
  UserReqParams,
  AllBrandsRequest,
  ShortProduct,
  SeoReqParams,
  SeoRequest
} from './types'


export const apiGet = axios.create({
  method: 'get',
  baseURL: config.api.main.endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.ssr ? 5000 : 15000,
})

export const apiPost = axios.create({
  method: 'post',
  baseURL: config.api.main.endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: config.ssr ? 5000 : 15000,
})


export const api = {
  user: {
    setUser: (params: UserReqParams) => apiPost
      .post('/user', params),
    
    getUser: (): AxiosPromise<UserRequest> => apiGet
      .get('/user'),
    
    getIdUser: (params: {id: string}): AxiosPromise<UserRequest> => apiGet
      .get(`/user/byId?id=${params.id}`)
  },

  
  products: {
    getProducts: (params: ProductsReqParams): AxiosPromise<ProductsRequest> => apiPost
      .post('/products/products-list', params),
    
    getFilters: (params: FilterReqParams): AxiosPromise<FiltersRequest> => apiPost
      .post('/products/facet-filters', params),
    
    getLikeProducts: (params: { likes: Array<string> }): AxiosPromise<Array<ShortProduct>> => apiPost
      .post('/products/like-products', params)
  },

  
  search: {
    mainSearch: (params: MainSearchReqParams): AxiosPromise<Array<MainSearchResultItem>> => apiPost
      .post('/search/main-search', params)
  },
  
  
  simple: {
    allBrands: ( params: { sexId: 1 | 2 }): AxiosPromise<Array<AllBrandsRequest>> => {
      return apiGet
        .get(`/simple/all-brands/?sexId=${params.sexId}`)
    },
    
    popularBrands: (params: { sexId: 1 | 2 | null }): AxiosPromise<Array<string>> => {
      return apiGet
        .get(`/simple/popular-brands/?sexId=${params.sexId}`)
    }
  },
  
  seo: {
    getSeo: (params: SeoReqParams): AxiosPromise<SeoRequest> => apiPost
      .post('/seo', params)
  }
  
}
