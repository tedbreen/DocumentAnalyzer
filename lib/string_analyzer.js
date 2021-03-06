(function() {
    var StringAnalyzer = {
        counter: function() {
            for (var count in this.counts) {
                this.counts[count] = this[count].length;
            }
            return this.counts;
        },
        resetCounts: function() {
            this.counts = {
                paragraphs: 0,
                sentences: 0,
                words: 0
            };
            this.paragraphs = [];
            this.sentences = [];
            this.words = [];
            this.distribution = {};
        },
        textSplitter: function(wholeText) {
            return wholeText.split("\n").filter(function(paragraph) {
                if (paragraph.length > 0) {
                    return paragraph;
                }
            });
        },
        paragraphSplitter: function(paragraph) {
            var numberStrings = {
                0: true, 1: true, 2: true, 3: true, 4: true,
                5: true, 6: true, 7: true, 8: true, 9: true
            }
            var sentenceCompleters = { ".": true, "?": true, "!": true };
            var sentences = [];
            var sentence = "";
            for (var idx = 0; idx < paragraph.length; idx++) {
                if (sentenceCompleters[paragraph[idx]]) {
                    if (!(
                        numberStrings[paragraph[idx - 1]]
                        && numberStrings[paragraph[idx + 1]]
                    )) {
                        sentences.push(sentence);
                        sentence = "";
                    }
                } else {
                    if (!(
                        (paragraph[idx] === " ") && (sentence.length === 0)
                    )) {
                        sentence += paragraph[idx]
                    }
                }
            }
            if (sentence.length > 0) {
                sentences.push(sentence);
            }
            return sentences.filter(function(sentence) {
                if (sentence.length > 0) {
                    return sentence;
                }
            });
        },
        wordLengthDistribution: function(word) {
            if (this.distribution[word.length]) {
                this.distribution[word.length]++;
            } else {
                this.distribution[word.length] = 1;
            }
        },
        sentenceSplitter: function(sentence) {
            return words = sentence.split(" ").filter(function(word) {
                if (word.length > 0) {
                    this.wordLengthDistribution(word);
                    return word;
                }
            }, this).map(function(word) {
                return this.charRemoval(word).toLowerCase();
            }, this);
        },
        bigramFinder: function() {
            var bigrams = {
                pairs: {},
                buckets: {}
            };
            var bigram;
            for (var word = 0; word < this.words.length - 1; word++) {
                bigram = (this.words[word] + " " + this.words[word+1]);
                if (bigrams.pairs[bigram]) {
                    bigrams.pairs[bigram]++;
                } else {
                    bigrams.pairs[bigram] = 1;
                }
            }
            this.bigramSorter(bigrams);
            return bigrams;
        },
        bigramSorter: function(bigrams) {
            for (var bigram in bigrams.pairs) {
                var number = bigrams.pairs[bigram];
                if (number !== 1) {
                    if (bigrams.buckets[number]) {
                        bigrams.buckets[number].push(bigram);
                    } else {
                        bigrams.buckets[number] = [bigram];
                    }
                }
            }
        },
        recalculate: function(text) {
            this.resetCounts();
            this.paragraphs = this.paragraphs.concat(
                this.textSplitter(text)
            );
            this.paragraphs.forEach(function(paragraph) {
                this.sentences = this.sentences.concat(
                    this.paragraphSplitter(paragraph)
                );
            }, this);
            this.sentences.forEach(function(sentence) {
                this.words = this.words.concat(
                    this.sentenceSplitter(sentence)
                );
            }, this);
            this.bigrams = this.bigramFinder();
        },
        appendCounts: function(className, countObj) {
            var tableCounterEls = document.getElementsByClassName(className);
            var el, countDisplayEl, countDisplayNode;
            for (el = 0; el < tableCounterEls.length; el++) {
                countDisplayEl = tableCounterEls[el];
                if (countDisplayEl.childNodes.length > 0) {
                    countDisplayEl.removeChild(countDisplayEl.childNodes[0]);
                }
                countDisplayNode = document.createTextNode(
                    countObj[tableCounterEls[el].classList[1]]
                );
                countDisplayEl.appendChild(countDisplayNode);
            }
        },
        appendBigrams: function(list) {
            var li, t, numKey, bucket, pairIdx;
            var keys = Object.keys(this.bigrams.buckets);
            if (keys.length === 0) {
                    li = document.createElement("LI");
                    t = document.createTextNode(
                        "No bigrams occur more than once"
                    );
                    li.appendChild(t);
                    list.appendChild(li);
                    return;
            } else {
                for (numKey = keys.length - 1; numKey >= 0; numKey--) {
                    bucket = this.bigrams.buckets[keys[numKey]]
                    for (pairIdx = 0; pairIdx < bucket.length; pairIdx++) {
                        li = document.createElement("LI");
                        t = document.createTextNode(
                            '"'+bucket[pairIdx]+'" ('+keys[numKey]+')'
                        );
                        li.appendChild(t);
                        list.appendChild(li);
                    }
                }
                return;
            }
        },
        appendDistribution: function(table) {
            var tr, tdLength, tdCount, lengthText, countText;
            if (this.words.length === 0) {
                return;
            } else {
                for (var wordLength in this.distribution) {
                    tr = document.createElement("TR");
                    tdLength = document.createElement("TD");
                    tdCount = document.createElement("TD");
                    lengthText = document.createTextNode(wordLength);
                    countText = document.createTextNode(
                        this.distribution[wordLength]
                    );
                    tdLength.appendChild(lengthText);
                    tdCount.appendChild(countText);
                    tr.appendChild(tdLength);
                    tr.appendChild(tdCount);
                    table.appendChild(tr);
                }
                return;
            }
        },
        charRemoval: function(str) {
            var badChars = {
                ";":true,'"':true,",":true,"(":true,")":true,":":true,
            };
            var newStr = "";
            for (var idx = 0; idx < str.length; idx++) {
                if (!badChars[str[idx]]) {
                    newStr += str[idx];
                }
            }
            return newStr;
        },
        massChildRemoval: function(el, exception) {
            while (el.lastChild) {
                if (el.lastChild.tagName === exception) {
                    return;
                }
                el.removeChild(el.lastChild);
            }
        }
    };

    var textBox = document.getElementsByClassName("text-box")[0];
    var bigramList = document.getElementsByClassName("bigrams")[0];
    var distributionTable = document.getElementsByClassName("distribution")[0];
    StringAnalyzer.recalculate(textBox.value);
    StringAnalyzer.appendCounts("count", StringAnalyzer.counter());
    StringAnalyzer.appendBigrams(bigramList);
    StringAnalyzer.appendDistribution(distributionTable);

    var btn = document.getElementsByClassName("btn-report")[0];
    btn.addEventListener("click", function() {
        StringAnalyzer.massChildRemoval(bigramList);
        StringAnalyzer.massChildRemoval(distributionTable, "TBODY");
        StringAnalyzer.recalculate(textBox.value);
        StringAnalyzer.appendCounts("count", StringAnalyzer.counter());
        StringAnalyzer.appendBigrams(bigramList);
        StringAnalyzer.appendDistribution(distributionTable);
    });
})();