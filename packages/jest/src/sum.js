// cjs引入

function sum(a, b) {
  return a + b;
}

module.exports = sum;

// esm引入

export default function sumEs(a, b) {
  return a + b;
}
