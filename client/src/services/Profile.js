export default {
    getUser: (id) => {
        return fetch('/user/profile=' + id).then(res => {
                return res.json().then(data => data)
            })
    },
    
    updateUser: (body) => {
        return fetch('/user/profile', {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => data)
    },

    getRoles: (id) => {
        return fetch('/user/roles/profile=' + id).then(res => {
                return res.json().then(data => data)
            })
    },

    addRole: (body) =>{
        return fetch('/user/roles', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => data)
    },


    getAudio: (id) => {
        return fetch('/user/audios/profile=' + id).then(res => {
                return res.json().then(data => data)
            })
    },

    addAudio: (body) =>{
        return fetch('/user/audios', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => data)
    },

    getVideo: (id) => {
        return fetch('/user/videos/profile=' + id).then(res => {
                return res.json().then(data => data)
            })
    },

    addVideo: (body) =>{
        return fetch('/user/videos', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => data)
    },

    simpleSearch: (search) => {
        return fetch('/user/simplesearch=' + search).then(res => {

            return res.json().then(data => data)
        })
    },
    
    advancedSearch: (search) => {
        return fetch('/user/advancedsearch=' + search).then(res => {
            return res.json().then(data => data)
        })
    }
}