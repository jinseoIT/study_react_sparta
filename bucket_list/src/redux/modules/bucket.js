// bucket.js

// Actions
const CREATE = 'bucket/CREATE';
const UPDATE = 'bucket/UPDATE';
const DELETE = 'bucket/DELETE';

const initialState = {
  //"영화관 가기", "매일 책읽기", "수영 배우기", "코딩하기"  
  list: [
    { text: "영화관 가기", completed: false },
    { text: "매일 책읽기", completed: false },
    { text: "수영 배우기", completed: false },
    { text: "코딩하기", completed: false },
  ],
}



// Action Creators
export function createBucket(bucket) {
  console.log('create action');
  return { type: CREATE, bucket: bucket };
}

export function updateBucket(bucket_index){
  return { type: UPDATE, bucket_index };
}

export function deleteBucket(bucket_index) {
  console.log("지울 버킷 인덱스", bucket_index);
  return { type: DELETE, bucket_index };
}



// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "bucket/CREATE": {
      console.log('이제 값을 바꿀거야');
      const new_bucket_list = [...state.list, action.bucket];
      return {list: new_bucket_list};
    }
    case "bucket/DELETE": {
      const new_bucket_list = state.list.filter((v, idx) => {
        return parseInt(action.bucket_index) !== idx;
      })
      console.log(new_bucket_list);
      return {list: new_bucket_list};
    }
    case "bucket/UPDATE": {
      console.log("이제 완료할거야");
      console.log(state, action);
      const new_bucket_list = state.list.map((l, idx) => {
        if (parseInt(action.bucket_index) === idx) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      });
      console.log({ list: new_bucket_list });
      return {list: new_bucket_list};
    }
  default: return state;
  }
}
