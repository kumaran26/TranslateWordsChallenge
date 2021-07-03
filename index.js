const fs = require('fs');
const csv = require('csv-parser');
  
let text = fs.readFileSync('t8.shakespeare.txt', 'utf8').toString();
let words = fs.readFileSync('find_words.txt', 'utf8').split("\n");
let wordsDictionary = {};

fs.createReadStream('french_dictionary.csv').pipe(csv()).on('data', function(data){
	let word = [];
	for (let key in data) {
	  if (data.hasOwnProperty(key)) {
		word.push(data[key]);
	  }
	}
	wordsDictionary[word[0]] = word[1];
}).on('end',function(){
    replaceWords();
});

function countOccurences(text, word) {
    return text.split(word).length - 1;
 }
 
 function replaceWords(){
     words.forEach(function(word){
         console.log('word: ', word, ', count: ' , countOccurences(text, word));
         text = text.replace(new RegExp(word, "g"), wordsDictionary[word]);
     });
 }