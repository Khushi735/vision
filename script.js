// script.js
const cameraFrame = document.getElementById('camera-frame');
const googleSpeakButton = document.getElementById('google-speak-button');
const userSpeechElement = document.getElementById('user-speech');
const serverResponseElement = document.getElementById('server-response');

// Request access to camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        cameraFrame.srcObject = stream;
        cameraFrame.play();
    })
    .catch(error => {
        console.error('Error accessing camera and microphone:', error);
    });

// Add event listener to Google Speak button
googleSpeakButton.addEventListener('click', () => {
    // Create a new SpeechRecognition object
    const speechRecognition = new webkitSpeechRecognition();

    // Set the language and max results
    speechRecognition.lang = 'en-US';
    speechRecognition.maxResults = 10;

    // Set the event listener for the result
    speechRecognition.onresult = event => {
        const userSpeech = event.results[0][0].transcript;
        userSpeechElement.textContent = `User said: ${userSpeech}`;

        // Send the user's spoken input to the server
        fetch('/api/google-speak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ speech: userSpeech })
        })
        .then(response => response.json())
        .then(data => {
            serverResponseElement.textContent = `Server response: ${data.response}`;
        })
        .catch(error => {
            console.error('Error sending request to server:', error);
        });
    };

    // Start the speech recognition
    speechRecognition.start();
});