
/**CREATES MATRIX TO VISUALIZE BOARD*/
var createMatrix = function(w, h) {
  var result = [];
  for(var x=0; x<h; x++) {
  	var section = [];
  	for(var y=0; y<w; y++) {
  	  section.push(0);
  	}
  	result.push(section);
  }
  return result;
};
/**SPIRAL ALGORITHM*/
var spiral = function(arr, width, height) {
  var matrix = createMatrix(width,height);
  var val = 0;
  var startRowIndex = 0;
  var endRowIndex = matrix.length-1;
  var startColIndex = 0;
  var endColIndex = matrix[0].length-1;

  while (startRowIndex <= endRowIndex && startColIndex <= endColIndex) {
    for (var i = startColIndex; i <= endColIndex; i++) {
      matrix[startRowIndex][i] = arr[val];
      val++;
    }
    startRowIndex++;
    for (var j = startRowIndex; j <= endRowIndex; j++) {
      matrix[j][endColIndex] = arr[val];
      val++;
    }
    endColIndex--;
    if (startRowIndex <= endRowIndex) {
      for (var k = endColIndex; k >= startColIndex; k--) {
        matrix[endRowIndex][k] = arr[val];
        val++;
      }
      endRowIndex--;
    }
    if (startColIndex <= endColIndex) {
      for (var m = endRowIndex; m >= startRowIndex; m--) {
        matrix[m][startColIndex] = arr[val];
        val++;
      }
      startColIndex++;
    }
  }
  var newMatrix = [];
  for(var b=0; b<matrix.length; b++) {
    newMatrix = newMatrix.concat(matrix[b]);
  }
  return newMatrix;
};
/**CARD SHUFFLE ALGORITHM*/
var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
