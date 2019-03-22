"use strict";

const pool = require("../pool");
const Task = require("../models/task");
const sseService = require("./sse.service");

/**
 * Class representing the Service part of the server side for tasks.
 * Manages and returns tasks within the database.
 */
class TaskService {
    /**
     * Task service constructor. Sets the information concerning the database.
     */
    constructor() {
        this.pool = pool;
    }

    /**
    * Adds the given task to the database.
    * @param {Task} task task to add
    * @return {void}
    */
    create(task) {
        return new Promise((resolve, reject) => {
            this.pool.query("INSERT INTO task (id, title, `desc`) VALUES (?, ?, ?)", [task.id, task.title, task.desc], (error, results, fields) => {
                if (error) { reject(error); } else {
                    resolve(results);
                    sseService.send({
                        data: {action: "add", task}
                    });
                }
            });
        });
    }


    /**
     * Returns the task corresponding to the given id (if it exists, returns null otherwise).
     * @param {uuid} id id to search for
     * @return {Task} corresponding task if it exists, null if not
     */
    read(id) {
        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM task WHERE id = ?`, [id], (error, results, fields) => {
                if (error) { reject(error); } else { resolve(new Task(results[0].title, results[0].desc, results[0].id)); }
            });
        });
    }

    /**
     * Returns a map containing all the tasks listed in the database.
     * @return {Map} map containing all the tasks in the database, using their ids as keys.
     */
    readAll() {
        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM task`, (error, results, fields) => {
                if (error) { reject(error); } else {
                    const list = new Map();
                    results.forEach(row => {
                        list.set(row.id, new Task(row.title, row.desc, row.id));
                    });
                    resolve(list);
                }
            });
        });
    }

    /**
     * Updates an existing task with the given task within the database.
     * @param {uuid} taskId id of the task to update
     * @param {Task} task updated task
     * @return {void}
     */
    update(taskId, task) {
        return new Promise((resolve, reject) => {
            this.pool.query("UPDATE task SET title = ?, `desc` = ? WHERE id = ?", [task.title, task.desc, taskId], (error, results, fields) => {
                if (error) { reject(error); } else {
                    resolve(results);
                    sseService.send({
                        data: {action: "update", task}
                    });
                }
            });
        });
    }

    /**
     * Deletes the given tasks from the database.
     * @param {Task} task task to delete
     * @return {void}
     */
    delete(task) {
        return new Promise((resolve, reject) => {
            this.pool.query("DELETE FROM task WHERE id = ?", task.id, (error, results, fields) => {
                if (error) { reject(error); } else {
                    resolve(results);
                    sseService.send({
                        data: {action: "delete", task}
                    });
                }
            });
        });
    }
}

module.exports = TaskService;
