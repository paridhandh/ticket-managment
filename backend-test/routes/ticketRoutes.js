const express = require("express");
const Ticket = require("../models/Ticket");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// Create ticket (USER)
router.post("/", auth, role("USER"), async (req, res) => {
  const { title, description, priority } = req.body;

  const ticket = await Ticket.create({
    title,
    description,
    priority,
    createdBy: {
      name: req.user.name,
      role: req.user.role,
      userId: req.user.id,
    },
  });

  res.status(201).json(ticket);
});

// Get all tickets
router.get("/", auth, async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

// Assign ticket (MANAGER)
router.patch("/:id/assign", auth, role("MANAGER"), async (req, res) => {
  const { supportId, supportName } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  ticket.assignedTo = {
    name: supportName,
    role: "SUPPORT",
    userId: supportId,
  };

  await ticket.save();
  res.json(ticket);
});

// Add comment
router.post("/:id/comment", auth, async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  ticket.comments.push({
    authorName: req.user.name,
    authorRole: req.user.role,
    comment: req.body.comment,
  });

  await ticket.save();
  res.json(ticket);
});

module.exports = router;