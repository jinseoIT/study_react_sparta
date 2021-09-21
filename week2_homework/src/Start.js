import React from "react";
const Start = () => {

  const [name, setName] = React.useState("AKA");
  const [serachName, setSearchName] = React.useState('')

  const setKnowName = () => {
    setName(serachName)
  }
  
  const handleChange = (e) => {
    setSearchName(e.target.value)
  }
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "1.5em", lineHeight: "1.5" }}>
        나는 <span style={{
            backgroundColor: "#fef5d4",
            padding: "5px 10px",
            borderRadius: "30px"
        }}>{name}</span>에 대해 얼마나 알고 있을까?
      </h1>
      <input style={{
        border: "1px solid #dadafc",
        borderRadius: "30px",
        padding: "10px",
        width: "100%"
      }} onChange={handleChange}/>
      <button style={{
          padding: "10px 36px",
          backgroundColor: "#dadafc",
          border: "#dadafc",
          borderRadius: "30px",
          margin: "36px 0px"
      }} onClick={setKnowName}>시작하기</button>
    </div>
  );
};

export default Start;