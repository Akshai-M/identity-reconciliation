
// routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ message: "Invalid request: email or phoneNumber required." });
    }

    const existingContacts = await Contact.find({
      $or: [{ email }, { phoneNumber }],
    });

    let primaryContact = existingContacts.find(c => c.linkPrecedence === "primary");
    
    if (!primaryContact) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      });
      return res.json(formatResponse(newContact, []));
    }

    const secondaryContacts = await Contact.find({ linkedId: primaryContact._id });

    const isNewEntry = !existingContacts.some(c => c.email === email && c.phoneNumber === phoneNumber);

    if (isNewEntry) {
      const newSecondary = await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact._id,
        linkPrecedence: "secondary",
      });
      secondaryContacts.push(newSecondary);
    }

    res.json(formatResponse(primaryContact, secondaryContacts));
  } catch (error) {
    console.error("Error processing request", error);
    res.status(500).json({ message: "Something went wrong. Access denied." });
  }
});

function formatResponse(primary, secondaries) {
  return {
    primaryContactId: primary._id,
    emails: [...new Set([primary.email, ...secondaries.map(c => c.email)].filter(Boolean))],
    phoneNumbers: [...new Set([primary.phoneNumber, ...secondaries.map(c => c.phoneNumber)].filter(Boolean))],
    secondaryContactIds: secondaries.map(c => c._id),
  };
}

export default router;