export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
