document.addEventListener('DOMContentLoaded', () => {
    const storyForm = document.getElementById('storyForm');
    const storyInput = document.getElementById('storyInput');
    const storyContainer = document.getElementById('storyContainer');
  
    // Function to fetch and display the full story
    const fetchStoryData = () => {
      fetch('/data')
        .then(response => response.json())
        .then(data => {
          storyContainer.innerHTML = ''; // Clear the container before appending new data
          data.forEach((storyPiece, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${storyPiece}`;
            storyContainer.appendChild(p);
          });
        })
        .catch(error => console.error('Error fetching story data:', error));
    };
  
    // Submit new story piece
    storyForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const storyPiece = storyInput.value;
  
      // Send the new story piece to the server via POST request
      fetch('/new-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storyPiece }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Log success message from the server
        storyInput.value = ''; // Clear the input field
        fetchStoryData(); // Refresh the story view
      })
      .catch(error => console.error('Error submitting story piece:', error));
    });
  
    // Fetch the current story when the page loads
    fetchStoryData();
  });
  