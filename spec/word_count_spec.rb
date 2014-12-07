require 'rspec'
require 'word_count'

sample_a = "Water may be one of the most abundant compounds on Earth, but it is also one of more mysterious. For example, like most liquids it becomes denser as it cools. But unlike them, it reaches a state of maximum density at 4°C and then becomes less dense before it freezes."

describe '#word_count' do
  it 'returns number of words in string' do
    expect( word_count(sample_a) ).to eq(50)
  end
end