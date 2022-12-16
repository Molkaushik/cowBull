import wordFile from '../four-letter-words.txt';

export const defaultBoard = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]];

export const letterColor = {A: "a", B: "b", C: "c", D: "d", E: "e", F: "f", G: "g", H: "h", I: "i", J: "j", K: "k", L: "l", M: "m", N: "n", O: "o", P: "p", Q: "q", R: "r", S: "s", T: "t", U: "u", V: "v", W: "w", X: "x", Y: "y", Z: "z"};

export const generateWordSet = async () => {
    const response = await fetch(wordFile);
    const data = await response.text();
    const wordArray = data.split(/\s|\n|\r/);
    const filteredArray = wordArray.filter( (word) => {
        for(let i=0; i<4; i++){
            for(let j=i+1; j<4; j++){
                if(word[i]===word[j]) return false;
            }
        }
        return true;
    })
    let wordSet = new Set(filteredArray);
    let correctWord = filteredArray[Math.floor(Math.random()*filteredArray.length)];
    return {wordSet, correctWord};
}