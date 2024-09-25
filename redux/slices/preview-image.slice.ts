import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

export interface IPreviewImage {
  image: ImageSourcePropType | null;
  isPreview: boolean;
}

const initialState: IPreviewImage = {
  image: null,
  isPreview: false,
};

export const previewImageSlice = createSlice({
  name: "previewImage",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<IPreviewImage>) => {
      state.image = action.payload.image;
      state.isPreview = action.payload.isPreview;
    },
  },
});

export const { setPreviewImage } = previewImageSlice.actions;
export default previewImageSlice.reducer;
