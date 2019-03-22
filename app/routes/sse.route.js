"use strict";

const sseService = require("../services/sse.service");

/**
 * Class representing the SSE router. Creates a connection between the client side
 * and the server side allowing the server to send messages to the client.
 */
class SSERoute {
    /**
     * SSE router constructor.
     * @param {Router} router router to use for the transactions
     */
    constructor(router) {
        this.router = router;
    }

    /**
     * Initializes the possible actions which can be accessed by the server.
     * @return {void}
     */
    registerRoute() {
        this.connect();
    }

    /**
     * Connects a client to the SSE router.
     * @return {void}
     */
    connect() {
        this.router.get("/sse", (req, res) => {
            res.set({
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Expose-Headers": "*",
                "Access-Control-Allow-Credentials": true
            });
            sseService.addClient(req, res);
        });
    }
}

module.exports = SSERoute;
