/*  Project 01_11_04

    Author: Mario Sandoval
    Date:   09/05/2018

    Filename: script.js
*/

"use strict";

// global variables 

var httpRequest = false;
var countrySel;

// the getRequestObject function containing a try and catch structure to create an XHR object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        document.getElementById("csset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false);
        } else if (zip.attchEvent) {
            zip.detachEvent("onkeyup", checkInput);
        }
        return false;
    }
    return httpRequest;

}
// function to implement the radio buttons
function checkButtons() {
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
    if(germany.checked || us.checked) {
        document.getElementById("zipset").style.visibility = "visible";
        if(germany.checked){
            countrySel = "de";
        }
        else {
            countrySel = "us";
        }
    }
}
// the checkinput function for a test 
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation()
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}

// the get location function 
function getLocation() {
    // code to call the function getreauestobject to the new XHR object
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/us/" + countrySel + "/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

// function to parse the text
function displayData(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}
// event listeners for the radio buttons on the click event
var germany = document.getElementById("germany");
var us = document.getElementById("us");
if(us.addEventListener) {
    germany.addEventListener("click", checkButtons, false);
    us.addEventListener("onclick", checkButtons, false);
}
else if(us.attachEvent) {
    germany.attchEvent("onclick", checkButtons);
    us.attachEvent("onclick", checkButtons);
}


// event handler for the Postal code field 
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}