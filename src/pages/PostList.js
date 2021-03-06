// PostList.js
import React from "react";
import {useSelector, useDispatch} from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {

    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    // console.log(post_list);
    const user_info = useSelector((state) => state.user.user);

    React.useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
    }, []);

    return (
        <React.Fragment>
            {/* <Post/> */}
            {post_list.map((p, idx) => {
                if (p.user_info.user_id === user_info?.uid) {   // ?. 옵셔널 체이닝
                    return <Post key={p.id} {...p} is_me/>
                } else {
                    return <Post key={p.id} {...p} />;
                }
            })}
        </React.Fragment>
    )
}

export default PostList;

