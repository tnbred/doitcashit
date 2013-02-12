require 'digest'

class User < ActiveRecord::Base
  attr_accessor :password
  attr_accessible :name, :email,:password, :password_confirmation, :challpts, :actions
  has_many :challenges
  has_many :news
  has_many :followingchallenges, :foreign_key => "user_id",
                                 :class_name => "Followingchallenge",
                                 :dependent => :destroy

  email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  before_save :encrypt_password
  validates :password, :presence =>true
  validates :password, :confirmation =>true
  validates :password, :length =>{ :within => 6..40 }
  validates :name, :presence => true 
  validates :name, :length   => { :maximum => 17 }
  validates :email, :presence => true
  validates :email, :format   => { :with => email_regex }
  validates :email, :uniqueness => { :case_sensitive => false }

  default_scope :order => 'users.challpts desc'

  def self.authenticate(email, submitted_password)
    user = find_by_email(email)
    return nil  if user.nil?
    return user if user.has_password?(submitted_password)
  end
  
  def self.authenticate_with_salt(id, cookie_salt)
    user = find_by_id(id)
    (user && user.salt == cookie_salt) ? user : nil
  end
  
  def has_password?(submitted_password)
    encrypted_passwd == encrypt(submitted_password)
  end
  
  def following?(challenge)
    followingchallenges.find_by_challenge_id(challenge)
  end

  def follow!(challenge_followed,nbaction) 
    followingchallenges.create!(:user_id =>self.id, :challenge_id => challenge_followed.id, :actions =>nbaction)
  end

  def feed
    followingchallenges
  end

  def self.search(search)
    find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
  end


    private
      def encrypt_password
    self.salt = make_salt if new_record?
    if password !=nil
     self.encrypted_passwd = encrypt(password)
     end
  end
  
    

   def encrypt(string)
      secure_hash("#{salt}--#{string}")
    end

    def make_salt
      secure_hash("#{Time.now.utc}--#{password}")
    end

    def secure_hash(string)
      Digest::SHA2.hexdigest(string)
    end
end
