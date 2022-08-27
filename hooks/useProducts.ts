


import useSWR, { SWRConfiguration } from 'swr'
import { IProducto } from '../interfaces/models';

const fetchr:any=(...args:[key:string])=>fetch(...args).then((res:any)=>res.json());
export const useProducts = (url:string, fetcher: SWRConfiguration = {}) => {
    const { data, error } = useSWR('/api'+url,fetchr, fetcher)

    return{
        data:data  ??[],
        loading:!data&&!error,
        isError:error
    }
}
