import axios from "axios";

export const JpAxios = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000,
    timeoutErrorMessage: "زمان پاسخگویی بیشتر از 5 ثانیه طول کشید..."
})