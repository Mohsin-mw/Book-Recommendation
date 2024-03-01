import {axiosClient} from "../apiClient";

type registerUser = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type logInUser = {
    email: string;
    password: string;
};

export async function RegisterUser(data: registerUser) {
    return await axiosClient().post("/signup/", {
        ...data,
    });
}

export async function LogInUser(data: logInUser) {
    return await axiosClient().post("/login/", {
        ...data,
    });
}