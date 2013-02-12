module ApplicationHelper
  # Return a title on a per-page basis.
  def logo
    logo = image_tag("logo.png", :alt => "Do It and Cash It !", :class => "round")
  end
  def iconchallenge
    iconchallenge = image_tag("Icons/swords.png", :alt => "Do It and Cash It !")
  end  
  def iconchallenge2
    iconchallenge2 = image_tag("Icons/swords2.png", :alt => "Do It and Cash It !")
  end    
  def iconpoker
    iconpoker = image_tag("Icons/poker.png", :alt => "Actions")
  end 
  def iconpoker2
    iconpoker2 = image_tag("Icons/poker2.png", :alt => "Actions")
  end     
  def iconmail
    iconmail = image_tag("Icons/mail.png", :alt => "Inbox")
  end   
  def iconprofile
    iconprofile = image_tag("Icons/friends1.gif", :alt => "Profile")
  end   
  def iconsignout
    iconsignout = image_tag("Icons/signout.jpg", :alt => "Sign out")
  end    
  def iconsignin
    iconsignin = image_tag("Icons/signin.jpg", :alt => "Sign in")
  end   
   def iconregister
    iconregister= image_tag("Icons/register.png", :alt => "Register")
  end        
  def title
    base_title = "Do It and Cash It !"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end
  
  def notification(user,message_title,message_content)
    Message.create!(:title=>"notification from admin "+message_title,:content=>message_content,:user_name_to=>user.name.to_s,:user_id_from=>1.to_i)  
  end
end
