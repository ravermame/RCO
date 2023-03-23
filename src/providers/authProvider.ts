import { AuthProvider } from "react-admin";

interface User {
    name: string;
    password: string
}

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: ({ name, password }: User) => {
        const users: User[] = getUsers()
        const user = users?.find((user: User) => user.name === name && user.password === password)
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            return Promise.resolve({ redirectTo: '/dashboard' });
        }
        return Promise.reject()
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("user");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: any) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("user");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        const user = localStorage.getItem("user")
        return user
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        let user = localStorage.getItem("user");
        if (user) {
            let role = JSON.parse(user).isAdmin
            return Promise.resolve(role ? "admin" : "user")
        }
        return Promise.resolve()
    },
    // get the user's profile
    getIdentity: () => {
        let user = localStorage.getItem("user");
        return user
            ? Promise.resolve(JSON.parse(user))
            : Promise.reject();
    },

};

const getUsers = () => {
    let allData: string | null = localStorage.getItem('ra-data-local-storage');
    if (allData) {
        const { users } = JSON.parse(allData);
        return users
    }
    return [];
}