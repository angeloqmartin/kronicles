"use strict";

function hidePostForm() {
    $(".post-trip-report-form").hide();
}

function hiddenElements() {
    hidePostForm();
}

function showElements() {
    $(".post-btn").on("click", function() {
        $(".post-trip-report-form").show();
    })
};

function closePostForm() {
    $(".close-trip-report-form-btn").on("click", function() {
        hidePostForm();
    })
}

const mockVentures = {
    "suggestedVentures": [
        {
            "id": "1111111",
            "locationTitle": "la super park",
            "text": "best park in la",
            "visted": true,
            "address": {
                "street": "123 nonReal Ln",
                "city": "Los Angeles",
                "description": "California",
                "zipCode": 90001,
            },
        },
        {
            "id": " ",
            "locationTitle": "best foods",
            "text": "best park in la",
            "visted": true,
            "address": {
                "street": "123 nonReal Ln",
                "city": "Los Angeles",
                "description": "California",
                "zipCode": 90001,
            },
        },
        {
            "id": "3333333",
            "locationTitle": "la super park",
            "text": "best park in la",
            "visted": true,
            "address": {
                "street": "123 nonReal Ln",
                "city": "Los Angeles",
                "description": "California",
                "zipCode": 90001,
            },
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
        $("#js-tripReports-container").append(
        `<div class="js-user-contain-grid">
        <h3 class="user-content-header">${data.suggestedVentures[index].locationTitle}</h3>
        <div class="js-trip-container">
        <p class="js-container-content">${data.suggestedVentures[index].text}</p>
        </div>
        </div>`
        )
    };
};

// function stays same when dealing with real API
function getAndDisplaySuggestedVentures() {
    getSuggestedVentures(displaySuggestedVentures);
};

// on page load function should run
$(function() {
    hiddenElements();
    showElements();
    getAndDisplaySuggestedVentures();
});