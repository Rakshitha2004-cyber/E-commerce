const searchInput = document.getElementById('search-input');
const autocompleteSuggestions = document.getElementById('autocomplete-suggestions');

// Debounce function to limit API calls
let debounceTimer;
const debounce = (callback, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, delay);
};

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();

  if (query.length > 2) {
    debounce(async () => {
      try {
        const response = await fetch(`/api/autocomplete?q=${query}`);
        const suggestions = await response.json();

        // Clear previous suggestions
        autocompleteSuggestions.innerHTML = '';

        // Show new suggestions
        suggestions.forEach((suggestion) => {
          const suggestionElement = document.createElement('div');
          suggestionElement.textContent = suggestion;
          suggestionElement.classList.add('suggestion-item');
          
          // Click event to select suggestion
          suggestionElement.addEventListener('click', () => {
            searchInput.value = suggestion;
            autocompleteSuggestions.innerHTML = ''; // Hide suggestions
          });


          autocompleteSuggestions.appendChild(suggestionElement);
        });
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    }, 300); // 300ms debounce delay
  } else {
    autocompleteSuggestions.innerHTML = ''; // Hide suggestions if query is too short
  }
});

const stars = document.querySelectorAll(".star");
const ratingValue = document.getElementById("rating-value");

stars.forEach((star) => {
    star.addEventListener("click", function () {
        let value = this.getAttribute("data-value");
        ratingValue.innerText = value;

        stars.forEach((s) => s.classList.remove("selected"));
        for (let i = 0; i < value; i++) {
            stars[i].classList.add("selected");
        }
    });
});