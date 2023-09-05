
function getInputValue() {
    // Get the input element by its id
    const textField = document.getElementById("myTextField");


    // Construct the URL with the variable's value
    const url = "/haeFestivaalinArtistit/" + encodeURIComponent(textField.value);

    // Redirect the user to the new URL
    window.location.href = url;
}

function getInputValue2() {
    // Get the input element by its id
    const textField = document.getElementById("teksti2");


    // Construct the URL with the variable's value
    const url = "/haeArtistinKaupungit/" + encodeURIComponent(textField.value);

    // Redirect the user to the new URL
    window.location.href = url;
}

function getInputValue3() {
    // Get the input element by its id
    const textField = document.getElementById("teksti3");


    // Construct the URL with the variable's value
    const url = "/haeFestivaalinKaupunki/" + encodeURIComponent(textField.value);

    // Redirect the user to the new URL
    window.location.href = url;
}

function getInputValue4() {
    // Get the input element by its id
    const textField = document.getElementById("teksti4");


    // Construct the URL with the variable's value
    const url = "/haeArtistinFestivaalit/" + encodeURIComponent(textField.value);

    // Redirect the user to the new URL
    window.location.href = url; // :)
}
