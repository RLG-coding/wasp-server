"use strict";

const TaskService = require("../services/task.service");
const taskService = new TaskService();
const Util = require("../util");

/**
 * Class representing the task router. Routes sent requests to the correct
 * service functions within the server.
 */
class TaskRoute {
    /**
     * Task router constructor.
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
        this.pong();
        this.create();
        this.read();
        this.readAll();
        this.update();
        this.delete();
    }

    /**
     * Upon receiving a GET request, sends a positive response back to the client side.
     * @return {void}
     */
    pong() {
        this.router.get("", (req, res) => {
            res.status(200).json({});
        });
    }

    /**
     * Upon receiving a POST request, executes the create method within the service.
     * @return {void}
     */
    create() {
        this.router.post("/tasks", (req, res) => {
            const task = req.body.task;

            taskService.create(task).then(() => {
                res.status(201).json({});
            }).catch(err => {
                res.status(500).send(err.message);
            });
        });
    }

    /**
     * Upon receiving a GET request combined with an id, executes the read method within the service.
     * Sends the result of that method back to the client side.
     * @return {void}
     */
    read() {
        this.router.get("/tasks/:id", (req, res) => {
            const taskId = req.params.id;
            taskService.read(taskId).then(task => {
                res.status(200).json(task);
            }).catch(err => {
                res.status(500).send(err.message);
            });
        });
    }

    /**
     * Upon receiving a GET request, executes the readAll method within the service.
     * Sends the result of that method back to the client side.
     * @return {void}
     */
    readAll() {
        this.router.get("/tasks", (req, res) => {

            taskService.readAll().then(taskList => {
                res.status(200).json(Util.strMapToObj(taskList));
            }).catch(err => {
                res.status(500).send(err.message);
            });
        });
    }

    /**
     * Upon receiving a PUT request combined with an id, executes the update method within the service.
     * @return {void}
     */
    update() {
        this.router.put("/tasks/:id", (req, res) => {
            const taskId = req.params.id;
            const task = req.body.task;

            taskService.update(taskId, task).then(() => {
                res.status(200).json({});
            }).catch(err => {
                res.status(500).send(err.message);
            });
        });
    }

    /**
     * Upon receiving a DELETE request combined with an id, executes the read method within the service.
     * @return {void}
     */
    delete() {
        this.router.delete("/tasks/:id", async(req, res) => {
            const taskId = req.params.id;

            try {
                const task = await taskService.read(taskId);
                await taskService.delete(task);
                res.status(200).json({});
            } catch (err) {
                res.status(500).send(err.message);
            }
        });
    }
}

module.exports = TaskRoute;
