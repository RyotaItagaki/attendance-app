const express = require('express');
import {Request, Response, NextFunction} from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

/* Get a home page */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('about');
  // res.send('aboutページ');
  // res.json({message: 'hello, world'});
});

module.exports = router;
