// ! Code From: https://codepen.io/nfj525/pen/rVBaab?editors=1111

window.onload = function () {

    var audio = document.getElementById("audio");

    const play = () => {
        // audio.src = "https://stream-155.zeno.fm/umq9q5uuva5tv?zs=ygYTV6rDSHytPOL2EM9xmw";
        // audio.load();
        // audio.play();
    };

    const waveForm = () => {
        console.log("wave")
        if (audio) {
            audio.src = "https://stream-155.zeno.fm/umq9q5uuva5tv?zs=ygYTV6rDSHytPOL2EM9xmw";
            // audio.load();
            audio.play();

            var context = new AudioContext();
            var src = context.createMediaElementSource(audio);
            var analyser = context.createAnalyser();

            var canvas = document.getElementById("canvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var ctx = canvas.getContext("2d");

            src.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;

            var bufferLength = analyser.frequencyBinCount;
            console.log("bufferLength", bufferLength);

            var dataArray = new Uint8Array(bufferLength);

            var WIDTH = canvas.width;
            var HEIGHT = canvas.height;

            var barWidth = (WIDTH / bufferLength) * 2.5;
            var barHeight;
            var x = 0;

            function renderFrame() {
                requestAnimationFrame(renderFrame);

                x = 0;

                analyser.getByteFrequencyData(dataArray);

                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, WIDTH, HEIGHT);

                for (var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    var r = barHeight + (25 * (i / bufferLength));
                    var g = 250 * (i / bufferLength);
                    var b = 50;

                    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                    x += barWidth + 1;
                }
            }

            audio.play();
            renderFrame();
        }
    }

    play()
    setInterval(() => {
        waveForm()
    }, 1000);
};