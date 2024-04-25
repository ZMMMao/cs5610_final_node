import db from "../Database/index.js";
import * as dao from "./dao.js";

/*
function AssignmentRoutes(app) {
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body,
        };
        res.sendStatus(204);
    });

}
export default AssignmentRoutes;
*/

export default function AssignmentRoutes(app) {
    const findAssignmentsByCourse = async (req, res) => {
        const {cid} = req.params;
        const assignments = await dao.findAssignmentsByCourse(cid);
        console.log(assignments);
        res.json(assignments);
    };

    const createAssignment = async (req, res) => {
        const {cid} = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
        };
        const assignment = await dao.createAssignment(newAssignment);
        res.json(assignment);
    };

    const deleteAssignment = async (req, res) => {
        const {aid} = req.params;
        const status = await dao.deleteAssignment(aid);
        res.sendStatus(200);
    };

    const updateAssignment = async (req, res) => {
        const {aid} = req.params;
        const assignment = req.body;
        const status = await dao.updateAssignment(aid, assignment);
        res.sendStatus(204);
    };

    app.get("/api/courses/:cid/assignments", findAssignmentsByCourse);
    app.post("/api/courses/:cid/assignments", createAssignment);
    app.delete("/api/assignments/:aid", deleteAssignment);
    app.put("/api/assignments/:aid", updateAssignment);
}