import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPhoto, upLoadPhoto, deletePhoto } from "./galleryAPI";

const initialState = {
  showConfirm: false,
  showConfirmModal: false,
  Photos: [],
};

export const upLoadPhotoAsync = createAsyncThunk(
  "gallery/upLoadPhoto",
  async (photoData) => {
    const response = await upLoadPhoto(photoData);

    return response.data;
  }
);

export const getPhotoAsync = createAsyncThunk("gallery/getPhoto", async () => {
  const response = await getPhoto();

  return response.data;
});
export const deletePhotoAsync = createAsyncThunk(
  "gallery/deletePhoto",
  async (photoId) => {
    console.log(photoId);

    const response = await deletePhoto(photoId);

    return response.data;
  }
);
export const gallerySlice = createSlice({
  name: "gallery",
  initialState,

  reducers: {
    openConfirmModal: (state) => {
      state.showConfirm = true;
    },
    closeConfirmModal: (state) => {
      state.showConfirmModal = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(upLoadPhotoAsync.fulfilled, (state, action) => {
        console.log("upLoadPhoto");
      })
      .addCase(getPhotoAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.Photos = action.payload;
      })
      .addCase(deletePhotoAsync.pending, (state, action) => {
        // console.log(action.payload);
      })
      .addCase(deletePhotoAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.Photos = action.payload;
      });
  },
});
export const { closeConfirmModal, openConfirmModal } = gallerySlice.actions;

export const selectshowConfirm = (state) => state.gallery.showConfirm;

export const showConfirmModal = (state) => state.gallery.showConfirmModal;

export const showPhotos = (state) => state.gallery.Photos;

export default gallerySlice.reducer;
