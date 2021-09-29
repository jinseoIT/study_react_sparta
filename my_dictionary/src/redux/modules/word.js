import { db } from '../../config/firebase';
import { doc, query, updateDoc, collection, addDoc, getDocs, getDoc, deleteDoc, orderBy, limit, startAfter } from 'firebase/firestore';
import getNowTimeStamp from '../../config/dateCalc';
/* Action Types */
const ADD_WORD = 'ADD_WORD';
const GET_WORD = 'GET_WORD';
const UPDATE_WORD = 'UPDATE_WORD';
const DELETE_WORD = 'DELETE_WORD';
const IS_LOADED = 'IS_LOADED';
const MORE_WORDLIST = 'MORE_WORDLIST';
const ADD_WORDLIST_TEST = 'ADD_WORDLIST_TEST';

const initialState = {
  is_loaded: true,
  wordList: []
}

/*  middleWares */
export const addWordFB = (wordInfo) => {
  return async (dispatch) => {
    wordInfo.nowDt = getNowTimeStamp();
    const docRef = await addDoc(collection(db, 'dictionary'), wordInfo);
    const newWord = await getDoc(docRef);
    const newWordInfo = {
      id: newWord.id,
      updateLock: true,
      ...wordInfo
    }
    dispatch(addWord(newWordInfo))
  }
}
export const getWordsFB = () => {
  return async (dispatch) => {
    const wordRef = collection(db, 'dictionary');
    const q = query(wordRef, orderBy('nowDt', 'desc'), limit(5));
    const word_data = await getDocs(q);
    let wordList = [];
    word_data.forEach((doc) => {
      wordList.push({ id: doc.id, updateLock: true, ...doc.data() });
    });
    dispatch(getWord(wordList)) 
  }
}
export const updateWordFB = (wordInfo) => {
  return async (dispatch) => {
    const docRef = doc(db, 'dictionary', wordInfo.id);
    await updateDoc(docRef, wordInfo)
    dispatch(updateWord(wordInfo));
  }
}

export const deleteWordFB = (id) => {
  return async (dispatch) => {
    const docRef = doc(db, 'dictionary', id);
    await deleteDoc(docRef);
    dispatch(deleteWord(id));
  }
}

export const moreWorldListFB = (lastTimeStamp) => { 
  return async (dispatch) => {
    const wordRef = collection(db, 'dictionary');
    const q = query(
      wordRef,
      orderBy('nowDt', 'desc'),
      limit(5),
      startAfter(lastTimeStamp)
    );
    const word_data = await getDocs(q);
    let wordList = [];
    word_data.forEach((doc) => {
      wordList.push({ id: doc.id, updateLock: true, ...doc.data() });
    });
  dispatch(moreWordList(wordList)) 
  }
}



/* Action Creators */
export const addWord = (wordInfo) => {
  return {type : ADD_WORD, wordInfo}
}
export const getWord = (wordList) => {
  return {type : GET_WORD, wordList}
}
export const updateWord = (wordInfo) => {
  return {type: UPDATE_WORD, wordInfo}
}
export const deleteWord = (id) => {
  return {type: DELETE_WORD, id}
}
export const moreWordList = (wordList) => {
  return {type: MORE_WORDLIST, wordList}
}
export const addWordListTest = () => {
  console.log('테스트 action');
  const wordList = [];
  for (let i = 0; i < 10; i += 1){
    const wordObj = {
      description: "테스트용입니다.",
      example: "예시 테스트",
      nowDt: 1632842165759,
      word: "테스트용",
      updateLock: true
    }
    wordList.push(wordObj);
  }
  return {type: ADD_WORDLIST_TEST, wordList}
}
export const isLoaded = () => {
  return {type: IS_LOADED}
}


/* Reducer */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ADD_WORD": {
      return {...state, wordList:[action.wordInfo, ...state.wordList], is_loaded: true}
    }
    case "GET_WORD": {
      const newList = action.wordList;
      const lastTimeStamp = newList[newList.length-1].nowDt;
      //console.log('getTimeStmap', lastTimeStamp);
      return {
        ...state,
        wordList: [...state.wordList, ...action.wordList],
        is_loaded: true,
        lastTimeStamp : lastTimeStamp
      }
    }
    case "UPDATE_WORD": {
      const newWordList = state.wordList.map(item => {
        if (item.id !== action.wordInfo.id) {
          return item
        }
        return {
          ...item,
          ...action.wordInfo,
          is_loaded: true
        }
      })
      return {...state, wordList: newWordList, is_loaded: true}
    }
    case "DELETE_WORD": {
      const newWordList = state.wordList.filter(item => item.id !== action.id)
      return {...state, wordList: newWordList, is_loaded: true}
    }
    case "IS_LOADED": {
      return {...state, is_loaded: false}
    }
    case "MORE_WORDLIST": {
      console.log('reducer 4');
      const newList = action.wordList;
      const lastTimeStamp = newList[newList.length-1].nowDt;
      return {
        ...state,
        wordList: [...state.wordList, ...action.wordList],
        lastTimeStamp : lastTimeStamp
      }
    }
    case "ADD_WORDLIST_TEST": {
      return {...state, wordList:[...state.wordList, ...action.wordList]}
    }
    default:
      return state;
  }
}
