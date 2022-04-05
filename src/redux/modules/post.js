import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
  list: [],
}

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "romero",
  //   user_profile: "https://imgnews.pstatic.net/image/076/2022/04/05/2022040501000313400018701_20220405075004285.jpg?type=w647",
  // },
  image_url: "https://imgnews.pstatic.net/image/076/2022/04/05/2022040501000313400018701_20220405075004285.jpg?type=w647",
  contents: "볼 경합중인 토트넘의 수비수 로메로",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),   // moment은 오늘날짜, format 은 어떤형태로.
};

const addPostFB = (contents="", ) => {
  return function (dispatch, getState, {history}) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    }
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt:  moment().format("YYYY-MM-DD hh:mm:ss"), // 한번더 넣어줘야함
    }
    // console.log({...user_info, ..._post});

    // ~~~.add({추가할정보들})
    postDB.add({...user_info, ..._post}).then((doc) => {
      let post = {user_info, ..._post, id: doc.id};
      dispatch(addPost(post));
      history.replace("/");
    }).catch((err) => {
      console.log("post작성에 실패했어요!", err);
    });
  }
}

const getPostFB = () => {
  return function (dispatch, getState, {history}) {
    const postDB = firestore.collection("post");
    postDB.get().then((docs) => {

      let post_list = [];

      docs.forEach((doc) => {
        // console.log(doc.id, doc.data());
        let _post = doc.data();

        // 키값들을 배열로 만들어줌 ['comment_cnt', 'contents', ..]
        let post = Object.keys(_post).reduce((acc, cur) => {

          if (cur.indexOf("user_") !== -1) {
            return {
              ...acc, 
              user_info: {...acc.user_info, [cur]: _post[cur]},
            };
          }
          return {...acc, [cur]: _post[cur]}
        }, {id: doc.id, user_info: {}});
        
        console.log(post)
        post_list.push(post);
      });
      console.log(post_list);

      dispatch(setPost(post_list));
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    }),
  }, initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
}

export {actionCreators};