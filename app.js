 // Get all elements
        const cells = document.querySelectorAll('.cell');
        const info = document.getElementById('info');
        const resetBtn = document.getElementById('reset');

        // Game state
        let currentPlayer = 'x';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        // Winning combinations
        const winPatterns = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6]  // diagonal
        ];

        // Handle cell click
        function handleCellClick(e) {
            const cell = e.target;
            const index = cell.getAttribute('data-index');

            // If cell is taken or game is over, do nothing
            if (gameBoard[index] !== '' || !gameActive) {
                return;
            }

            // Update game board and cell
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add('taken');
            cell.classList.add(currentPlayer.toLowerCase());

            // Check for winner or draw
            if (checkWinner()) {
                info.textContent = `Player muttiy Wins! 🎉`;
                info.className = 'info winner';
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                info.textContent = "It's a Draw! 🤝";
                info.className = 'info draw';
                gameActive = false;
                return;
            }

            // Switch player
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            info.textContent = `Player muttiy Turn`;
        }

        // Check if someone won
        function checkWinner() {
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && 
                    gameBoard[a] === gameBoard[b] && 
                    gameBoard[a] === gameBoard[c]) {
                    // Highlight winning cells
                    cells[a].classList.add('winner');
                    cells[b].classList.add('winner');
                    cells[c].classList.add('winner');
                    return true;
                }
            }
            return false;
        }

        // Check if it's a draw
        function checkDraw() {
            return gameBoard.every(cell => cell !== '');
        }

        // Reset the game
        function resetGame() {
            currentPlayer = 'x';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            info.textContent = "Player muttiy's Turn";
            info.className = 'info';
            
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('taken', 'x', 'o', 'winner');
            });
        }

        // Add event listeners
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetBtn.addEventListener('click', resetGame);
    