import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";

const Progress = (props) => {
  const bucket_list = useSelector((state) => state.bucket.list);
  console.log(bucket_list);

  let count = 0;
  bucket_list.map((b, idx) => {
    if (b.completed) {
      count++;
    }
  })
  console.log(count);
  return (
    <ProgressBar>
      <HighLight width={(count/bucket_list.length) * 100 + '%'}/>
    </ProgressBar>
  )
}

const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 40px;
`;
const HighLight = styled.div`
  background: orange;
  transition: 1s;
  width: ${(props) => props.width};
  height: 40px;
`;
export default Progress;