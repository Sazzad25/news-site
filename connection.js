const loadPhones = () => {
    fetch(` https://openapi.programming-hero.com/api/news/category/01`)
        // const res = await fetch(url);
        // const data = await res.json();
        // displayPhones(data.data, dataLimit);
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

const displayPhones = categories => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // display 10 phones only
    // const showAll = document.getElementById('show-all');
    // if (dataLimit && phones.length > 10) {
    //     phones = phones.slice(0, 10);
    //     showAll.classList.remove('d-none');
    // }
    // else {
    //     showAll.classList.add('d-none');
    // }

    //display no phones found
    const noPhone = document.getElementById('no-found-messege');
    if (categories.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(category => {
        // const { author_key, title, author_name, publish_date } =
        //     category;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                            <img src="${category.thumbnail_url}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${category.title}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text">${category.author.name}<p>
                                    <p class="card-text">${category.publish_date}<p>
                                    <p class="card-text">${category.image_url}<p>
                                    <p class="card-text">${category.total_view}<p>
                                    <button id="show-details" onclick="loadPhoneDetails()" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"">Show Details</button>
                                    
                            </div>
                        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    // toggleSpinner(false);
}

const processSearch = () => {
    toggleSpinner(true);
    const searchField = document.getElementById('breaking-news');
    const category_id = searchField.innerText;
    loadPhones(category_id);
}

// document.getElementById('breaking-news').addEventListener('click', function () {
//     processSearch(10);
// })

// search input field enter key handler
document.getElementById('breaking-news').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

// const toggleSpinner = isLoading => {
//     const loaderSection = document.getElementById('loader');
//     if (isLoading) {
//         loaderSection.classList.remove('d-none');
//     }
//     else {
//         loaderSection.classList.add('d-none');
//     }
// }

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

const displayPhoneDetails = author => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = author.name;
    window.scrollTo(0, 40);
    const { name, birth_date, bio } = author;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <div>
    <h5 class="card-title">Author Name: ${name}</h5>
    <p class="card-text">Author DOB: ${birth_date ? birth_date : "N/a"}</p>
    <p class="card-text">Author Bio: ${bio ? bio : "N/a"}</p>
 </div>
    `
}

loadPhones();