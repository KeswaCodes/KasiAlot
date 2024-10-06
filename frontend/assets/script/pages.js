// Function to handle routing based on hash in URL
function router() {
    const app = document.getElementById('pages');
    let route = window.location.hash.slice(1); // Remove '#' from URL hash
    app.innerHTML = getRouteContent(route);

    // Initialize event listener for location button after content is loaded
    const getLocationBtn = document.getElementById('getLocationBtn');
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', getLocation);
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
                        <option value="compliment" id="reviewNature">Compliment</option>
                        <option value="complain" id="reviewNature">Complain</option>
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
                        <option value="Road and Transportation" id="concernCategory">Road and Transportaton</option>
                        <option value="electricity" id="concernCategory">Electricity</option>
                        <option value="water" id="concernCategory">Water</option>
                        <option value="crime" id="concernCategory">Crime</option>
                        <option value="service delivery" id="serviceDelivery">Service Delivery</option>
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

// Function to get user's location
function getLocation() {
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                latitudeInput.value = latitude;
                longitudeInput.value = longitude;
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Initialize routing
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
