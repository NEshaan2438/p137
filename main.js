target = "";
results1 = "";
spotted = 0;

function setup() {
    canvas = createCanvas(620, 465);
    canvas.position(810, 265);
    
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(video, 0, 0, 620, 465);

    objectDetector.detect(video, gotResults);

    spotted = 0;

    for (let i = 0; i < results1.length; i++) {   
        if (results1[i].label == target) {
            rect(results1[i].x * 620/video.width, results1[i].y * 465/video.height, results1[i].width * 620/video.width, results1[i].height * 465/video.height);
            fill("black");
            text(results1[i].label + " " + Math.floor(results1[i].confidence * 100) + "%", results1[i].x * 620/video.width, results1[i].y * 465/video.height - 10);
            noFill();
            spotted = Number(spotted) + 1;
        }
    }
    if (spotted == 1) {
        document.getElementById("status").innerHTML = "searching... seeing " + spotted + " target...";
    } else {
        document.getElementById("status").innerHTML = "searching... seeing " + spotted + " targets...";
    }
}

function modelLoaded() {
    console.log("Model is loaded.")
}

function saveTarget() {
    target = document.getElementById("input1").value;
    console.log(target);
    if (target == "") {
        document.getElementById("status").innerHTML = "nothing to be looking for...";
    } else {
        document.getElementById("status").innerHTML = "searching... finding targets..."
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        results1 = results;
        console.log(results1);
    }
}