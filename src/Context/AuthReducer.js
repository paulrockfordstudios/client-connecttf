const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        case "FOLLOW":
            return {
               ...state,
               user:{
                   ...state.user,
                   following: [...state.user.following, action.payload]
                }
            };
        case "UNFOLLOW":
            return {
                ...state,
               user:{
                   ...state.user,
                   following: state.user.following.filter(
                       (following) => following !==action.payload
                    ),
                },
            };
        case "BLOCK":
            return {
               ...state,
               user:{
                   ...state.user,
                   blocking: [...state.user.blocking, action.payload]
                }
            };
        case "UNBLOCK":
            return {
                ...state,
               user:{
                   ...state.user,
                   blocking: state.user.blocking.filter(
                       (blocking) => blocking !==action.payload
                    ),
                },
            };
        case "SUSCRIBE":
            return {
               ...state,
               user:{
                   ...state.user,
                   subscribing: [...state.user.subscibing, action.payload]
                }
            };
        case "UNSUBSCRIBE":
            return {
                ...state,
               user:{
                   ...state.user,
                   subscribing: state.user.subscribing.filter(
                       (subscribing) => subscribing !==action.payload
                    ),
                },
            };
        case "SIGN_OUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
             return state;
    }
};

export default AuthReducer;