// routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // Check if both email and phoneNumber are missing. Return 400 if so.
    if (!email && !phoneNumber) {
      return res.status(400).json({ message: "Invalid request: email or phoneNumber required." });
    }

    // Find existing contacts with either the provided email or phoneNumber.
    const existingContacts = await Contact.find({
      $or: [{ email }, { phoneNumber }],
    });

    // Find the primary contact from the existing contacts.
    let primaryContact = existingContacts.find(c => c.linkPrecedence === "primary");
    
    // If no primary contact exists, create a new primary contact.
    if (!primaryContact) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      });
      // Format and return the response with the new primary contact and no secondary contacts.
      return res.json(formatResponse(newContact, []));
    }

    // Find all secondary contacts linked to the primary contact.
    const secondaryContacts = await Contact.find({ linkedId: primaryContact._id });

    // Check if the new email and phoneNumber combination is a new entry.
    const isNewEntry = !existingContacts.some(c => c.email === email && c.phoneNumber === phoneNumber);

    // If it's a new entry, create a new secondary contact linked to the primary.
    if (isNewEntry) {
      const newSecondary = await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact._id,
        linkPrecedence: "secondary",
      });
      // Add the new secondary contact to the secondaryContacts array.
      secondaryContacts.push(newSecondary);
    }

    // Format and return the response with the primary and secondary contacts.
    res.json(formatResponse(primaryContact, secondaryContacts));
  } catch (error) {
    // Log the error and return a 500 error response.
    console.error("Error processing request", error);
    res.status(500).json({ message: "Something went wrong. Access denied." });
  }
});

// Function to format the response data.
function formatResponse(primary, secondaries) {
  return {
    primaryContactId: primary._id,
    // Create a set of unique emails from the primary and secondary contacts.
    emails: [...new Set([primary.email, ...secondaries.map(c => c.email)].filter(Boolean))],
    // Create a set of unique phone numbers from the primary and secondary contacts.
    phoneNumbers: [...new Set([primary.phoneNumber, ...secondaries.map(c => c.phoneNumber)].filter(Boolean))],
    // Extract the IDs of the secondary contacts.
    secondaryContactIds: secondaries.map(c => c._id),
  };
}

export default router;