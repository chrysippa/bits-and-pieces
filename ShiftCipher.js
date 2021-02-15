// A class to create a shift cipher (which shifts the letters
// of the alphabet by a given amount) and encrypt and decrypt
// messages in that cipher.

class ShiftCipher {
  constructor(numToShift) {
    this.numToShift = numToShift;
  }
  shift(char, numToShiftWithDirection, isLowerCase) {
    let valueOfA = 65;
    let valueofZ = 90;
    if (isLowerCase) {
      valueOfA = 97;
      valueofZ = 122;
    }
    let shiftedCodeAt = char.charCodeAt() + numToShiftWithDirection
    // if shifted number is too high to fall within range of alphabet,
    // fix by wrapping back to start of alphabet
    if (shiftedCodeAt > valueofZ) {
      const differenceForward = shiftedCodeAt - valueofZ;
      shiftedCodeAt = valueOfA + differenceForward - 1; 
    }
    // if shifted number is too low, wrap to end of alphabet
    if (shiftedCodeAt < valueOfA) {
      const differenceBackward = valueOfA - shiftedCodeAt;
      shiftedCodeAt = valueofZ - differenceBackward + 1;
    }
    return String.fromCharCode(shiftedCodeAt);
  }
  encrypt(str) {
    const upper = str.split('').map(char => char.toUpperCase());
    const shifted = upper.map(char => {
      // don't shift non-alphabetic characters
      if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
        return this.shift(char, this.numToShift, false);
      }
      return char;
    });
    return shifted.join('');
  }
  decrypt(str) {
    const lower = str.split('').map(char => char.toLowerCase());
    const backshifted = lower.map(char => { 
      // don't shift non-alphabetic characters
      if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
        return this.shift(char, this.numToShift * -1, true);
      }
      return char;
    });
    return backshifted.join('');
  }
}