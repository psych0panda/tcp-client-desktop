const { remote, ipcRenderer } = require('electron');
const { handleForm} = remote.require('./index');
const currentWindow = remote.getCurrentWindow();

const submitFormButton = document.querySelector("#ipcForm2");
const responseParagraph = document.getElementById('response')

submitFormButton.addEventListener("submit", function(event){
        event.preventDefault();   // stop the form from submitting
        let firstname = document.getElementById("firstname").value;
        handleForm(currentWindow, firstname)
});

ipcRenderer.on('form-received', function(event, args){
    responseParagraph.innerHTML = args
    /*
        you could choose to submit the form here after the main process completes
        and use this as a processing step
    */
});