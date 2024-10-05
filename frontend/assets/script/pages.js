// Function to handle routing based on hash in URL
function router() {
    const app = document.getElementById('pages');
    let route = window.location.hash.slice(1); // Remove '#' from URL hash
    app.innerHTML = getRouteContent(route);
}
  

// Function to return content for each route
function getRouteContent(route) {
    switch (route) {
      case 'review':
        return `
            <h1>Review</h1>
            <form>
                <div>
                    <label for="userArea">Area</label>
                    <input type="text" name="userArea" id="userArea">
                </div>
                <select name="reviewNature" id="reviewNatureSelect">
                    <option value="" selected>Select nature of review</option>
                    <option value="compliment" id="reviewNature">Compliment</option>
                    <option value="complain" id="reviewNature">Complain</option>
                </select>
                
                <div>
                    <label for="userReview">Write your review here.</p>
                    <textarea name="userReview" id="userReview" maxlength="240" placeholder="Write your review here. Please keep it at 240 words."></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
        `;
      case 'concern':
        return `
          <h1>Concern</h1>
          <p>The concerns page allows you to let us know of any concerns troubling your area</p>
          <form>
        <div>
            <label for="userArea">Area</label>
            <input type="text" name="userArea" id="userArea">
        </div>
        <select name="concernCategory" id="concernCategory">
            <option value="" selected>Choose concern category</option>
            <option value="road issues" id="concernCategory">Road Issues</option>
            <option value="electricity" id="concernCategory">Electricity</option>
            <option value="water" id="concernCategory">Water</option>
            <option value="crime" id="concernCategory">Crime</option>
        </select>
        
        <div>
            <label for="userConcern">Write your concern here.</p>
            <textarea name="userConcern" id="userConcern" maxlength="240" placeholder="Write your concern here. Please keep it at 240 words."></textarea>
        </div>

        <div>
            <label for="image">Enter input of your concern(optional)</p>
            <input type="file" name="image" id="image">
        </div>
        <button type="submit">Submit</button>
    </form>
        `;
      default:
        return `
          <h1>Home</h1>
          <p>Welcome to KasiAlot! Explore our services and find out more.</p>
        `;
    }
  }
  
  // Initialize routing
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);