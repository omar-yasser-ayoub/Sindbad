const express = require("express");
const router = express.Router();
const {
	createComplaint,
	getComplaintById,
    getAllComplaints,
	updateComplaintStatus,
	getMyComplaints,
} = require("../controllers/Complaint");

router
    .route("/")
    .get(getAllComplaints)
    .post(createComplaint)

router
    .route("/:id")
    .get(getComplaintById)
    .put(updateComplaintStatus)

router.route("/my-complaints/:creatorId").get(getMyComplaints);

module.exports = router;
