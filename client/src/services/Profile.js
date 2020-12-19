export default {
    getUser: (id) => {
        return fetch('/user/profile=' + id).then(res => {
                return res.json().then(data => data)
            })
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