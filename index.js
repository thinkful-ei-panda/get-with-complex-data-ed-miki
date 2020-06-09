const apiKey = 'mYJNoeMy9XyXXEVzkgIpvJBA8o4Doema3pclLWan';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function createURL(stateCode, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = `${searchURL}?${queryString}`;
  fetchData(url, maxResults);
}

function fetchData(url, maxResults) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('hell naw');
    })
    .then(responseJson => templateGenerator(responseJson, maxResults))
}

function templateGenerator(responseJson, maxResults) {
  for (let i = 0; i < maxResults; i++) {
    $('ul').append(`
    <li>
      <h2>${responseJson["data"][i]["name"]}</h2>
      <a href="${responseJson["data"][i]["url"]}">Park URL</a>
      <p>${responseJson["data"][i]["directionsInfo"]}</p>
    </li>
    `);
  }
}

function renderNewPage() {
  $('ul').html('');
}

function initSearch() {
  $('.park-query').submit(event => {
    event.preventDefault();
    renderNewPage();

    const stateCode = $('.state-code').val();
    const stateCodeArray = stateCode.split(", ");
    const maxResults = $('.max-results').val();
    $('.state-code').val("");
    $('.max-results').val("");
    //function to create URL
    createURL(stateCode, maxResults);
    //function to fetch data
    //function to extract data
    //function to generate HTML
  })
}

$(initSearch);