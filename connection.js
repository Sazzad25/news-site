const loadPhones = async (category_id, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //display no phones found
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
                                <h5 class="card-title">${phone.title}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text">${phone.author.name}<p>
                                    <p class="card-text">${phone.author.published_date}<p>
                                    <p class="card-text">${phone.image_url}<p>
                                    <p class="card-text">${phone.total_view}<p>
                                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"">Show Details</button>
                                    
                            </div>
                        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('breaking-news');
    const category_id = searchField.innerText;
    loadPhones(category_id, dataLimit);
}

document.getElementById('breaking-news').addEventListener('click', function () {
    processSearch(10);
})

// search input field enter key handler
document.getElementById('breaking-news').addEventListener('keypress', function (e) {
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

// not the best way
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async news_id => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Realease Date Found'}</p>
    <p>Storage : ${phone.mainFeatures.storage}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}
    `
}

loadPhones('breaking-news');