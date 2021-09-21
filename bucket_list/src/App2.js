import React from "react";
import BucketList from "./BucketList";
import styled from "styled-components";

class App extends React.Component {
constructor(props) {
super(props);

this.state = {
list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
};

this.text = React.createRef();
}

componentDidMount() { 
}

addBucket = () => {
console.log(this.text.current.value);
const new_item = this.text.current.value;
// ... => 스프레드 문법
// [...this.state.list, 넣고 싶었던 어떤 값]
this.setState({ list: [...this.state.list, new_item] });
}

render() {

return (
<AppWrap className="App">
<Container>
<Title>내 버킷리스트</Title>
<Line />
<BucketList list={this.state.list} />
</Container>

<InputWrap>
<input type="text" ref={this.text} />
<button onClick={this.addBucket}>추가하기</button>
</InputWrap>
</AppWrap>
);
}
}

const AppWrap = styled.div`
background-color: #eee;
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
`;

const Container = styled.div`
background-color: #fff;
width: 50vw;
max-width: 350px;
margin: auto;
height: 80vh;
padding: 16px;
border: 1px solid #ddd;
border-radius: 5px;
`;

const Title = styled.h1`
color: slateblue;
text-align: center;
`;

const Line = styled.hr`
margin: 16px 0px;
`;


const InputWrap = styled.div`
background-color: #fff;
width: 50vw;
max-width: 350px;
margin: auto;
padding: 16px;
border: 1px solid #ddd;
border-radius: 5px;
`;

export default App;