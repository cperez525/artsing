export default {
    uploadPicture: (data) => {
        return fetch('https://api.cloudinary.com/v1_1/esthete/image/upload', {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => data);
    }, 
    
    uploadVideo: (data) => {
        return fetch('https://api.cloudinary.com/v1_1/esthete/video/upload', {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => data);
    }
}