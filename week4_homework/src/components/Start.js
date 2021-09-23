import React from 'react'

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
//import { setName } from '../redux/modules/user'
import { addUserName } from '../redux/modules/rank';
import { Container, Button, Highlight } from './elements';

const Start = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const name_ref = React.useRef(null);

  return (
    <Container>
      <h1>
        나는
        <Highlight
          style={{
            backgroudColor: "#fef5d4",
            padding: '5px 10px',
            borderRadius: '30px',
          }}
        >
          {props.name}
        </Highlight>
        에 대해 얼마나 알고 있을까?
      </h1>
      <input
        ref={name_ref}
        style={{
          border: "1px solid #dadafc",
          borderRadius: "30px",
          padding: "10px",
          width: "100%",
        }}
      />
      <Button
        onClick={() => {
          //dispatch(setName(name_ref.current.value)) 
          dispatch(addUserName(name_ref.current.value))
          history.push('/quiz');
        }}
      >
        시작하기
      </Button>
    </Container>
  )
}

export default Start
