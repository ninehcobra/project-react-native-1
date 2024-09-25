import { authApi } from "@/services/auth.service";
import { nearByApi } from "@/services/near-by.service";
import { otpApi } from "@/services/otp.service";
import { configureStore } from "@reduxjs/toolkit";
import { selectedBusinessSlice } from "./slices/selected-business.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reviewApi } from "@/services/review.service";
import { previewImageSlice } from "./slices/preview-image.slice";

export const store = configureStore({
  reducer: {
    selectedBusiness: selectedBusinessSlice.reducer,
    previewImage: previewImageSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [nearByApi.reducerPath]: nearByApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      otpApi.middleware,
      nearByApi.middleware,
      reviewApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
