#!/usr/bin/env ruby

require 'pathname'

ROOT = Pathname.new(__dir__).join('..').expand_path
SRC_DIR = ROOT.join('src')
INLINE_STYLES = %w[
  justify-content
  padding
  margin
  background-color
  border-radius
  text-align
  object-fit
  font-size
].freeze

files = Dir.glob(SRC_DIR.join('**/*.{liquid,yml}')).sort

puts "Chef style audit"
puts "Threshold: #{INLINE_STYLES.length}"
puts

total = 0

INLINE_STYLES.each do |style_name|
  count = files.sum { |file| File.read(file).scan(style_name).size }
  total += count
  puts format('%-18s %3d', style_name, count)
end

puts
puts "Total tracked style hits: #{total}"
puts "Passes threshold: #{total <= INLINE_STYLES.length}"