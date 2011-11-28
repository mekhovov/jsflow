namespace :javascript do

	OUTPUT_FILE_ASSESS = "public/javascripts/build/assess.js"
	TASKS_JAVASCRIPT_DIR = "lib/tasks/javascript"
	
	# Use the Google Closure compiler to concatenate javascript
	# into one module, and optionall minify it.
	def closurize(requires, includes, dest_file, format)
			cmds = ["python #{TASKS_JAVASCRIPT_DIR}/calcdeps.py"]
			cmds << "-i #{requires}"
			includes.each do |dir|
					cmds << "-p #{dir}"
			end
			cmds << "-o #{format}"
			cmds << "-c #{TASKS_JAVASCRIPT_DIR}/compiler.jar"

			mkdir_p File.dirname(dest_file)
			cmds << "--output_file=#{dest_file}" if format != 'list'
			sh cmds.join(" ")

			puts("Compiled javascript in [#{format}] mode")
	end

	def closurize_assess(format)
			base     = "public/javascripts/libs/goog/base.js"
			libs_dir = "public/javascripts/libs"
			app_dir  = "public/javascripts/assess"

			requires = "#{app_dir}/ready.js"
			includes = [base, libs_dir, app_dir]
			closurize(requires, includes, OUTPUT_FILE_ASSESS, format)
	end

	namespace :assess do
        task :clean do
            rm_f OUTPUT_FILE_ASSESS
        end

        desc "Compile app javascript in dependencies mode for development."
        task :build => :clean do
            closurize_assess('deps')
        end

        task :minify => :clean do
            closurize_assess('compiled')
        end

        task :list do
            closurize_assess('list')
        end
    end


  desc "Clean all compiled javascript"
  task :clean => ['assess:clean']
  
  desc "Compile all js in dependencies mode for development."
  task :build => ["assess:build"]
  
  desc "List."
  task :list => ["assess:list"]
  
  desc "Minify."
  task :minify => ["assess:minify"]
end
