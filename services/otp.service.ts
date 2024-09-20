import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.0.2.2:8080" }),
  endpoints: (builder) => ({
    registrationOTP: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/otps/registration",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegistrationOTPMutation } = otpApi;
