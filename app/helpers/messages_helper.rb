module MessagesHelper
  
    def inbox
      base_title = "Inbox"
      i = Message.find_all_by_user_name_to_and_read(current_user.name,false).count
      if i!=0
        return "#{base_title} (#{i})"
      else
        return base_title
      end
    end
end
