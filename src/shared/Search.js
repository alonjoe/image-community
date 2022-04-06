import React from "react";
import _ from "lodash";

const Search = () => {

  const [text, setText] = React.useState("");
  
  const debounce = _.debounce((e) => {
    console.log("debounce :::", e.target.value);
  }, 1000);

  const throttle = _.throttle((e) => {
    console.log("debounce :::", e.target.value);
  }, 1000)
  
  const keyPress = React.useCallback(debounce, []); // useEffect와 비슷 이함수안에 넣어줘야 debounce나 throttle만 동작함.

  const onChange = (e) => {
    setText(e.target.value);
    keyPress(e);
  }


  return (
    <div>
      <input type="text" onChange={onChange} />
    </div>
  )
}

export default Search;