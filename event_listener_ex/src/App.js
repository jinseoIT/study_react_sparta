import './App.css';
import React from "react";
import Text from "./Text";

class App extends React.Component{
constructor(props){
super(props);

this.state = {};
this.circle = React.createRef(null);
}

componentDidMount(){
  console.log(this.circle);
  this.circle.current.addEventListener('mouseover', this.hoverEvent)
}

hoverEvent = (e) => {
  console.log(e.target);
  console.log(this.circle.current);
  this.circle.current.style.background = "yellow";
}
  
componentWillUnmount() {
  this.circle.current.removeEventListener('mouseover', this.hoverEvent)  

}

render() {
return (
<div style={{width: "100vw", height:"100vh", textAlign:"center"}}>
<Text/>
<div style={{margin:"auto", width: "250px", height: "250px", background:"green", borderRadius:"250px"}} ref={this.circle}></div>

</div>
);
}
}

export default App;