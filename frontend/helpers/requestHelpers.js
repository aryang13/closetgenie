import { auth } from '../firebase/firebase.js';

const url = "http://206.12.160.1:8080";

const postRequest = async (path, body) => {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${url}/${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        
    });

    if(!response.ok) throw new Error(response.statusText);

    return await response.json();
};

const getRequest = async (path) => {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${url}/${path}`, {
        method: "GET",
        headers: {
            'authorization': `Bearer ${token}`
        }
    });
    if(!response.ok) throw new Error(response.statusText);
    
    return await response.json();
};

const deleteRequest = async (path) => {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${url}/${path}`, {
        method: "DELETE",
        headers: {
            'authorization': `Bearer ${token}`
        }
    });

    if(!response.ok) throw new Error(response.statusText);
};

const patchRequest = async (path, body) => {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`${url}/${path}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok) throw new Error(response.statusText);
};

const createUser = async (email, password) => {
    body = {email: email, password: password}
    const response = await fetch(`${url}/user`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    if(!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
}

export { postRequest, getRequest, deleteRequest, patchRequest, createUser };