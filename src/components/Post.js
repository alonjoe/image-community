import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import {Grid, Image, Text} from "../elements";


const Post = (props) => {

    return (
      <React.Fragment>
        <Grid>
          <Grid is_flex padding="16px">
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text>{props.insert_dt}</Text>
            </Grid>
          </Grid>
          <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.src} />
          </Grid>
          <Grid padding="16px">
            <Text bold>댓글 {props.comment_cnt}개</Text>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://i.pinimg.com/originals/9c/8d/88/9c8d885d3ad633d81d8a44e151161a6f.jpg",
  },
  image_url: "https://i.pinimg.com/originals/9c/8d/88/9c8d885d3ad633d81d8a44e151161a6f.jpg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;