// Function to handle routing based on hash in URL
function router() {
    const app = document.getElementById('pages');
    let route = window.location.hash.slice(1); // Remove '#' from URL hash
    app.innerHTML = getRouteContent(route);
    attachFormListeners(); // Attach listeners whenever the content changes
}

// Function to return content for each route
function getRouteContent(route) {
    switch (route) {
        case 'review':
            return `
                <h1 class="text-3xl">Review</h1>
                <form id="reviewForm" class="flex max-w-96 flex-col border-solid rounded-lg">
                    <div class="flex justify-between py-3">
                        <label for="userArea">Area</label>
                        <input type="text" name="userArea" id="userArea" class="border-solid border-2 rounded-lg border-slate-950">
                    </div>
                    <select name="reviewNature" id="reviewNatureSelect" class="py-3">
                        <option value="" selected>Select nature of review</option>
                        <option value="compliment">Compliment</option>
                        <option value="complain">Complain</option>
                    </select>
                    <div class="py-3">
                        <label for="userReview">Write your review here.</label>
                        <textarea name="userReview" id="userReview" maxlength="240" placeholder="Write your review here. Please limit to 240 characters" class="w-full h-20"></textarea>
                    </div>
                    <button type="submit" class="bg-emerald-500 rounded-lg p-2 text-base font-semibold text-white">Submit Review</button>
                </form>
            `;
        case 'concern':
            return `
                <h1 class="text-3xl">Concern</h1>
                <form id="concernForm" class="flex max-w-96 flex-col border-solid rounded-lg">
                    <div class="py-3">
                        <label for="userArea">Area</label>
                        <input type="text" name="userArea" id="userArea">
                    </div>
                    <select name="concernCategory" id="concernCategory" class="py-3">
                        <option value="" selected>Choose concern category</option>
                        <option value="Road and Transportation">Road and Transportation</option>
                        <option value="electricity">Electricity</option>
                        <option value="water">Water</option>
                        <option value="crime">Crime</option>
                        <option value="service delivery">Service Delivery</option>
                    </select>
                    <div class="py-3">
                        <label for="userConcern">Write your concern here.</label>
                        <textarea name="userConcern" id="userConcern" maxlength="240" placeholder="Write your concern here. Please limit to 240 characters." class="w-full h-20"></textarea>
                    </div>
                    <button type="submit" class="bg-emerald-500 rounded-lg p-2 text-base font-semibold text-white">Submit</button>
                </form>
            `;
        case "myTown":
            return `
                <h1>My Town</h1>
                <p>Get updates about what is happening in your local area</p>
                <form></form>
            `;
        default:
            return `
                <h1>Home</h1>
                <p>Welcome to KasiAlot! Explore our services and find out more.</p>
            `;
    }
}

// Function to attach form listeners
function attachFormListeners() {
    const reviewForm = document.getElementById('reviewForm');
    const concernForm = document.getElementById('concernForm');

    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }

    if (concernForm) {
        concernForm.addEventListener('submit', handleConcernSubmit);
    }
}

// Handle review form submission
function handleReviewSubmit(event) {
    event.preventDefault();

    const reviewData = {
        userArea: document.getElementById('userArea').value,
        reviewNature: document.getElementById('reviewNatureSelect').value,
        userReview: document.getElementById('userReview').value,
    };

    fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Review submitted successfully!');
            window.location.hash = ''; // Clear the hash to reset the page
        }
    })
    .catch(error => console.error('Error:', error));
}

function handleConcernSubmit(event) {
    event.preventDefault();

    const concernData = {
        userArea: document.getElementById('userArea').value,
        concernCategory: document.getElementById('concernCategory').value,
        userConcern: document.getElementById('userConcern').value,
    };

    console.log(concernData);


    fetch('http://localhost:3000/concerns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(concernData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Concern submitted successfully!');
            window.location.hash = ''; // Clear the hash to reset the page
        }
    })
    .catch(error => console.error('Error:', error));
}

// Initialize routing
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
