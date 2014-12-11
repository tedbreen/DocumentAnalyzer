var sampleOne = "Water may be one of the most abundant compounds on Earth, but it is also one of more mysterious. For example, like most liquids it becomes denser as it cools. But unlike them, it reaches a state of maximum density at 4°C and then becomes less dense before it freezes."
var sampleTwo = "What's up with $500.45 that? What's up with that? Ooooooo we! That is my favorite song (I think); forever.";
var sampleThree = "Append an item in a list:";
var paragraph = "He is the one. I saw him there.\n\n\nDon't believe me? It is true!!\nOne day he will get caught; I assure you!";

function stringAnalyzer(str) {
    var counts = {
        paragraphs: 0,
        sentences: 0,
        words: 0
    };
    // 1) split up string into an array of paragraphs
    var paragraphs = paragraphSplit(str);
    counts.paragraphs += paragraphs.length;
    // 2) count number of sentences in each paragraph
    paragraphs.forEach(function(paragraph) {
        var cleanParagraph = charRemoval(paragraph);
        var sentences = sentenceSplit(cleanParagraph)._select(function(sentence) {  //problem here!!
            if (sentence.length > 0) {
                return sentence;
            }
        });
        counts.sentences += sentences.length;
        // 3) count number of words in each sentence
        sentences.forEach(function(sentence) {
            counts.words += sentence.split(" ")._select(function(word) {
                if (word.length > 0) {
                    return word;
                }
            }).length;
        });
    })
    return counts;
}

Array.prototype._select = function(condition) {
    var newArray = [];
    for (var idx = 0; idx < this.length; idx++) {
        if (condition(this[idx])) {
            newArray.push(this[idx]);
        }
    }
    return newArray;
}

function paragraphSplit(str) {
    var paragraphs = str.split("\n");
    var paragraphs = paragraphs._select(function(paragraph) {
        if (paragraph.length > 0) {
            return paragraph;
        }
    });
    return paragraphs;
}

function charRemoval(str) {
    var badChars = {
        ";": true, '"': true, ",": true, "(": true, ")": true, ":": true,
    };
    var newStr = "";
    for (var idx = 0; idx < str.length; idx++) {
        if (!badChars[str[idx]]) {
            newStr += str[idx];
        }
    }
    return newStr;
}

function sentenceSplit(str) {
    var numberStrings = {
        0: true, 1: true, 2: true, 3: true, 4: true,
        5: true, 6: true, 7: true, 8: true, 9: true
    }
    var sentenceCompleters = {
        ".": true,
        "?": true,
        "!": true
    };
    var sentences = [];
    var sentence = "";
    for (var idx = 0; idx < str.length; idx++) {
        if (sentenceCompleters[str[idx]]) {
            if (!(numberStrings[str[idx - 1]] && numberStrings[str[idx + 1]])) {
                sentences.push(sentence);
                sentence = "";
            }
        } else {
            if (!((str[idx] === " ") && (sentence.length === 0))) {
                sentence += str[idx]
            }
        }
    }
    if (sentence.length > 0) {
        sentences.push(sentence);
    }
    return sentences;
}

function appendCounts(className, countObj) {
    var tableCounterEls = document.getElementsByClassName(className);
    var el, countDisplayEl, countDisplayNode;
    for (el = 0; el < tableCounterEls.length; el++) {
        countDisplayEl = tableCounterEls[el];
        if (countDisplayEl.childNodes.length > 0) {
            countDisplayEl.removeChild(countDisplayEl.childNodes[0]);
        }
        countDisplayNode = document.createTextNode(countObj[tableCounterEls[el].classList[1]]);
        countDisplayEl.appendChild(countDisplayNode);
    }
}