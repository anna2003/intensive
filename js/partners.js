const renderItems = (data) => {
    data.forEach( item => console.log(item))
}

// fetch('./db/partners.json')
fetch('https://test-d09d8-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => console.log(error))