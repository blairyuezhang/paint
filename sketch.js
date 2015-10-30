//============================
//  Paint
//============================

var drawingCanvas
var colorPicker;
var slider;
var clearButton;
var saveButton;
var brushPicker;
var brushType;

var pumpkin1;
var unicorn1;
var bear1;
var polkaDot;




function preload(){
    pumpkin1 = loadImage("images/pumpkin.png");
    unicorn1 = loadImage("images/unicorn.png");
    bear1 = loadImage("images/bear.png")
    imageMode(CENTER);
}


function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(800, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");
    
    //set up the color picker
    colorPicker = select("#ColorPicker");
    
    //set up the paintbrush width slider
    slider = createSlider(1, 50, 10);
    slider.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    //set up the clear button
    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush type
    brushPicker = createSelect();
    brushPicker.parent("brushType")
    brushPicker.option('paint brush');
    brushPicker.option('spray can');
    brushPicker.option('polka dot')
    brushPicker.option('pumpkin');
    brushPicker.option('unicorn');
    brushPicker.option('bear');
    brushPicker.option('paint bucket');
    brushPicker.option('eraser');
    brushPicker.changed(changeBrush);
    brushType = brushPicker.value();
}

function draw() {
    
    if (mouseIsPressed) {
        if (brushType == "spray can"){
            sprayCan();
        } else if(brushType == "paint brush"){
            standardStroke(); 
        } else if(brushType == "pumpkin"){
            drawPumpkin(); 
        } else if(brushType == "unicorn"){
            drawUnicorn();
        } else if(brushType == "bear"){
            drawBear();
        } else if(brushType == "polka dot"){
            polkaDot();
        }else if(brushType == "eraser"){
            erase();
        }else if(brushType == "paint bucket"){
            paintbucket();
        }
        
    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }
}

//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255, 
    //         colorPicker.elt.color.rgb[1]*255, 
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

function sprayCan(){
    var sliderVal = slider.value();
    stroke( "#"+colorPicker.value() );

    //draw points in a grid that is the size of the brush slider
    //and draw those points 4 pixes from each other

    for (var x = 0; x < sliderVal; x+=4){
        for (var y = 0; y < sliderVal; y+=4){
            point(mouseX+x, mouseY+y);
        }
    }    
}

function polkaDot(){
    var sliderVal = slider.value();
    stroke( "#"+colorPicker.value() );
    fill( "#"+colorPicker.value() );

    for (var x = 0; x< sliderVal; x+=4){
        for (var y = 0; y < sliderVal; y+=4){
            ellipse(mouseX+5, mouseY+5, x+10, y+10);
        }
    }
}

function drawPumpkin(){
    //draw the image where the mouse is and set the size to the brush size
    image(pumpkin1,mouseX,mouseY, slider.value(), slider.value());
}

function drawUnicorn(){
    //draw the image where the mouse is and set the size to the brush size
    image(unicorn1,mouseX,mouseY, slider.value(), slider.value());
}

function drawBear(){
    image(bear1,mouseX,mouseY, slider.value(), slider.value());
}

function erase(){
    strokeWeight(slider.value());

    stroke("white");
    
    line(pmouseX, pmouseY, mouseX, mouseY);

}

function paintbucket(){
    background("#"+colorPicker.value());
}
//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    brushType = brushPicker.value();
}


function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}


function clearFunction() {
    clear();
    background("white");
}
















