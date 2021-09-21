import React from 'react';
import { useHistory } from 'react-router';


const NotFound = (props) => {
  const history = useHistory();
  const backPage = () => {
    history.goBack()
  }
  return (
    <>
    <h1>주소가 올바르지 않아요!.</h1>
      <button onClick={backPage}>뒤로가기</button>
    </>
  );
};

export default NotFound;