default_run_options[:pty] = true
set :application, "bp1"
set :secretspath, "/usr/local/www/vhosts/secrets"
set :repository,  "git@github.com:jianglibo/fao.git"
set :scm, "git"
set :user, "jianglibo"
set :scm_verbose,true
#ssh_options[:forward_agent] = true
#set :scm_command,"/usr/local/bin/git"
set :use_sudo,false
set :branch , "master"
set :deploy_via, :remote_cache
# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
# set :deploy_to, "/var/www/#{application}"
set :deploy_to, "/usr/local/www/vhosts/rails/#{application}"
# If you aren't using Subversion to manage your source code, specify
# your SCM below:
# set :scm, :subversion

role :app, "m.m3958.com"
role :web, "m.m3958.com"
role :db,  "m.m3958.com", :primary => true
#
#override the default deploy:restart task ,because we don't need.
namespace :deploy do
  task :restart do
  end
end


task :copy_secret_files do
  run "cp #{secretspath}/#{application}/database.yml #{deploy_to}/current/config/"
  run "cp #{secretspath}/#{application}/version_succ.rb #{deploy_to}/current/myutils/"
end


task :remove_test_code do
  run "/usr/local/bin/ruby #{deploy_to}/current/myutils/cut_test_code.rb"
end

task :fao_version_succ do
  run "/usr/local/bin/ruby #{deploy_to}/current/myutils/version_succ.rb"
end

after "deploy:update",:copy_secret_files, :remove_test_code,:fao_version_succ

# after "deploy:update" do
#    run "cp #{current_path}/config/deploy.rb #{current_path}/config/deploy.rb.bak"
# end
