export default {
    login: (user) => {
        return fetch('/user/signin', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data)
            } else {
                return { isAuthenticated: false, message: {messageBody: "Meeeeeeeeeeeeeeow", messageError: true},  user: { email: "", first_name: "", last_name: "" } }
            }
        })
    },
    register: (user) => {
        return fetch('/user/register', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => data);
    },
    logout: () => {
        return fetch('user/logout')
            .then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('user/authenticated')
            .then(res => {
                if (res.status !== 401) {
                    return res.json().then(data => data)
                } else {
                    return { isAuthenticated: false, message: { messageBody: "You do not have permission to access this page", messageError: true }, user: { email: "", first_name: "", last_name: "" } }
                }
            })
    }
}