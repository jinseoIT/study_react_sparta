// user 이름을 넣자!
// 이름을 바꿔주자!

const SET_NAME = "user/SET_NAME";

export const setName = (name) => {
    return {type: SET_NAME, name};
}

const initialState = {
    user_name: "",
}

export default function reducer(state = initialState, action ={})
{
    switch (action.type) {
        case "user/SET_NAME": {
            console.log(action);
            return {...state, user_name: action.name};
        }
        
        default:
            return state;
    }
}