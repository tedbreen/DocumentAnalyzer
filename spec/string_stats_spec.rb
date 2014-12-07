require 'rspec'
require 'string_stats'

sample_a = "Water may be one of the most abundant compounds on Earth, but it is also one of more mysterious. For example, like most liquids it becomes denser as it cools. But unlike them, it reaches a state of maximum density at 4°C and then becomes less dense before it freezes."
sample_b = "Where is the ball? Did you see it? I have been looking for it for a long time! This is ridiculous. Should we buy another?"
sample_c = "
  It was a cold winter night.

  I went to the store to buy some supplies.  The streets were covered in snow!  Was it wise to travel in these conditions?  I pressed ahead.

  When I woke up in the hospital, I realized the error of my ways.  No eggs, no milk, a totaled car, and a broken back.  I really blew it!  
"

describe '#word_count' do
  it 'returns number of words in string' do
    expect( word_count(sample_a) ).to eq(50)
    expect( word_count(sample_b) ).to eq(25)
    expect( word_count(sample_c) ).to eq(61)
  end
end

describe "#sentence_count" do
  it 'returns the number of sentences in a string' do
    expect( sentence_count(sample_a) ).to eq(3)
    expect( sentence_count(sample_b) ).to eq(5)
    expect( sentence_count(sample_c) ).to eq(8)
  end
end

describe "#paragraph_count" do
  it 'returns the number of paragraphs in a string' do
    expect( paragraph_count(sample_a) ).to eq(1)
    expect( paragraph_count(sample_b) ).to eq(1)
    expect( paragraph_count(sample_c) ).to eq(3)
  end
end