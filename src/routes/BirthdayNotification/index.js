const express = require('express');
const BirthdayNotificationRouter = express.Router();

const BirthdayNotificationController = require('../../controllers/BirthdayNotifcationController');

BirthdayNotificationRouter.post(
    '/',
    BirthdayNotificationController.sendEmail
)

module.exports = BirthdayNotificationRouter;