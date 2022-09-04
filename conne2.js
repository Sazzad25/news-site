const loadPhones = async () => {
    const url = `   https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    const noPhone = document.getElementById('no-found-messege');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                            <img src="${phone.thumbnail_url}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.title ? phone.title : "No title available"}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text">Author Name: ${phone.author.name ? phone.author.name : 'N/A'}<p>
                                    <p class="card-text">Published Date: ${phone.author.published_date ? phone.author.published_date : 'No date available'}<p>
                                    
                                    <p class="card-text">Total View: ${phone.total_view ? phone.total_view : 'No data available'}<p>
                                    <button id="author-info" onclick="loadPhoneDetails('${phone.category_id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"">Author Details</button>
                                    
                            </div>
                        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    toggleSpinner(false);
}

const processSearch = () => {
    toggleSpinner(true);
    const searchField = document.getElementById('all-category');
    const category_id = searchField.innerText;
    loadPhones(category_id);
}


document.getElementById('all-category').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('all-category').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async news_id => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('author-info');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Author: ${phone.author.name ? phone.author.name : 'N/A'}</p>
    <p>Total View: ${phone.total_view ? phone.total_view : 'No data available'}
    `
}