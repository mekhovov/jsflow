# -----------------------------------------------------
# Common tasks.
# -----------------------------------------------------

namespace :start do
	desc "bundle install"
	task :bundle  do
		sh("bundle install")
	end
	
	desc "Start server"
	task :server  do
		sh("rails s -d")
	end
end

desc "Run application"
task :start => ["start:bundle", "start:server"]
