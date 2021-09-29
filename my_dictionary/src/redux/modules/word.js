import { db } from '../../config/firebase';
import { doc, query, updateDoc, collection, addDoc, getDocs, getDoc, deleteDoc, orderBy, limit, startAfter } from 'firebase/firestore';
import getNowTimeStamp from '../../config/dateCalc';

/* Action Types */
const ADD_WORD = 'ADD_WORD';
const GET_WORD = 'GET_WORD';
const UPDATE_WORD = 'UPDATE_WORD';
const DELETE_WORD = 'DELETE_WORD';
const MORE_WORDLIST = 'MORE_WORDLIST';
const IS_LOADED = 'IS_LOADED';
const NEXT_YN = 'NEXT_YN';

const initialState = {
  is_loaded: false,
  wordList: [],
  nextYn: true,
  viewScroll: 0
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
    if (wordList.length !== 0) {
      /* 추가 리스트가 있을 경우 */
      dispatch(moreWordList(wordList));
    } else {
      /* 추가 리스트가 없을 경우 */
      dispatch(nextYn());
    }
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
export const isLoaded = () => {
  return {type: IS_LOADED}
}
export const nextYn = () => {
  return {type: NEXT_YN}
}


/* Reducer */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ADD_WORD": {
      return {...state, wordList:[action.wordInfo, ...state.wordList], is_loaded: false}
    }
    case "GET_WORD": {
      const newList = action.wordList;
      const lastTimeStamp = newList[newList.length-1].nowDt;
      return {
        ...state,
        wordList: [...state.wordList, ...action.wordList],
        is_loaded: false,
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
          is_loaded: false
        }
      })
      return {...state, wordList: newWordList, is_loaded: false}
    }
    case "DELETE_WORD": {
      const newWordList = state.wordList.filter(item => item.id !== action.id)
      return {...state, wordList: newWordList, is_loaded: false}
    }
    case "MORE_WORDLIST": {
      const newList = action.wordList;
      const lastTimeStamp = newList[newList.length-1].nowDt;
      return {
        ...state,
        wordList: [...state.wordList, ...action.wordList],
        lastTimeStamp : lastTimeStamp
      }
    }
    case "IS_LOADED": {
      return {...state, is_loaded: true}
    }
    case "NEXT_YN": {
      return {...state, nextYn: false}
    }
    default:
      return state;
  }
}
