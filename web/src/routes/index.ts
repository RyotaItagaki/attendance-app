/* eslint-disable no-undef */
const express = require('express');
import {Request, Response} from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get(
    '/top',
    async (req: Request, res: Response) => {
      res.status(200).render('top');
    });

module.exports = router;
