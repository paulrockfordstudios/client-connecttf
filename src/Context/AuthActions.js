export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const UnFollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const Block = (userId) => ({
    type: "BLOCK",
    payload: userId,
});

export const UnBlock = (userId) => ({
    type: "UNBLOCK",
    payload: userId,
});

export const Subscribe = (userId) => ({
    type: "SUBSCRIBE",
    payload: userId,
});

export const UnSubscribe = (userId) => ({
    type: "UNSUBSCRIBE",
    payload: userId,
});

export const SignOut = (user) => ({
    type: "SIGN_OUT",
    payload: user,
});