function setup() {

    createCanvas(2000, 2000);
    background(0);

    const brain = new NeuralNetwork(2, 2, 1, 1);

    let input = [1, 2]

    const output = brain.feedforward(input);

    console.table(output.matrix);
}

function draw(){ }

