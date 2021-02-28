function getSubFirstIndexes(text, term) {
  let input = text.toLowerCase();
  const indexes = [];
  let idxShift = 0;
  if (term === '') {
    return [];
  }
  while (1) {
    const idx = input.indexOf(term.toLowerCase());
    if (idx === -1) {
      break;
    }
    indexes.push(idx + idxShift);
    idxShift += idx + term.length;
    input = input.substring(idx + term.length);
  }
  return indexes;
}
function highlightText(text, term) {
  const idxArray = getSubFirstIndexes(text, term);
  let res = '';
  let beforeStr;
  let currentStr;
  idxArray.forEach((item, index, arr) => {
    currentStr =
      '<span class="highlighted">' +
      text.substring(arr[index], arr[index] + term.length) +
      '</span>';
    if (index === 0) {
      beforeStr = text.substring(0, idxArray[0]);
    } else {
      beforeStr = text.substring(
        idxArray[index - 1] + term.length,
        idxArray[index]
      );
    }
    res += beforeStr + currentStr;
  });
  res += text.substring(idxArray[idxArray.length - 1] + term.length);
  return res;
}
