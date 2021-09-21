import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {deleteBucket} from './redux/modules/bucket'
import { useHistory} from "react-router-dom";


const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const bucket_index = params.index;
  const bucket_list = useSelector((state) => state.bucket.list);

  
  return (
    <div>
      <h1>{bucket_list[bucket_index]}</h1>
      <button onClick={() => {
        console.log("삭제하기 버튼을 눌렀어!");
        dispatch(deleteBucket(bucket_index));
        history.goBack();
      }}>삭제하기</button>
    </div>
  )
}

export default Detail;