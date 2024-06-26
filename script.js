// Base URL and token for the API
const apiUrl = "https://api.thecompaniesapi.com/v1/companies/by-name";
const token = "x2gpnWRl";
const newsApiUrl =
  "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=65ec7009ba6a4cf2875db4bf8f0f7404";

// Function to search for a company
async function searchCompany(event) {
  // Prevent default behavior if part of a form
  if (event) event.preventDefault();

  const companyName = document.getElementById("search-bar").value.trim();
  if (!companyName) {
    alert("Please enter a company name to search.");
    return;
  }

  const url = `${apiUrl}?name=${companyName}&token=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    displayCompanyInfo(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to display the company information
function displayCompanyInfo(data) {
  

  // Check if companies array exists and has at least one company
  if (!data.companies || data.companies.length === 0) {
    console.log("No company data available");
    return;
  }

  const company = data.companies[0]; // Extract the first company

  // Display Popular Tech Stack
  const techStackCard = document.getElementById("tech-stack-list");
  if (company.technologies) {
    techStackCard.innerHTML = company.technologies
      .map((tech) => `<li>${tech}</li>`)
      .join("");
  } else {
    techStackCard.innerHTML = "<li>No data available</li>";
  }

  // Display Market Competitors
  const competitorsCard = document.getElementById("competitors-list");
  if (company.companiesSimilar) {
    competitorsCard.innerHTML = company.companiesSimilar
      .map((comp) => `<li>${comp.domain}</li>`)
      .join("");
  } else {
    competitorsCard.innerHTML = "<li>No data available</li>";
  }

  // Display Alexa Card Information
  const alexaRankElement = document.getElementById("alexa-rank");
  const revenueElement = document.getElementById("alexa-revenue");
  const monthlyVisitorsElement = document.getElementById(
    "alexa-monthly-visitors"
  );
  const foundedYearElement = document.getElementById("alexa-founded-year");
  const phoneNumberElement = document.getElementById("alexa-phone-number");

  if (
    company.alexaRank ||
    company.revenue ||
    company.monthlyVisitors ||
    company.foundedYear ||
    company.phoneNumber
  ) {
    alexaRankElement.innerHTML = `<strong>Alexa Rank:</strong> ${
      company.alexaRank || "No data available"
    }`;
    revenueElement.innerHTML = `<strong>Revenue:</strong> ${
      company.revenue || "No data available"
    }`;
    monthlyVisitorsElement.innerHTML = `<strong>Monthly Visitors:</strong> ${
      company.monthlyVisitors || "No data available"
    }`;

    phoneNumberElement.innerHTML = `<strong>Phone Number:</strong> ${
      company.phoneNumber || "No data available"
    }`;
  } else {
    alexaRankElement.innerHTML = "<p>No data available</p>";
    revenueElement.innerHTML = "<p></p>";
    monthlyVisitorsElement.innerHTML = "<p></p>";
    phoneNumberElement.innerHTML = "<p></p>";
  }

  // Display Associated Industries
  const industriesCard = document.getElementById("industries-list");
  if (company.industries) {
    industriesCard.innerHTML = company.industries
      .map((ind) => `<li>${ind}</li>`)
      .join("");
  } else {
    industriesCard.innerHTML = "<li>No data available</li>";
  }

  // Display Technologies Used
  const technologiesCard = document.getElementById("technologies-list");
  if (company.technologyCategories) {
    technologiesCard.innerHTML = company.technologyCategories
      .map((tech) => `<li>${tech}</li>`)
      .join("");
  } else {
    technologiesCard.innerHTML = "<li>No data available</li>";
  }

  // Display Stock Information
  const stockExchange = document.getElementById("stock-exchange");
  const stockSymbol = document.getElementById("stock-symbol");
  if (company.stockExchange && company.stockSymbol) {
    stockExchange.innerHTML = `<p>Stock Exchange: ${company.stockExchange}</p>`;
    stockSymbol.innerHTML = `<p>Stock Symbol: ${company.stockSymbol}</p>`;
  } else {
    stockExchange.innerHTML = "<p>No data available</p>";
    stockSymbol.innerHTML = "<p></p>";
  }
}

// Function to fetch and display trending technology news
async function fetchTrendingNews() {
  try {
    const response = await fetch(newsApiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const newsData = await response.json();
    displayTrendingNews(newsData);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// Function to display trending technology news
function displayTrendingNews(newsData) {
  const newsContainer = document.getElementById("trending-news");
  if (newsData.articles && newsData.articles.length > 0) {
    const newsItems = newsData.articles
      .map(
        (article) => `
      <div class="news-item">
        <div class="news-text">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <p><small>By ${article.author} | ${new Date(
          article.publishedAt
        ).toLocaleDateString()}</small></p>
        </div>
        <img src="${article.urlToImage}" alt="${article.title}" />
      </div>
    `
      )
      .join("");
    newsContainer.innerHTML = newsItems;
  } else {
    newsContainer.innerHTML = "<p>No news available</p>";
  }
}

//toggle button working
const toggle_btn = document.getElementById("checkbox");

toggle_btn.addEventListener("change", () => {
  if (toggle_btn.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById("about-link");
const contactLink = document.getElementById("contact-link");
const sections = document.querySelectorAll(".content");

homeLink.addEventListener('click', () => showSection('home'));
aboutLink.addEventListener("click", () => showSection("about"));
contactLink.addEventListener("click", () => showSection("contact"));

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}
document.getElementById('logo').addEventListener('click',()=>showSection('home'));

// Attach event listener to the search button
document
  .querySelector(".search-bar button")
  .addEventListener("click", searchCompany);

// Fetch and display trending news on page load
fetchTrendingNews();
