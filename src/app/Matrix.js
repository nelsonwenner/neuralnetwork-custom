class Matrix {

    matrix = [];    

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrixBuild();
    }

    matrixBuild = () => {
        for (let i=0; i < this.rows; i++){
            let data = [];
            for (let j=0; j < this.columns; j++){
                data.push(Math.floor(Math.random() * 10));
            }
            this.matrix.push(data);
        }
    }

    relu = (x) => {
        return Math.max(0, x);
    }

    randomize = () => {
        for (let i=0; i < this.rows; i++) {
            for (let j=0; j < this.columns; j++) {
                this.matrix[i][j] = (2 * Math.random() - 1);
            }
        }
    }

    static dot = (a, b) => {
        let result = new Matrix(a.rows, b.columns);

        for (let i=0; i < a.rows; i++) {
            for (let j=0; j < b.columns; j++) {
                let sum = 0
                for (let k=0; k < a.columns; k++) {
                    let elm1 = a.matrix[i][k];
                    let elm2 = b.matrix[k][j];
                    sum += elm1 * elm2;
                }
                result.matrix[i][j] = sum;
            }
        }
        return result;
    }
    
    activate = () => {
        let result = new Matrix(this.rows, this.columns);
        for (let i=0; i < this.rows; i++) {
            for (let j=0; j < this.columns; j++) {
                result.matrix[i][j] = this.relu(this.matrix[i][j]);
            }
        }
        return result;
    }

    crossover = (partner) => {
        let child = new Matrix(this.rows, this.columns);

        const sliceR = Math.floor(Math.random(this.rows));
        const sliceC = Math.floor(Math.random(this.columns));

        for (let i=0; i < this.rows; i++) {
            for (let j=0; j < this.columns; j++) {
                if ((i < sliceR) || (i == sliceR && j <= sliceC)) {
                    child.matrix[i][j] = this.matrix[i][j];
                } else {
                    child.matrix[i][j] = partner.matrix[i][j];
                }
            }
        }
        return child;
    }

    mutate = (mutationRate) => {
        for (let i=0; i < this.rows; i++) {
            for (let j=0; j < this.columns; j++) {
                if (mutationRate > Math.random(1)) {
                    this.matrix[i][j] += this.gaussianRandom(5,10);
                }
            }
        }
    }
    
    static arrayForMatrix = (array) => {
        let m = new Matrix(array.length, 1);
        for (let i=0; i < array.length; i++) {
            m.matrix[i][0] = array[i]; 
        }
        return m;
    }

    toArray = () => {
        let array = [];
        for (let i=0; i < this.rows; i++) {
            for (let j=0; j < this.columns; j++) {
                array.push(this.matrix[i][j]);
            }
        }
        return array;
    }
    
    addBias() {
        let m = new Matrix(this.rows + 1, 1);
        for (let i=0; i < this.rows; i++) {
            m.matrix[i][0] = this.matrix[i][0];
        }
        m.matrix[this.rows][0] = 1;
        return m;
    }

    print = () => {
        console.table(this.matrix);
    }
    
    gaussianRandom = (start, end) => {
        return Math.floor(start + this.gaussianRand() * (end - start + 1));
    }

    gaussianRand = () => {
        let rand = 0;
        for (let i = 0; i < 6; i += 1) {
          rand += Math.random();
        }
        return rand / 6;
    }
}