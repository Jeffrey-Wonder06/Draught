body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

h1 {
    margin: 20px 0;
}

#board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
    gap: 0;
}

.square {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
}

.dark {
    background-color: #769656;
}

.light {
    background-color: #eeeed2;
}

.piece {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.red {
    background-color: red;
}

.black {
    background-color: black;
    color: white;
}

.king {
    border: 2px solid gold;
}

