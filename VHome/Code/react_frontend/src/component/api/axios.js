import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};

export const listAllAPI = (functionName) => axios.get("/api/" + functionName + "/getAll");
export const editAPI = (functionName, id, data) => axios.put("/api/" + functionName + "/update/" + id, data);
export const addAPI = (functionName, data) => axios.post("/api/" + functionName + "/add", data);
export const showAPI = (functionName, id) => axios.get("/api/" + functionName + "/get/" + id);
export const deleteAPI = (functionName, id) => axios.delete("/api/" + functionName + "/delete/" + id);
export const searchAPI = (functionName, keyword) => axios.get(`/api/` + functionName + `/search?keyword=${keyword}`);
export const editAPIWithFile = (functionName, id, formData) => axios.put("/api/" + functionName + "/update/" + id, formData);
