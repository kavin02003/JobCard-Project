const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  createJobCard,
  assignTechnician,
  updateProgress,
  reportIssue,
  completeJob,
  getJobCards,
  generateBill,
  kanbanView
} = require("../controllers/jobcard.controller");

router.post("/", auth, role("ADVISOR"), createJobCard);
router.put("/:id/assign", auth, role("MANAGER"), assignTechnician);

router.put("/:id/progress", auth, role("TECHNICIAN"), updateProgress);
router.put("/:id/issue", auth, role("TECHNICIAN"), reportIssue);
router.put("/:id/complete", auth, role("TECHNICIAN"), completeJob);

router.get("/", auth, getJobCards);
router.get("/kanban", auth, role("MANAGER"), kanbanView);

router.post("/:id/bill", auth, role("CASHIER"), generateBill);

module.exports = router;
