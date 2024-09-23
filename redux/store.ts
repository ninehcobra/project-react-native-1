import { authApi } from "@/services/auth.service";
import { nearByApi } from "@/services/near-by.service";
import { otpApi } from "@/services/otp.service";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [nearByApi.reducerPath]: nearByApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      otpApi.middleware,
      nearByApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
