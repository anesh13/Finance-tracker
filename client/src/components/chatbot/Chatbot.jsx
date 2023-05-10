import { useState, useEffect } from 'react';
import { Widget, addResponseMessage, toggleMsgLoader } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { backendUrl } from '../../config';


import axios from "axios";
import logo from './robot-line-icon.png';
import chatIcon from './chatIcon.png'
import './chatbot.scss';

const Chatbot = () => {
    const [hasShownWelcome, setHasShownWelcome] = useState(false);

    const handleNewUserMessage = async (message) => {
        toggleMsgLoader(); //shows "..." before chatbot responds

        try {
            const response = await axios.post(`${backendUrl}/chat`, {
                input: message,
            });

            console.log(response)

            if (response.data.chatbotResponse.trim()) {
                addResponseMessage(response.data.chatbotResponse);
            } else {
                addResponseMessage('Sorry, I could not generate a response.');
            }
        } catch (error) {
            console.log(error);
            addResponseMessage('Error: Unable to connect to server.');
        }
        finally {
            toggleMsgLoader(); //toggle off
        }
    };

    useEffect(() => {
        if (!hasShownWelcome) {
            addResponseMessage('Welcome to the finance tracker web app! How can I help you?');
            setHasShownWelcome(true);
        }
    }, [hasShownWelcome]);
    return (
        <div>
            <Widget
                title="Finance Tracker Chatbot"
                subtitle="Ask me anything!"
                handleNewUserMessage={handleNewUserMessage}
                profileAvatar={logo}
                // profileClientAvatar={logo}
                titleAvatar={chatIcon} // <a href="https://www.flaticon.com/free-icons/finances" title="finances icons">Finances icons created by surang - Flaticon</a>
                // showCloseButton={true}
                // fullScreenMode={true}
                emojis
                autofocus

            />



        </div>
    );
};

export default Chatbot;
