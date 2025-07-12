(function(){

    function ChatBot(chatElement, renderWithExampleContent) {
        var elizaChatEntry;
        var elizaIsTyping = false;
        var userHasReplied = false;
        var chatInited = false;
        var chat_output;
        var chat_input;
        var send_button;
        var scope = this;
        var eliza;
        var timer;

        var init = _.bind(function(chatElement, renderWithExampleContent){
            chatElement.classList.add('initialized');
            chatElement.__chat_initialized = true;
            chatElement.innerHTML='<div class="chat_wrapper"><div class="chat_interior"><div class="chat_output"></div><div class="input_area"><input type="text" class="chat_input disabled"><button class="send_button disabled"></button></div></div></div>';
            chat_output = chatElement.querySelector('.chat_output');
            chat_input = chatElement.querySelector('.chat_input');
            send_button = chatElement.querySelector('.send_button');

            if (renderWithExampleContent) {
                var chat_window = chatElement.querySelector('.chat_wrapper');
                chatElement.addEventListener('mousedown', function(event){
                    chatElement.blur();
                    event.preventDefault();
                }, true);

                chat_window.setAttribute('contenteditable', false)
                chat_window.saveable = false;
                chat_output.saveable = false;
                chat_input.saveable = false;
                send_button.saveable = false;

                var chatBotReply = document.createElement('div');
                chatBotReply.innerHTML = "ChatBot Reply: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
                chatBotReply.classList.add("agent");
                chat_output.appendChild(chatBotReply);

                var userChatEntry = document.createElement('div');
                userChatEntry.innerHTML = "Human Reply: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
                userChatEntry.classList.add("user");
                chat_output.appendChild(userChatEntry);

                var waitingReply = document.createElement('div');
                waitingReply.innerHTML = "<div></div><div></div><div></div>"
                waitingReply.classList.add("agent");
                waitingReply.classList.add("waiting");
                chat_output.appendChild(waitingReply);

                var end = document.createElement('div');
                end.className = "chat_end";
                chat_output.appendChild(end);

                return;
            }
            chatElement._chat = this;
        }, this);

        this.tearDownEvents = function(){
            chat_input.removeEventListener('keydown', onKeyDown);
            send_button.removeEventListener('click', onSend);
        }

        this.getChatElement = function(){
            return chatElement;
        }

        var onKeyDown = function(event){
            if (chat_input.value.length == 0){
                send_button.classList.add('disabled');
                return;
            }
            send_button.classList.remove('disabled');
            if (event.keyCode === 13){
                sendReply();
                event.preventDefault();
            }
        }

        var onSend = function(event) {
            event.preventDefault();
            sendReply();
        }

        this.startChat = _.bind(function(event){
            if (chatInited) {
                return
            }
            var elizaDataUrl = chatElement.hasAttribute('data-custom-chat-data') ? chatElement.getAttribute('data-custom-chat-data') : 'elizadata.js';
            eliza = new ElizaBot();
            eliza.reset();
            chatInited = true;
            var initial = eliza.getInitial();
            chat_output.innerHTML = "";
            timer = setTimeout(function(){
                chat_input.classList.remove('disabled')
                chat_input.addEventListener('keydown', onKeyDown);
                var rect = chat_input.getBoundingClientRect()
                if (rect.top + rect.height < window.innerHeight) {
                    chat_input.focus();                        
                }
                send_button.addEventListener('click', onSend);
                formatElizaReply(initial);
            }, 500);
            if (event){
                event.preventDefault();
            }
        }, this);

        this.endChat = _.bind(function(event){
            if (!chatInited) {
                return
            }
            if (event){
                event.preventDefault();
            }
            chatInited = false;
            if (chatElement){
                this.tearDownEvents();
            }
            var end = document.createElement('div');
            end.className = "chat_end";
            clearTimeout(timer);
            elizaIsTyping = false;
            chat_output.appendChild(end);
            chat_input.value = '';
            chat_input.blur();
            chat_input.classList.add('disabled');
            send_button.classList.add('disabled');
        }, this);

        function sendReply(){
            if (chat_input.value.length == 0){
                return;
            }
            var reply = eliza.transform(chat_input.value);
            formatUserReply(chat_input.value);
            clearTimeout(timer);
            timer = setTimeout(function(){
                formatElizaReply(reply);
            }, 700 + Math.random() * 1200);
            chat_input.value ='';
            send_button.classList.add('disabled');
        }

        function formatUserReply(text){
            var userChatEntry = document.createElement('div');
            userChatEntry.innerHTML = text;
            userChatEntry.classList.add("user");
            chat_output.appendChild(userChatEntry);
            chat_output.scrollTo(0, chat_output.scrollHeight);
            userHasReplied = true;
        }

        var formatElizaReply = function(text){
            if (!elizaIsTyping) {
                elizaChatEntry = document.createElement('div');
                elizaChatEntry.classList.add("agent");
                elizaChatEntry.classList.add("waiting");
                elizaChatEntry.innerHTML = "<div></div><div></div><div></div>"
                chat_output.appendChild(elizaChatEntry);
                chat_output.scrollTo(0, chat_output.scrollHeight);
            }
            clearTimeout(timer);
            elizaIsTyping = true;
            timer = setTimeout(function(){
                if (userHasReplied) {
                    chat_output.removeChild(elizaChatEntry);
                    chat_output.appendChild(elizaChatEntry);
                    userHasReplied = false;
                }
                elizaChatEntry.innerHTML = text;
                elizaChatEntry.classList.remove("waiting");
                if (eliza.quit) {
                    timer = setTimeout(function(){
                        scope.endChat();
                    }.bind(this), 500)
                }
                chat_output.scrollTo(0, chat_output.scrollHeight);
                elizaIsTyping = false;
            }, 700 + Math.random() * 1200)
        }

        init(chatElement, renderWithExampleContent);
    }

    var chats = [];

    var tearDownChatBots = function(){
        var mainContainer = document.querySelector('.main_container');
        if (!mainContainer) return;

        var chatAreas = mainContainer.querySelectorAll('.chat');

        for(var i = 0; i < chatAreas.length; i++){
            chatAreas[i].classList.remove('initialized');
            chatAreas[i].__chat_initialized = false;
        }

        for(var i = 0; i < chats.length; i++){
            chats[i].tearDownEvents();
        }
        chats = [];
    }

    var bindChatBots = _.debounce(function(){
        var mainContainer = document.querySelector('.main_container');
        if(!mainContainer) return;

        var chatAreas = mainContainer.querySelectorAll('.chat');
        var startChatButtons = document.querySelectorAll('[rel="start_chat"]');
        var endChatButtons = document.querySelectorAll('[rel="end_chat"]');
        var exampleFlag = false;

        chats = []
        for(var i = 0; i < chatAreas.length; i++){
            if (!chatAreas[i].__chat_initialized){
                var chat = new ChatBot(chatAreas[i], exampleFlag)
                chats.push(chat);
            } else if(chatAreas[i]._chat) {
                var el = chatAreas[i]._chat.getChatElement();
                el.classList.add('initialized');
                chats.push(chatAreas[i]._chat);
            }
        }

        for(var i = 0; i < startChatButtons.length; i++){
            startChatButtons[i].addEventListener('click', function(e){
                e.preventDefault();
                for(var j = 0; j < chats.length; j++){
                    chats[j].startChat();                
                }
            });
        }

        for(var i = 0; i < endChatButtons.length; i++){
            endChatButtons[i].addEventListener('click', function(e){
                e.preventDefault();
                for(var j = 0; j < chats.length; j++){
                    chats[j].endChat();                
                }
            });
        }

        if (startChatButtons.length == 0){
            for(var i = 0; i < chats.length; i++){
                chats[i].startChat();
            }            
        }
    }, 200);    

    // Call bindChatBots when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', bindChatBots);

    // Rebind on window resize
    window.addEventListener('resize', bindChatBots);
})();