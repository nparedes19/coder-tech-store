import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {base_url} from '../firebase/database'

export const receiptApi = createApi ({
    reducerPath: "receiptsApi",
    baseQuery: fetchBaseQuery({baseUrl:base_url}),
    tagTypes: ["Receipts"],
    endpoints: (builder)=>({
        postReceipt: builder.mutation({
            query: ({...receipt}) => ({
                url:'receipts.json',
                method: 'POST',
                body:receipt
            }),
            invalidatesTags: ["Receipts"],
        }),
        getReceipts: builder.query({
            query: () => "receipts.json",
            transformResponse: (response) =>
                response ? Object.values(response) : [],
            providesTags: ["Receipts"]
        }),
        
    })
})

export const {usePostReceiptMutation, useGetReceiptsQuery} = receiptApi