require 'rake'

desc 'Default: minify and combine javascripts'
task :default => :build

desc 'Minify and combine javascripts'
task :build do 
  FileUtils.rm_rf "build/"
  mkdir_p "build/locales"

  # minify
  Dir['js/**/*.js'].each do |f|
    to_f = "build/#{f.sub(/^js\//, '')}"
    to_f.sub!(/\.js$/, '.min.js') if to_f =~ /locales/
    to_f.sub!(/\.js$/, '.tmp.js') unless to_f =~ /locales/
    puts "minifying #{f} => #{to_f}"
    system "java -jar ext/yuicompressor-2.4.2.jar --type js #{f} -o #{to_f}"
  end
  
  # combine
  out = File.open('build/chronic.min.js', 'w');
  out.puts COPYRIGHT
  puts "combining to chronic.min.js"
  Dir['build/locales/en.min.js', 'build/*.tmp.js'].each do |f|
    puts "\tadding #{f}"
    FileUtils.copy_stream(File.open(f), out)
  end
  out.close
end

desc 'Clean up generated files.'
task :clean do
  FileUtils.rm_rf "build"
  FileUtils.rm_rf "pkg"
end

COPYRIGHT = <<-EOT
/*
 * chronic.js java script date library
 * http://github.com/lwe/chronic_js
 *
 * Copyright (c) #{Time.now.year} Lukas Westermann
 * Licensed under the BSD license.
 * http://github.com/lwe/chronic_js/tree/LICENCE
 *
 * Date: #{Time.now}
 */
EOT
