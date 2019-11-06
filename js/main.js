
// Intit Speech Synth API
const synth = window.speechSynthesis;

// DOM El

  // DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');


// Init Voices array 

let voices = [];
const getVoices = () => {
     voices = synth.getVoices();
     voices.forEach(voice =>{
         const option = document.createElement('option');
         // Filling the option with voice and language 
          option.textContent = voice.name + '(' + voice.lang + ')';

          //  set option attributes
          option.setAttribute('data-lang', voice.lang);
          option.setAttribute('data-name', voice.name);
          voiceSelect.appendChild(option); 
     })    
}
 getVoices();

 if (synth.onvoiceschanged !== undefined){
      synth.onvoiceschanged = getVoices;
 }
 // @  Speack Functionalities

 const speak = () =>{
   // Add Background Animation 
       //  Check aleary is speaking 
       if (synth.speaking) {
             console.error("Already Speaking !");
             return;
       }
         if(textInput.value !== ''){
            gifWave();
           const speakText = new SpeechSynthesisUtterance(textInput.value);
           // Speak End 
           speakText.onend = e =>{
               body.style.background = "#141414";
               console.log("Done Speaking !!");
           }
           //  Speak error 

           speakText.onerror = e =>{
               console.error("Something went wrong !!!")
           }
           //  Selected Voice 
           const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
            'data-name'
          );

           // Loop through voices 

           voices.forEach(voice =>{
             if (voice.name === selectedVoice){
                 speakText.voice = voice;
             }
           });

           // Seting pitch and rate 
           speakText.rate = rate.value;
           speakText.pitch = pitch.value;
           synth.speak(speakText);
         }
 }

  const gifWave = () =>{
    body.style.background = '#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.backgroundSize = '100% 100%'
  }

 // Event Listenners

 // Text Form 

 textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur(); 
 });

 // @ Rate value change 

 rate.addEventListener('change', e => rateValue.textContent= rate.value);

  // @ Pitch value change 

  pitch.addEventListener('change', e => pitchValue.textContent= pitch.value);

  // @ Voice Select change .

  voiceSelect.addEventListener('change', e=> speak());