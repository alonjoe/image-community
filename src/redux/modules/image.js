import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING"; // 업로드중인지?
const UPLOAD_IMAGE = "UPLOAD_IMAGE";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));

const initailState = {
  image_url: "",
  uploading: false,
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));

    console.log(`images/${new Date().getTime()}_${image.name}`);
    const _upload = storage.ref(`images/${image.name}`).put(image);

    // 업로드
    _upload
      .then((snapshot) => {
        console.log(snapshot);
        dispatch(uploading(false));
        snapshot.ref.getDownloadURL().then((url) => {
          dispatch(uploadImage(url));
          console.log(url);
        });
      })
      .catch((err) => {
        dispatch(uploading(false));
      });
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
  },
  initailState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
};

export { actionCreators };
