import JSONPlaceholder from '../api/JSONPlaceholder';
import _ from 'lodash';
import fetchUsers from '../reducers/fetchUsers';
export const fetchPosts = () => {
    return async(dispatch) =>
    {
        // Async-await make the all problem for our Action-creator,
        //      coz of 2 reasons
        // 1.  We didnt return our action object actually we return our request object of Async-await
        // 2.  If we dont use Async-await By the time our action gets to reducer,  we wont get fetched our data.
        //  ActionsCreator -> Action -> dispacth -> Reducers  : this flow is amazingly very very fast
        
        const data = await JSONPlaceholder.get("/posts");
        dispatch({ type :"FETCH_POSTS", payload : data.data});
    }
}

// Problem with memoize for outer function is that it returns the fetchUser function every time
// and inner function make a new fetch-request for userId because of redux-thunk. If we do 
// memoize the inner function it will return the brand new function and make a brand 
// new request with Id
//  

export const fetchUser = (id)=>{
    return async (dispatch)=>{ 
        const userData = await JSONPlaceholder.get("/users/" + id);
        dispatch({type : "FETCH_USER", payload : userData.data});
    }
}


export const fetchPostsAndUsers = () => async (dispatch, getState)=>{
    console.log("before");    
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));
}

// export const fetchUser = function(id){
//     return function(dispatch)
//     {
//         _fetchUser(id, dispatch);
//     }
    
// }

