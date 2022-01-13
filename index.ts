import { prompt } from 'inquirer';
import * as chalk from 'chalk';
const MAX_GUESSES = 6;
let word: string;

const processGuess = async (guess: string) => {
  // letter correct place? green
  // correct letter: yellow  
  // gray
  let output: string = ""
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    if(word[i] === letter){
      output += (chalk.green(letter));
    } else if(word.includes(letter)){
      output += (chalk.yellow(letter));
    } else {
      output += (chalk.grey(letter))
    }
  }
  console.log(output)
}
prompt([{type: 'input', name: 'word', message: 'What is the word to be guessed?'}]).then(async (answer) => {
  console.clear();
  word = answer.word as string;
  word = word.toLowerCase();
  for (let missedGuessCount = 0; missedGuessCount < MAX_GUESSES; missedGuessCount++) {
    const guess = (await prompt([{type: 'input', name: 'guess', message: 'Guess a word'}])).guess.toLowerCase();
    if (guess === word){
      console.log("YOU GOT IT!");
      return;
    }
    await processGuess(guess)
    console.log({guess, remainingGuesses: MAX_GUESSES - 1 - missedGuessCount})
  }
  console.log(`Good try! The word was ${word}`)
})
