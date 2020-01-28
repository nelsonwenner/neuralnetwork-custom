class NeuralNetwork {

    weights = [];

    constructor(inputNode, hiddenNode, hiddenLayers, outputNode) {
        this.inputNode = inputNode;
        this.hiddenNode = hiddenNode;
        this.outputNode = outputNode;
        this.hiddenLayers = hiddenLayers;

        /* Input -> Hidden:: Bias + 1 */
        this.weights[0] = new Matrix(this.hiddenNode, this.inputNode + 1);
        
        /* HiddensNodes:: Bias + 1 */
        for (let i=1; i <= this.hiddenLayers; i++) {
            this.weights[i] = new Matrix(this.hiddenNode, this.hiddenNode + 1);
        }

        /* HiddenNode -> outpute:: Bias + 1 */
        this.weights[this.weights.length - 1] = new Matrix(this.outputNode, this.hiddenNode + 1);
       
        /* Random weights */
        this.weights.forEach(weight => { weight.randomize(); });
    }

    feedforward = (inputArr) => {
        let inputMatrix = Matrix.arrayForMatrix(inputArr);
        
        /* Input -> Hidden */
        let inputWithBias = inputMatrix.addBias();
   
        for (let i=0; i < this.hiddenLayers; i++) {
            let hiddenInput = Matrix.dot(this.weights[i], inputWithBias);
            let hiddenInputActivated = hiddenInput.activate();
            inputWithBias = hiddenInputActivated.addBias();
        }

        /* Hidden -> Output */
        let outputHidden = Matrix.dot(this.weights[this.weights.length - 1], inputWithBias);
        let outputHiddenActivated = outputHidden.activate();
        return outputHiddenActivated;
    }
}

/*
    Essa é uma rede neural que pode ser curtomizado suas camadas ocultas,
    ela utiliza o esquema de bias, que são as tendencias da rede, no caso
    elas são adicionadas nos inputs, e nas camadas ocultas, somente na saida
    que o mesmo não é adicionado.
    
*/

