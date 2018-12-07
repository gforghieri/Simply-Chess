(function(exports) {

    // T stands for Type
    // O stands for Object


    // This message is sent by the server when the client is paired with an opponent and the game can begin
    exports.T_GAME_START = 'game-start';
    exports.COLOR_WHITE = 'white';
    exports.COLOR_BLACK = 'black';
    exports.O_GAME_START = {
        type: exports.T_GAME_START,
        playColor: null
    };


    // The move message is sent and recieved by both client and server.
    exports.T_MOVE = 'move-object';
    exports.O_MOVE = {
        type: exports.T_MOVE,
        origin: null,       // 'A6'
        destination: null   // 'B4'
    };


    // The server validates each move and responses with one of the following messsages.
    // The server guarantees that the first message it sents to the client after it submitted a move,
    // is one of those two messages. For example, if the player makes a move and wins due to this move, the server will
    // first send LEGAL_MOVE and than GAME_END.
    exports.ILLEGAL_MOVE = 'illegal-move';
    exports.LEGAL_MOVE = 'legal-move';


    // When the game is finished the server will sent the GAME_END message to the client.
    exports.T_GAME_END = 'game-end';
    exports.O_GAME_END = {
        type: exports.T_GAME_END,
        result: null        // this can be GAME_END, GAME_LOST or GAME_DRAW
    };

    exports.GAME_WON = 'game-won';
    exports.GAME_LOST = 'game-lost';
    exports.GAME_DRAW= 'game-draw';


}(typeof exports === 'undefined' ? this.Messages = {} : exports));