// Weather Form Submission
document.getElementById('weatherForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  const country = document.getElementById('countryInput').value.trim();
  if (!country) {
      alert('Please enter a valid country name.');
      return;
  }

  const apiKey = 'c9a9b82c262d46c4aa7124406250802';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}&aqi=yes`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Country not found or API error');
          }
          return response.json();
      })
      .then(data => {
          const location = data.location;
          const current = data.current;

          const weatherHtml = `
              <h2>Weather in ${location.name}, ${location.country}</h2>
              <p><strong>Temperature:</strong> ${current.temp_c}°C / ${current.temp_f}°F</p>
              <p><strong>Condition:</strong> ${current.condition.text}</p>
              <p><strong>Humidity:</strong> ${current.humidity}%</p>
              <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
              <p><strong>Air Quality Index:</strong> ${current.air_quality['us-epa-index']}</p>
          `;
          document.getElementById('weatherResult').innerHTML = weatherHtml;
      })
      .catch(error => {
          document.getElementById('weatherResult').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      });
});

// News Form Submission
document.getElementById('newsForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  const query = document.getElementById('newsQuery').value.trim();
  const fromDate = document.getElementById('newsDate').value;
  const source = document.getElementById('newsSource').value.trim();

  if (!query || !fromDate) {
      alert('Please enter both a news topic and a date.');
      return;
  }

  const apiKey = 'e6de59ce59c6400eb2c32da20d4b22c0';
  let apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&sortBy=publishedAt&apiKey=${apiKey}`;

  if (source) {
      apiUrl += `&sources=${source}`;
  }

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('News not found or API error');
          }
          return response.json();
      })
      .then(data => {
          const articles = data.articles;
          let newsHtml = '';

          if (articles.length === 0) {
              newsHtml = '<p>No news articles found for the given query.</p>';
          } else {
              articles.forEach(article => {
                  newsHtml += `
                      <div class="news-article">
                          <h3>${article.title}</h3>
                          <p><strong>Published At:</strong> ${article.publishedAt}</p>
                          <p><strong>Source:</strong> ${article.source.name}</p>
                          <p><strong>Description:</strong> ${article.description}</p>
                          <a href="${article.url}" target="_blank">Read more</a>
                      </div>
                  `;
              });
          }

          document.getElementById('newsResult').innerHTML = newsHtml;
      })
      .catch(error => {
          document.getElementById('newsResult').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      });
});