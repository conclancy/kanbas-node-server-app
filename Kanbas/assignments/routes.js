import db from "../Database/index.js";

function AssignmentRoutes(app) {

    // GET all assignments by course ID 
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
        .filter((a) => a.course === cid);
        res.send(assignments);
    });

    // GET an assingment by assingment ID 
    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignments = db.assignments
        .filter((a) => a._id === aid);
        res.send(assignments[0]);
      });

    // POST a new assigment by course ID 
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
    
    // DELETE an assigment by assignment ID 
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    
    // PUT an assignment update by ID 
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
          (a) => a._id === aid);
        db.assignments[assignmentIndex] = {
          ...db.assignments[assignmentIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    
}

export default AssignmentRoutes;