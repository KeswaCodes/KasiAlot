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
    { id: 1, message: "Thank you for all the hard work to keep our community safe and clean! We see the new parks and the street lights you’ve put up, and they make a big difference. Knowing our government cares makes us feel proud and happy to live here. Please keep up the great work—our neighborhood is becoming a better place every day!" },
    { id: 2, message: "Some people in our community feel left out because certain issues, like broken sidewalks and playgrounds, don’t get fixed. It’s hard for kids and families to enjoy these spaces when things are in bad shape. We hope the government will help more in areas that need a bit more care, so everyone can feel included and safe." },
    { id: 3, message: "We're so grateful for the government's effort in fixing our roads and making sure schools have what they need. It helps us all feel cared for and happy to see improvements that make our lives better. Thank you for listening to our needs and making positive changes. Please keep it up—we really appreciate it!" },
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

