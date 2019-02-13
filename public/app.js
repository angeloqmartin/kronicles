"use strict";

function hiddenElements() {
    hidePostForm();
    closePostFormBtn();
}

function showElements() {
    showPostForm()
};

function showPostForm() {
    $(".post-btn").on("click", function () {
        $(".post-trip-report-form").show();
    })
}

function hidePostForm() {
    $(".post-trip-report-form").hide();
}

function closePostFormBtn() {
    $(".close-trip-report-form-btn").on("click", function (e) {
        hidePostForm();
    })
}

function submitTripForm() {
    $(".post-trip-report-form").on("submit", function (e) {
        e.preventDefault();
        const tripReport = {
            locationName: $("#post-form-title").val(),
            postalCode: $("#js-post-form-location").val(),
            content: $("#js-post-form-content").val(),
            isPublished: true
        }
        fetch("http://localhost:8080/trip-report", {
            method: "post", 
            body: JSON.stringify(tripReport),
            headers: {
                "content-type": "application/json"
            }

        }) 
        .then(data => {
            getTrips();
        })
    })
}

function getTrips() {
    fetch("http://localhost:8080/trip-report")
        .then(response => {
            return response.json();
        })
        .then(trips => {
            $("#js-tripReports-container").empty();
            trips.forEach(element => {
                $("#js-tripReports-container").append(
                    `<div class="js-user-contain-grid">
                    <h3 class="user-content-header">${element.locationName}</h3>
                    <div class="js-trip-container">
                        <p class="js-container-content">${element.content}</p>
                    </div>
                    <button class="delete-trip-report-btn" data-id="${element._id}">Delete</button>
                    </div>`)
            });
        })
}

function deleteTripsReportBtn() {
    $("#js-tripReports-container").on("click", ".delete-trip-report-btn", function (event) {
        const id = $(event.target).data("id")
        fetch(`http://localhost:8080/trip-report/${id}`, {
            method: "delete"
        })
        .then( () => {
            getTrips();
        })    
    })
};




// on page load function should run
$(function () {
    hiddenElements();
    showElements();
    getTrips();
    submitTripForm();
    deleteTripsReportBtn();
});