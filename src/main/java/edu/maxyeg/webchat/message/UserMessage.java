package edu.maxyeg.webchat.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class UserMessage {

    @Getter
    @Setter
    private String fromUser;

    @Getter
    @Setter
    private String message;

}
