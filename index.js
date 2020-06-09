const apiKey = 'mYJNoeMy9XyXXEVzkgIpvJBA8o4Doema3pclLWan';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function fetchData ()


function createURL (stateCode, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode,
        limit: maxResults
    }
}

function initSearch () {
    $('.park-query').submit(event => {
        event.preventDefault();
        const stateCode = $('.state-code').val();
        const stateCodeArray = stateCode.split(", ");
        const maxResults = $('.max-results').val();
        $('.state-code').val("");
        $('.max-results').val("");
        //function to create URL
        //function to fetch data
        //function to extract data
        //function to generate HTML
    })
}

$(initSearch)