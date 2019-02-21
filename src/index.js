module.exports = function check(str, bracketsConfig) {
  const brackets = new Map(bracketsConfig);
  const isOpeningSymbol = symbol => brackets.has(symbol);
  const getClosingSymbol = symbol => brackets.get(symbol);
  const isStackEmpty = stack => (stack.length === 0);
  const stack = [];
  for (const s of str) {
    if (isOpeningSymbol(s)) {
      const closingSymbol = getClosingSymbol(s);
      stack.push(closingSymbol);
      if (s === closingSymbol) {
        const len = stack.length;
        if (stack[len - 1] === stack[len - 2]) {
          stack.splice(len - 2, 2);
        }
      }
    } else {
      if (isStackEmpty(stack)) {
        return false;
      }
      const last = stack.pop();
      if (last !== s) {
        return false;
      }
    }
  }

  return isStackEmpty(stack);
};
