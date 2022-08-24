
// canvas setup
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
window.addEventListener('resize',()=>{
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
})

const recordButton = document.querySelector(".record");
const stopButton = document.querySelector(".stop");
const infoButton = document.querySelector(".info");

recordButton.onclick = startRecording
stopButton.onclick = stopRecording
infoButton.onclick = displayInfo

var stopped = false;

function displayInfo(){
    let text = `
    This is a demo for audio signal processing.
    `
    softalert(text)
}



function stopRecording(){
    stopped = true;
    ctx.clearRect(0,0,canvas.width,canvas.height)
}


function startRecording(){
    stopped = false;
    
    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia ({video: false, audio: true})
        .then((stream) => {
            // Create a MediaStreamAudioSourceNode
            // Feed the HTMLMediaElement into it
            const audioCtx = new AudioContext();
            
            const source = audioCtx.createMediaStreamSource(stream);
            
            // Create a biquadfilter
            const biquadFilter = audioCtx.createBiquadFilter();
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.value = 1000;
            biquadFilter.gain.value = 1;
            source.connect(biquadFilter);

            // including analyser
            analyser = audioCtx.createAnalyser();
            source.connect(analyser)
            analyser.fftSize = 64;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            let barHeight; 
            
            const barWidth = canvas.width/bufferLength;

            
            function animate(){
                if(stopped === true){
                    audioCtx.suspend()
                    stream.getTracks()[0].stop();
                    disappearingMessage('Stopping recording',800);
                    return
                }
                requestAnimationFrame(animate)

                ctx.clearRect(0,0,canvas.width, canvas.height);
                analyser.getByteFrequencyData(dataArray);
                
                let x=0;
                
                for (let i = 0; i < bufferLength; i++) {
                    
                    barHeight = dataArray[i]
                    ctx.fillStyle = 'white'
                    ctx.fillRect(x,canvas.height - barHeight, barWidth, barHeight)  
                    x+= canvas.width/bufferLength              
                }
            }
            requestAnimationFrame(animate)
        })
        .catch((err) => {
            console.log(`The following gUM error occurred: ${err}`);
            disappearingMessage(`${err}`,2000)
        });
    } else {
        console.log('getUserMedia not supported on your browser!');
    }
}

// References:
// creating audio context ref: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Get_microphone_permission
// https://www.youtube.com/watch?v=VXWvfrmpapI

