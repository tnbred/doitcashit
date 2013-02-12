namespace :db do
  desc "Fill database with sample data"
  task :populate => :environment do
    40.times do |n|
      title  = Faker::Company.name
      content = Faker::Lorem.paragraphs
      actions = "#{n+1}"
      actions_required = "#{n+1}"
      chall = Challenge.create!(:title => title,
                   :content => content,
                   :actions => actions,
                   :actions_required => actions_required,
                   :videolink => "http://www.youtube.com/embed/yw6ZEgR2KMI?modestbranding=1",
                   :proposer =>"1")
      chall.toggle!(:visibility)             
    end
    40.times do |n|
      title  = Faker::Company.name
      content = Faker::Lorem.paragraphs
      actions = "#{n+1}"
      actions_required = "#{n+1}"
      chall = Challenge.create!(:title => title,
                   :content => content,
                   :actions => actions,
                   :actions_required => actions_required,
                   :proposer =>"1",
                   :ready => true,
                   :videolink => "http://www.youtube.com/embed/yw6ZEgR2KMI?modestbranding=1",                   
                   :completed => true,
                   :accepted => true)
      chall.toggle!(:visibility)             
    end    
    40.times do |n|
      title  = Faker::Company.bs
      content = Faker::Lorem.paragraphs
      actions = "#{n+1}"
      actions_required = "#{n+1}"
      chall = News.create!(:title => title,
                   :content => content,
                   :user_id => "1")
      end 
    40.times do |n|
      name  = Faker::Internet.user_name
      email = Faker::Internet.email
      password="password"
      actions = "#{n+1}"
      challpts = "#{n+1}"
      User.create!(:name => name,
                   :email => email,
                   :password => password,
                   :password_confirmation => password,
                   :actions => actions,
                   :challpts => challpts)    
    end
    name  = "toto"
    email = "toto@toto.toto"
    password="tototo"
    actions = "1337"
    challpts = "1337"
    toto = User.create!(:name => name,
                   :email => email,
                   :password => password,
                   :password_confirmation => password,
                   :actions => actions,
                   :challpts => challpts)
    toto.toggle!(:admin)               
  end
end