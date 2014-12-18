## Instructions

To use this Document Analyzer application, either clone this repo and open `main.html` in your browswer or visit this URL:

[http://documentanalyzer.s3-website-us-west-1.amazonaws.com/](http://documentanalyzer.s3-website-us-west-1.amazonaws.com/)

## Summary

Remember Microsoft Word’s “word count” feature? It would take your document and give you a bunch of statistics on your text.

This application re-implements word count, with a twist. Given a piece of text (e.g., a string), it returns the following statistics:

* Word Count
* Sentence Count
* Paragraph Count
* [Bigrams](http://en.wikipedia.org/wiki/Bigram) (counts of unique pairs of words)
* Distribution of words by length

Some “creative” statistics to implement in the future:

* [Reading Level](http://en.wikipedia.org/wiki/Readability#The_popular_readability_formulas)
* Pairs of rhyming words
* [N-grams](http://en.wikipedia.org/wiki/N-gram) (counts of unique strings of n words)
* Distribution of words by type (e.g. nouns, verbs)
* Language detection

## Demonstration

Sample text: *Water may be one of the most abundant compounds on Earth, but it is also one of more mysterious. For example, like most liquids it becomes denser as it cools. But unlike them, it reaches a state of maximum density at 4°C and then becomes less dense before it freezes.*

Output:

* 50 words
* 3 sentences
* 1 paragraph
* Most popular bigrams: “one of” (2)

Some sample posts you might try in this program:

* [The Mercenary](https://medium.com/@joshuadavisnow/the-mercenary-ac3bd0d025f5)
* [Collecting Air](https://medium.com/@nickbilton/collecting-air-5f803f1482e3)
* [10 Reasons Why People Love Numbered Lists](https://medium.com/the-year-of-the-looking-glass/10-reasons-why-people-love-numbered-lists-572a787daf92)
* [Twitter Bootstrap](https://medium.com/@fat/twitter-bootstrap-b95033c270af)