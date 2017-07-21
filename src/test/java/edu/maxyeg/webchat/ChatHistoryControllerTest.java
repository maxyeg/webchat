package edu.maxyeg.webchat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ChatHistoryControllerTest {

    @Mock
    private ChatHistoryController chatHistoryController;

    @Test
    public void testGetChatHistoryForUser() {
        chatHistoryController.getChatHistoryForUser();
    }
}
