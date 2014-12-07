def word_count(str)
  str.split(" ").length
end

def sentence_count(str)
  str.split(/\.|\!|\?/).length
end