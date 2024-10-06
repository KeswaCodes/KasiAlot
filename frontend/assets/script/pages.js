// Function to handle routing based on hash in URL
function router() {
    const app = document.getElementById('pages');
    let route = window.location.hash.slice(1); // Remove '#' from URL hash
    app.innerHTML = getRouteContent(route);

    // Initialize event listeners after content is loaded
    const getLocationBtn = document.getElementById('getLocationBtn');
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', getLocation);
    }

    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();

    // Capture data from form fields
    const data = {
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
        reviewNature: document.getElementById("reviewNatureSelect") ? document.getElementById("reviewNatureSelect").value : "",
        userReview: document.getElementById("userReview") ? document.getElementById("userReview").value : "",
        concernCategory: document.getElementById("concernCategory") ? document.getElementById("concernCategory").value : "",
        userConcern: document.getElementById("userConcern") ? document.getElementById("userConcern").value : ""
    };

    try {
        const response = await fetch("http://localhost:5000/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Response from server:", result);
            alert("Form submitted successfully!");
        } else {
            console.error("Failed to submit form:", response.statusText);
            alert("Failed to submit form.");
        }
    } catch (error) {
        console.error("Error submitting data:", error);
        alert("Error submitting form.");
    }
}

// Function to return content for each route
function getRouteContent(route) {
    switch (route) {
        case 'review':
            return `
                <h1 class="text-3xl">Review</h1>
                <form class="flex max-w-96 flex-col border-solid rounded-lg">
                    <div class="flex justify-between py-3">
                        <label for="userArea">Area</label>
                        <button type="button" id="getLocationBtn">Get Location</button>
                        <input type="text" name="latitude" id="latitude" class="border-solid border-2 rounded-lg border-slate-950">
                        <input type="text" name="longitude" id="longitude" class="border-solid border-2 rounded-lg border-slate-950">
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
                <p>Hello username, let us know of any concerns troubling your area. Please make your concern as descriptive as you possibly can and also make sure an accurate location</p>
                <form class="flex max-w-96 flex-col border-solid rounded-lg">
                    <div class="flex justify-between py-3">
                        <label for="userArea">Area</label>
                        <button type="button" id="getLocationBtn">Get Location</button>
                        <input type="text" name="latitude" id="latitude" class="border-solid border-2 rounded-lg border-slate-950">
                        <input type="text" name="longitude" id="longitude" class="border-solid border-2 rounded-lg border-slate-950">
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

                    <div class="py-3">
                        <label for="image">Enter the image of your concern(optional)</label>
                        <input type="file" name="image" id="image" accept="image/png, image/jpeg">
                    </div>
                    <button type="submit" class="bg-emerald-500 rounded-lg p-2 text-base font-semibold text-white">Submit</button>
                </form>
            `;
        case "myTown":
            return `
                <h1>Home</h1>
                <p>Get updates about what is happening in your local area</p>
                <p>We just need to know your location</p>
                <form></form>
            `;
        default:
            return `
                <h1>Home</h1>
                <p>Welcome to Umphakathi Wethu! Explore our services and find out more.</p>
            `;
    }
}

// Initialize routing
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
