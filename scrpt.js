// Function to make an API call
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the response as JSON
        const data = await response.json();
        return data; // Return the data for further processing
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Usage example
const apiUrl = 'https://api.example.com/data'; // Replace with your API endpoint
fetchData(apiUrl).then(data => {
    if (data) {
        console.log('Fetched data:', data);
        // You can process the data here
    }
});

const response = [
    { id: 1, message: "I recently used the ticketing system developed by our team, and I must say, it has transformed the way we handle service requests! The interface is intuitive, making it easy for both staff and users to navigate. The ability to categorize tickets and assign them to the right team members has streamlined our workflow significantly. I also appreciate the notifications and updates; they keep everyone in the loop without overwhelming us. Overall, this system has greatly improved our service delivery." },
    { id: 2, message: "Our team implemented the new ticketing system last month, and it has made a noticeable difference in our operations. The ticket prioritization feature helps us address urgent requests faster, which our clients appreciate. However, I noticed that the search function could be improved; sometimes it takes longer to find specific tickets than I'd like. Despite this minor issue, the overall efficiency has increased, and we can now handle a higher volume of tickets with ease." },
    { id: 3, message: "While the new ticketing system is a step in the right direction, there are still some areas that need improvement. The setup process was a bit cumbersome, and we encountered some bugs that required troubleshooting. Once we got past those hurdles, the system worked well for tracking tickets and communicating with clients. I believe with a few updates and enhancements, this system could become a top-tier solution for our organization." },
    // Add more objects as needed
];

// Function to create accordion items
function createAccordionItems(data) {
    const accordionContainer = document.getElementById('accordionExample');

    data.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        accordionItem.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    Ticket Number<span id="ticketNo"> #${item.id}</span>
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    ${item.message}
                </div>
            </div>
        `;

        accordionContainer.appendChild(accordionItem);
    });
}

// Call the function with the response data
createAccordionItems(response);

