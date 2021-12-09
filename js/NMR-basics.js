"use strict"

function initialiseEnergyDiagram(evt){
	console.log("Initialising energy diagram");
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
