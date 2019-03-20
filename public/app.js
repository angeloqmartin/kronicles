"use strict";

const apiURL = ""
let STORE = {
    allTrips: [],
    trips: []
}

function hiddenElements() {
    hidePostForm();
    closePostFormBtn();
    hideRegisterForm();
    closeRegisterForm();
    hideErrModel();
}

function showElements() {
    showPostForm();
    openRegisterForm();
};

function hideErrModel() {
    $(".err-modal").hide();
    clearErrModal();
}

function hideErrOnWindowClick() {
    $(window).click(function (e) {
        hideErrModel();
    })
}

function hideLandingPage() {
    $(".landing").hide();
}

function clearErrModal() {
    $("#myModal").empty();
}

function closeErrMessage() {
    $(".close").on("click", function () {
        hideErrModel();
    })
}

function reloadPage() {
    location.reload();
}

function showErrModal() {
    $(".err-modal").show()
}

function showPostForm() {
    $(".post-btn").on("click", function () {
        $(".post-trip-report-form").show();
        $("#post-form-id").val("");
        $("#post-form-title").val("");
        $("#post-form-content").val("");
        $("#post-form-postal-code").val("");
    })
}

function hidePostForm() {
    $(".post-trip-report-form").hide();
}

function showfindTripsPage() {
    $(".findTripsPage").removeClass("hide")
}

function hideRegisterForm() {
    $(".res-Modal").hide();
}

function showRegisterForm() {
    $(".res-Modal").show();
}

function openRegisterForm() {
    $(".resBtn").on("click", function (e) {
        e.preventDefault();
        $("#res-username-input").val("");
        $("#res-password-input").val("");
        showRegisterForm();
    })
}

function closeRegisterForm() {
    $(".close-res-form").on("click", function (e) {
        e.preventDefault();
        hideRegisterForm();
    })
}

function useGuestAccount() {
    const username = "anonymous"
    const password = "pa$$w0rd"
    $(".guest-login").on("click", function () {
        $("#username-input").val(username);
        $("#password-input").val(password);
    })
}

function loginHandler() {
    $(".login-form").on("submit", function (e) {
        e.preventDefault();
        const loggedInUser = $("#username-input").val();
        const user = {
            username: $("#username-input").val(),
            password: $("#password-input").val()
        }
        loginCall(user);
    })
}

function loginCall(user) {
    fetch(`/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(newUser => {
            if (newUser.message) {
                $(".login-section").append(newUser.message)
            } else {
                localStorage.username = user.username;
                localStorage.authToken = newUser.authToken;
                welcomeLoggedInUser(user.username);
                hideRegisterForm();
                hideLandingPage();
                showfindTripsPage();
                getTrips()
                history.pushState("", document.title, window.location.pathname);
            }
        })
        .catch(err => {
            $(".err-modal").append(
                `<div class="err-modal-content">
                <span class="close">&times;</span>
                <p>The username and or password you entered is incorrect.<br><br>Please try again.</p>
                </div>`
            )
            showErrModal();
            closeErrMessage();
        })
}

function welcomeMessage(user) {
    $("#js-tripReports-container").append(
        `<div class="js-admin-contain-grid">
            <h3 class="user-content-header">Welcome</h3>
            <div class="js-admin-container">
                <p class="js-container-content">Hello, ${user}<br><br>
                Welcome to Kronicles where you can view posts from others and plan your next trip. 
                Don’t see any post in your area yet… Be the first to make a suggestion or 
                just share your experience with others of your favorite places.<br><br>Enjoy!</p>
            </div>
        </div>`
    )
}

function welcomeLoggedInUser(loggedInUser) {
    $(".nav-sigin").hide()
    $(".js-user-welcome").append(
        `<li>Welcome, ${loggedInUser}!</li>
        <li><button class="logout-btn">logout</button></li>`
    )
};

function logOut() {
    $(".js-user-welcome").on("click", "button", function () {
        localStorage.clear();
        reloadPage();
    })
};

function closePostFormBtn() {
    $(".close-trip-report-form-btn").on("click", function (e) {
        e.preventDefault();
        hidePostForm();
    })
}

function emptyPostForm() {
    $("#post-form-title").empty();
    $("#post-form-content").empty()
}

function resUser() {
    $(".res-form").on("submit", function (e) {
        e.preventDefault();
        const user = {
            username: $("#res-username-input").val(),
            password: $("#res-password-input").val()
        }
        fetch(`/users`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(newUser => {
                if (newUser.message) {
                    hideRegisterForm();
                    $(".err-modal").append(
                        `<div class="err-modal-content">
                        <span class="close">&times;</span>
                        <p>Sorry, ${newUser.message}.<br><br>Please try a different username.</p>
                        </div>`
                    )
                    showErrModal();
                    closeErrMessage();
                } else {
                    loginCall(user);
                    welcomeLoggedInUser(user.username);
                    welcomeMessage(user.username)
                }
            })
    })
}

function findTripReports() {
    $(".seach-trip-report").on("submit", function (e) {
        e.preventDefault();
        const category = $("#selected-categories").val();
        const location = $("#selected-location").val();
        STORE.trips = STORE.allTrips.filter((trip) => {
            if (trip.category === category || category === "all") {
                if (!location || trip.postalCode === location) {
                    return true
                }
            }
            return false;
        })
        renderTrips();
    })
}

function submitTripForm() {
    $(".post-trip-report-form").on("submit", function (e) {
        e.preventDefault();
        hidePostForm();
        const tripReport = {
            title: $("#post-form-title").val(),
            postalCode: $("#post-form-postal-code").val(),
            content: $("#post-form-content").val(),
            category: $("#post-form-category").val(),
            isPublished: true
        }
        const id = $("#post-form-id").val();
        if (id) {
            tripReport.id = id;
            fetch(`/trip-report/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(tripReport),
                    headers: {
                        authorization: "bearer " + localStorage.authToken,
                        "content-type": "application/json"
                    }
                })
                .then(data => {
                    getTrips();
                })
        } else {
            fetch("/trip-report", {
                    method: "POST",
                    body: JSON.stringify(tripReport),
                    headers: {
                        authorization: "bearer " + localStorage.authToken,
                        "content-type": "application/json"
                    }
                })
                .then(data => {
                    getTrips();
                })
        }
    })
    emptyPostForm();
}

function getTrips() {
    fetch("/trip-report", {
            method: "GET",
            headers: {
                authorization: "bearer " + localStorage.authToken,
                "content-type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(trips => {
            STORE.trips = trips;
            STORE.allTrips = trips;
            renderTrips()
        })
}

function renderTrips() {
    $("#js-tripReports-container").empty();
    STORE.trips.forEach(element => {
        let html = `<div class="js-user-contain-grid">
        <h3 class="user-content-header">${element.title}</h3>
        <div class="js-trip-container">
            <p class="js-container-content">${element.content}</p>
            <p class="js-container-category">${element.category}</p>
        </div>`;
        if (element.userId.username == localStorage.username) {
            html = html + `<button class="delete-trip-report-btn" data-id="${element._id}">Delete</button>
            <button class="edit-trip-report-btn" data-id="${element._id}">Edit</button>`
        }
        html = html + `</div>`
        $("#js-tripReports-container").append(
            html
        )
    });
}

function deleteTripsReportBtn() {
    $("#js-tripReports-container").on("click", ".delete-trip-report-btn", function (event) {
        const id = $(event.target).data("id")
        fetch(`/trip-report/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: "bearer " + localStorage.authToken,
                    "content-type": "application/json"
                },
            })
            .then(() => {
                getTrips();
            })
    })
};

function editTripReportformBtn() {
    $("#js-tripReports-container").on("click", ".edit-trip-report-btn", function (e) {
        e.preventDefault();
        $(".post-trip-report-form").show();
        const id = $(event.target).data("id")
        const tripFound = STORE.trips.find((trip) => trip._id == id);
        $("#post-form-title").val(tripFound.title)
        $("#post-form-category").val(tripFound.category)
        $("#post-form-postal-code").val(tripFound.postalCode)
        $("#post-form-content").val(tripFound.content)
        $("#post-form-id").val(tripFound._id)
    })
}

function getLoggedUserAuth() {
    if (localStorage.authToken) {
        welcomeLoggedInUser(localStorage.username);
        hideRegisterForm();
        hideLandingPage();
        showfindTripsPage();
    }
}
// on page load function should run
$(function () {
    getLoggedUserAuth();
    hiddenElements();
    showElements();
    getTrips();
    submitTripForm();
    deleteTripsReportBtn();
    editTripReportformBtn();
    useGuestAccount();
    loginHandler();
    resUser();
    findTripReports();
    logOut();
    hideErrOnWindowClick();
});