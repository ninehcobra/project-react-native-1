import { IFindNearByPayLoad, IFindNearByResponse } from "@/types/near-by";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nearByApi = createApi({
  reducerPath: "nearByApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nearby-service.onrender.com" }),
  tagTypes: ["NearBy"],
  endpoints: (builder) => ({
    findNearBy: builder.query<IFindNearByResponse, IFindNearByPayLoad>({
      query: (params) => ({
        url: "/find-nearby",
        method: "GET",
        params,
      }),
      providesTags: ["NearBy"],
    }),
  }),
});

export const { useFindNearByQuery } = nearByApi;
