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
            <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

Post.defaultProps = {
  user_info: {
    user_name: "romero",
    user_profile: "https://imgnews.pstatic.net/image/076/2022/04/05/2022040501000313400018701_20220405075004285.jpg?type=w647",
  },
  image_url: "https://imgnews.pstatic.net/image/076/2022/04/05/2022040501000313400018701_20220405075004285.jpg?type=w647",
  contents: "볼 경합중인 토트넘의 수비수 로메로",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;