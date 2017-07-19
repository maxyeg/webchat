package edu.maxyeg.webchat.controller;

import edu.maxyeg.webchat.message.UserMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/{user}")
    @SendTo("/topic/chat/{user}")
    public UserMessage sendMessage(@DestinationVariable String user, UserMessage message) throws Exception {
        return message;
    }
}
