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
    $(".post-trip-report-form").on("submit", function (event) {
        event.preventDefault();
        // {
        //     locationName: $("#post-form-title").val(),
        //     postalCode; "93000",
        //     content; "",
        //     isPublished: ""
        // }

        console.log("form submitted")
    })
}

function getTrips() {
    fetch("http://localhost:8080/trip-report")
        .then(response => {
            return response.json();
        })
        .then(trips => {
            trips.forEach(element => {
                $("#js-tripReports-container").append(
                    `<div class="js-user-contain-grid">
                        <h3 class="user-content-header">${element.locationName}</h3>
                        <div class="js-trip-container">
                            <p class="js-container-content">${element.content}</p>
                        </div>
                    </div>`)

            });
            console.log(trips)
        })
}

// on page load function should run
$(function () {
    hiddenElements();
    showElements();
    getTrips();
    submitTripForm();
});