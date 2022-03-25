const baseUrl = process.env.REACT_APP_API_URL

async function postApi(route, formData, token='') {
    let response_status = 400
    return fetch(
        baseUrl + route,
        {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Authorization': token ? `JWT ${ token }` : '',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        }
    )
    .then(response => {
        response_status = response.status
        return response.json()
    })
    .then(data => {
        return {data, response_status}
    })
}


async function putApi(route, formData, token='') {
    let response_status = 400
    return fetch(
        baseUrl + route,
        {
            credentials: 'same-origin',
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Authorization': token ? `JWT ${ token }` : '',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        }
    )
    .then(response => {
        response_status = response.status
        return response.json()
    })
    .then(data => {
        return {data, response_status}
    })
}


async function getApi(route, token='') {
    let response_status = 400
    return fetch(
        baseUrl + route,
        {
            headers: new Headers({
                'Authorization': token ? `JWT ${ token }` : '',
            })
        }
    )
    .then(response => {
        response_status = response.status
        return response.json()
    })
    .then(data => {
        return {data, response_status}
    })}


async function deleteApi(route, token='') {
    let response_status = 400
    return fetch(
        baseUrl + route,
        {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': token ? `JWT ${ token }` : '',
            })
        }
    )
    .then(response => {
        response_status = response.status
        return {data: response, response_status }
    })

}

export { getApi, postApi, putApi, deleteApi }