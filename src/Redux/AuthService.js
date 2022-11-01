import axios from "axios";


// Register user
const register = async (userData) => {
    const res = await axios.post("/auth/registration", userData);
    if(res.data) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    return res.data;
};

// login user
const login = async (userData) => {
    const res = await axios.post("/auth/login", userData);
    let res2 = {};
    if (res.data) {
        localStorage.setItem("flame", JSON.stringify(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.unionAccount) {
            res2 = await axios.get(`/unions?unionId=${res.data.unionId}`);
            if (res2.data) {
                localStorage.setItem("union", JSON.stringify(res2.data));
            }
        }
    }
    return { flame: res.data, union: res2.data };
};

// Logout user
const logout = () => {
    localStorage.removeItem("flame");
    localStorage.removeItem("union");
    localStorage.removeItem("user");
};


const authService = {
    register,
    login,
    logout,
}

export default authService;