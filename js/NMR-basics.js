"use strict"

function initialiseEnergyDiagram(evt){
	let svg = evt.target;
	let selectedElement = false;

	let initialSliderPosition = false;
	let initialClickPosition = false;
	let sliderChange;
	let newSliderPosition;

	let positionB = 150;
	let valueB = 1;
	let positionGamma = 150;
	let valueGamma = 1;
	let deltaEnergy = 50;

	let container = document.getElementById('energyDiagram');
	let svgns = 'http://www.w3.org/2000/svg';

	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);

	function startDrag(evt) {
		selectedElement = evt.target;
		if (selectedElement && selectedElement.tagName == 'circle') {
		initialSliderPosition = selectedElement.getAttributeNS(null, 'cx');
		initialClickPosition = evt.clientX;
			console.log(initialSliderPosition);
		}
	}

	function drag(evt) {
		if (selectedElement && selectedElement.tagName == 'circle') {
			sliderChange = evt.clientX - initialClickPosition;
			newSliderPosition = +initialSliderPosition +sliderChange;
			if (75 < newSliderPosition && newSliderPosition < 225){
				selectedElement.setAttributeNS(null, 'cx', newSliderPosition);
			}
			positionB = document.getElementById('circleFieldSlider').getAttributeNS(null, 'cx');
			valueB = (positionB / 150).toPrecision(4);
			positionGamma = document.getElementById('circleMagnetogyricSlider').getAttributeNS(null, 'cx');
			valueGamma = (positionGamma / 150).toPrecision(4);
			deltaEnergy = (50*valueB*valueGamma);

			document.getElementById('lineHighEnergy').setAttributeNS(null, 'y1', 180 - deltaEnergy);
			document.getElementById('lineHighEnergy').setAttributeNS(null, 'y2', 180 - deltaEnergy);
			document.getElementById('lineLowEnergy').setAttributeNS(null, 'y1', 180 + deltaEnergy);
			document.getElementById('lineLowEnergy').setAttributeNS(null, 'y2', 180 + deltaEnergy);
			document.getElementById('lineHighChange').setAttributeNS(null, 'y2', 180 - deltaEnergy);
			document.getElementById('lineLowChange').setAttributeNS(null, 'y2', 180 + deltaEnergy);
			console.log(valueB, valueGamma);
    	}
	}

	function endDrag(evt) {
		selectedElement = null;
	}
}


function initialiseDemo(evt){

	let svg = evt.target;

	let container = document.getElementById("demoContainer");
	let svgns = "http://www.w3.org/2000/svg";
	for (var x = 0; x < 751; x += 75) {
        for (var y = 0; y < 751; y += 75) {
			let proton = document.createElementNS(svgns, 'circle');
			proton.setAttributeNS(null, 'cx', x);
    		proton.setAttributeNS(null, 'cy', y);
    		proton.setAttributeNS(null, 'r', 10);
    		proton.setAttributeNS(null, 'stroke', 'black');
    		proton.setAttributeNS(null, 'stroke-width', '2px');
    		//proton.setAttributeNS(null, 'class', 'proton');
    		let randomSeed = Math.floor(Math.random()*100);
    		if (randomSeed % 2 == 1){
    			proton.setAttributeNS(null, 'fill', '#FF0000')
    		}
    		else {
    			proton.setAttributeNS(null, 'fill', '#0000FF')
    		}
    		container.appendChild(proton);
    	}
    }

    let border = document.createElementNS(svgns, 'polyline');
    border.setAttributeNS(null, 'points', '0,0 0,750 750,750 750,0 0,0');
    border.setAttributeNS(null, 'fill', 'none')
    border.setAttributeNS(null, 'stroke', 'black');
    border.setAttributeNS(null, 'stroke-width', '4px');
    container.appendChild(border);

    for (var x = 37.5; x < 751; x += 75) {
    	let fieldLine = document.createElementNS(svgns, 'polyline');
    	let points =
		x + ',700 ' +
		x + ',50 ' +
		(x-10) + ',60 ';
    	fieldLine.setAttributeNS(null, 'points', points);
    	fieldLine.setAttributeNS(null, 'fill', 'none');
    	fieldLine.setAttributeNS(null, 'stroke', 'black');
    	fieldLine.setAttributeNS(null, 'stroke-width', '3px');
    	container.appendChild(fieldLine);
    }


    svg.addEventListener('click', swapState);
}

function swapState(evt){

	let container = document.getElementById("demoContainer");
	let svgns = "http://www.w3.org/2000/svg";

	console.log(evt);
	let selectedElement = evt.target;
	if (selectedElement.getAttributeNS(null, 'fill') == '#FF0000'){
		selectedElement.setAttributeNS(null, 'fill', '#0000FF');
	}
	else if (selectedElement.getAttributeNS(null, 'fill') == '#0000FF'){
		selectedElement.setAttributeNS(null, 'fill', '#FF0000');
	}

}
