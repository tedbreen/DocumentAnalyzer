def word_count(str)
  str.split(" ").length
end

def sentence_count(str)
  str.strip.split(/\.|\!|\?/).length
end

def paragraph_count(str)
  str.strip.split("\n")
    .map { |s| s.strip }
    .select { |s| s.length > 0 }
    .length
end