const mockVentures = {
    "suggestedVentures": [
        {
            "id": "1111111",
            "locationTitle": "la super park",
            "address": {
                "street": "123 nonReal Ln",
                "city": "Los Angeles",
                "description": "California",
                "zipCode": 90001,
            },
            "text": "best park in la",
            "visted": true,
        },
        {
            "id": " ",
            "locationTitle": "best foods",
            "address": {
                "street": "123 nonReal Ln",
                "city": "Los Angeles",
                "description": "California",
                "zipCode": 90001,
            },
            "description": "best food in town",
            "visted": true,
        },
        {
            "id": "3333333",
            "locationTitle": "la super park",
            "address": {
                "street": "123 nonReal Ln",
                "city": "Los Angeles",
                "description": "California",
                "zipCode": 90001,
            },
            "text": "best park in la",
            "visted": true,
        },
    ]
};

function getSuggestedVentures(ventures){
    setTimeout(() => { 
        ventures(mockVentures) 
    });
};

// function stays same when dealing with real API
function displaySuggestedVentures(data){
    for (let index in data.suggestedVentures) {
        $(body).append(
            '<p>' + data.suggestedVentures[index].text + '<p>');
    }
};

// function stays same when dealing with real API
function getAndDisplaySuggestedVentures() {
    getSuggestedVentures(displaySuggestedVentures);
};

// on page load function should run
$(function() {
    getAndDisplaySuggestedVentures();
});