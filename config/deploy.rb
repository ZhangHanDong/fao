default_run_options[:pty] = true
set :application, "bp1"
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

task :restart_mongrel_cluster do
  run "mongrel_rails cluster::stop -C /usr/local/www/vhosts/rails/bp1/current/config/fao_mongrel_cluster.yml"
  run "mongrel_rails cluster::start -C /usr/local/www/vhosts/rails/bp1/current/config/fao_mongrel_cluster.yml"
end

#task :set_showtime_img_permission do
#  run "chown -R wwwrun:www /usr/local/www/vhosts/rails/movieshowtimes/current/public/showtimeimgs"
#  run "chown -R wwwrun:www /usr/local/www/vhosts/rails/movieshowtimes/current/tmp"
#  run "rm -rvf /usr/local/www/vhosts/rails/movieshowtimes/current/public/my_attachments"
#  run "ln -s /usr/local/www/vhosts/rails/movieshowtimes/my_attachments/ /usr/local/www/vhosts/rails/movieshowtimes/current/public"
#  
#end

#task :remove_test_code do
#  run "/usr/local/bin/ruby /usr/local/www/vhosts/rails/movieshowtimes/current/myutils/cut_test_code.rb"
#end

#after "deploy:restart", :restart_mongrel_cluster

# after "deploy:update" do
#    run "cp #{current_path}/config/deploy.rb #{current_path}/config/deploy.rb.bak"
# end
