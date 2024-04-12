const changeButton = document.querySelector('.change fourth');
const hotspotElement = document.querySelector('.change second');
const highElement = document.querySelector('.change third');
const hahaContainer = document.querySelector('haha');
const hotspotInput = document.getElementById('hotspotInput');
const highInput = document.getElementById('highInput');
const submitButton = document.getElementById('submitButton');
const boxes = document.querySelectorAll('.box');
const rightBox = document.querySelector('.right');
let previousClickedBox = null;

function updateRightBoxColor() {
    const hotspotThreshold = parseInt(hotspotElement.textContent.match(/\d+/)[0]) || 100; 
    const highThreshold = parseInt(highElement.textContent.match(/\d+/)[0]) || 90; 
    let color = 'green'; 
    if (previousClickedBox) {
        previousClickedBox.style.background = '#f5f5f5';
    }
    const temperatures = this.querySelectorAll('.temperature');
    temperatures.forEach(temp => {
        const temperature = parseInt(temp.textContent);
        if (temperature > hotspotThreshold) {
            color = 'red'; 
        } else if (temperature > highThreshold && color !== 'red') {
            color = 'yellow'; 
        }
    });
    this.style.background = color;
    rightBox.style.backgroundColor = color;
    previousClickedBox = this;
}

function updateThresholdTemperatures() {
    let hotspotTemp = hotspotInput.value;
    let highTemp = highInput.value;
    if (!isNaN(hotspotTemp) && !isNaN(highTemp)) {
        hotspotElement.textContent = `Hotspot above ${hotspotTemp} deg C`;
        highElement.textContent = `High above ${highTemp} deg C`;
        boxes.forEach(box => {
            if (box === previousClickedBox) {
                updateRightBoxColor.call(box);
            }
        });
        hahaContainer.style.visibility = 'hidden';  
        countAndLogBoxColors();
    } else {
        alert("Please enter valid temperatures.");
    }
}

function countAndLogBoxColors() {
    const boxColorsCount = countBoxColors();
    const redCount = boxColorsCount.red;
    const yellowCount = boxColorsCount.yellow;
    const greenCount = boxColorsCount.green;
    const totalBoxes = boxes.length;
    const dataDiv = document.querySelector('.data');
    dataDiv.children[2].textContent = `${redCount} Alert`;
    dataDiv.children[3].textContent = `${yellowCount} Warning`;
    dataDiv.children[4].textContent = `${greenCount} Normal`;
}

changeButton.addEventListener('click', function() {
    hahaContainer.style.visibility = 'visible';
});

submitButton.addEventListener('click', updateThresholdTemperatures);

boxes.forEach(box => {
    box.addEventListener('click', updateRightBoxColor);
});

window.addEventListener('load', function() {  
    countAndLogBoxColors();
});
updateRightBoxColor.call(boxes[0]); 

function getColor(temps) {
    const hotspotThreshold = parseInt(hotspotElement.textContent.match(/\d+/)[0]) || 100;;
    const highThreshold = parseInt(highElement.textContent.match(/\d+/)[0]) || 90; ;
    const [temp1, temp2, temp3] = temps;
    if (temp1 <= highThreshold && temp2 <= highThreshold && temp3 <= highThreshold) {
        return 'green';
    } else if (temp1 > hotspotThreshold || temp2 > hotspotThreshold || temp3 > hotspotThreshold) {
        return 'red';
    } else {
        return 'yellow';
    }
}

function countBoxColors() {
    const boxes = document.querySelectorAll('.left .box');
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;

    boxes.forEach(box => {
        const temperatures = Array.from(box.querySelectorAll('.temperature')).map(span => parseInt(span.textContent));
        const color = getColor(temperatures);

        if (color === 'green') {
            greenCount++;
        } else if (color === 'yellow') {
            yellowCount++;
        } else if (color === 'red') {
            redCount++;
        }
    });
    return { green: greenCount, yellow: yellowCount, red: redCount };
}

const modal = document.getElementById("contactModal");
const contactUsLink = document.getElementById("contactUsLink");
const span = document.getElementsByClassName("close")[0];
contactUsLink.addEventListener("click", function() {
    modal.style.display = "block";
});
span.addEventListener("click", function() {
    modal.style.display = "none";
});