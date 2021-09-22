// 리액트 패키지를 불러옵니다.
import React from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BucketList = (props) => {
  const history = useHistory();  
  const my_lists = useSelector((state) => state.bucket.list);
  console.log(my_lists);

  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle completed={list.completed} className="list_item" key={index} onClick={() => {
            history.push('/detail/'+index);
        }}>
        {list.text}
        </ItemStyle>
      );
    })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
display: flex;
flex-direction: column;
height: 100%;
overflow-x: hidden;
overflow-y: auto;
`;

const ItemStyle = styled.div`
padding: 16px;
margin: 8px;
background-color: ${(props) => props.completed? "orange" : "aliceblue"};
`;

export default BucketList;