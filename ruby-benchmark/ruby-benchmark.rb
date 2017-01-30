Benchmark.bm  do |bm|

  bm.report do
    100_000.times do
      # One option
    end
  end

  bm.report do
    100_000.times do
      # Other option
    end
  end

end
