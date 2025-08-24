const apiKey = "26d3f48"; 

async function searchMovie() {
  const movieName = document.getElementById("movieInput").value.trim();
  const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

  if (!movieName) {
    document.getElementById("movieResult").innerHTML = `<p id="error-message">Please enter a movie name.</p>`;
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
  document.getElementById("movieResult").innerHTML = `
    <div class="movie-card">
      <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200x300"}" alt="Poster">
      <div class="movie-info">
        <h2>${data.Title} <span>(${data.Year})</span></h2>
        <p><strong>⭐ ${data.imdbRating}</strong> • ${data.Genre}</p>
        <p>${data.Plot}</p>
        <p><small>🎬 ${data.Director}</small></p>
        <p><small>👥 ${data.Actors}</small></p>
        <p><small>🌐 ${data.Language}</small></p>
      </div>
    </div>
  `;
}
    else {
      document.getElementById("movieResult").innerHTML = `<p id="error-message">❌ Movie not found!</p>`;

    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    document.getElementById("movieResult").innerHTML = `<p id="error-message">⚠️ Something went wrong. Please try again later.</p>`;

  }
}

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});


// Trigger search on pressing Enter
document.getElementById("movieInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
  
});

// 🎤 Voice Search
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onstart = () => {
    document.getElementById("micBtn").classList.add("listening");
  };

  recognition.onend = () => {
    document.getElementById("micBtn").classList.remove("listening");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("movieInput").value = transcript;
    searchMovie();
  };
}

function startVoiceSearch() {
  if (recognition) {
    recognition.start();
  } else {
    alert("Voice recognition not supported in this browser.");
  }
}

