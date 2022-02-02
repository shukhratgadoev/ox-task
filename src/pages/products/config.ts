import { productApi } from "api";
import React, { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";

export const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Description',
        dataIndex: 'shortDescription',
        key: 'shortDescription'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Supplier',
        dataIndex: 'supplier',
        key: 'supplier'
    },
    {
        title: 'Barcode',
        dataIndex: 'barcode',
        key: 'barcode'
    },
]


export const useGetProducts = (token: string | null) => {
    const [params, setParams] = useState({ size: 10, page: 1 });
    const [query, setQuery] = useState('')

    const { data, isLoading } = useQuery(
        ["fetchGoods", params],
        () => productApi.getProducts(params),
        {
          refetchOnWindowFocus: false,
          retry: 2,
          enabled: Boolean(token),
        }
    );


    const onPageChange = useCallback((page: number, size: number) => {
        setParams({page, size})
    }, []) 


    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.currentTarget.value)
    }


    const list = useMemo(() => {
        return data?.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    }, [data?.items, query])

  
    

    return {
        isLoading,
        data: {
            ...data,
            items: list
        },
        params,
        onPageChange,
        query,
        onQueryChange
    }

}