export function randomNumber(length = 6) {
  return Math.floor(
    Math.random() * Math.pow(10, length)
  ).toString().padStart(length, '0');
}

export function randomEmail() {
  return `test${randomNumber(6)}@test.com`;
}

export function randomMobile() {
  return `9${randomNumber(9)}`;
}