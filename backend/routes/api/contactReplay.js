const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Contact = require("../../models/contactReplay");

router.post('/addContactReply', asyncHandler(insert), msg);
router.get('/contactReplyHistory', asyncHandler(history), contactReplyHistory);

async function insert(req, res, next) {
    const contactReply = req.body;
    req.contactReply = new Contact(contactReply).save();
    if(!req.contactReply) {
        req.msg = "Error: Entry Not Successfull";
    }
    else {
        req.msg = "Successfully done!";
    }
    next();
}

async function history(req, res, next) {
    req.contactReplyHistory = await Contact.find({});
    next();
}

function msg(req, res) {
    const msg = req.msg;
    res.json({
        msg
    });
}

function contactReplyHistory(req, res) {
    const contactReplyHistory = req.contactReplyHistory;
    res.json({
        contactReplyHistory
    });
}

module.exports = router;
