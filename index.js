const apiKey = 'mYJNoeMy9XyXXEVzkgIpvJBA8o4Doema3pclLWan';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function createURLReadyQuery(params) {
  const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`);
  console.log(queryParams);
  return queryParams.join('&');
}


//stateCode=NY&stateCode=FL&stateCode=NJ&stateCode=
// function formatStateCode(rawStateCodeArray) {
//   const formattedStateCode = rawStateCodeArray.reduce(function(formattedStateCodeArray, state) {
//       return formattedStateCodeArray + `&stateCode=${state}`;
//   });
//   console.log(formattedStateCode);
//   return formattedStateCode;
// }


function createURL(stateCode, maxResults) {
  //const formattedStateCode = formatStateCode(rawStateCodeArray);
  const params = {
    stateCode: stateCode,
    api_key: apiKey,
    limit: maxResults
  };
  const queryString = createURLReadyQuery(params);
  const url = `${searchURL}?${queryString}`;
  console.log(url);
  fetchData(url, maxResults);
}

function fetchData(url, maxResults) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Something went wrong: ${response.status}`);
    })
    .then(responseJson => templateEngine(responseJson, maxResults))
    .catch(err => {
      $('.js-search-results').text(`${err.message}`)
    });
}

function templateEngine(responseJson, maxResults) {
  for (let i = 0; i < maxResults; i++) {
    $('ul').append(`
    <li>
      <h2>${responseJson["data"][i]["name"]}</h2>
      <p><img src=${responseJson["data"][i]["images"][0]["url"]} alt=${responseJson["data"][i]["images"][0]["altText"]}></p>
      <a href="${responseJson["data"][i]["url"]}">Park URL</a>
      <p>${responseJson["data"][i]["addresses"][0]["city"]}, ${responseJson["data"][i]["addresses"][0]["stateCode"]}, ${responseJson["data"][i]["addresses"][0]["postalCode"]}</p>
      <p>${responseJson["data"][i]["description"]}</p>
    </li>
    `);
  }
}



function initSearchQuery() {
  $('form').submit(event => {
    event.preventDefault();
    $('ul').html('');
    const stateCode = $('.state-code').val();
    const rawStateCodeArray = stateCode.split(", ");
    const maxResults = $('.max-results').val();
    $('.state-code').val("");
    $('.max-results').val("");
    createURL(stateCode, maxResults);
  });
}

$(initSearchQuery);