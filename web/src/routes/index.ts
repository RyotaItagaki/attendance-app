const express = require('express');
import {Request, Response, NextFunction} from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

/* Get a home page */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render(
      'index',
      {
        name: '亮太',
      },
  );
  // res.render('index', {title: 'Attendance App'});
  // res.send('トップページ');
  // res.json({message: 'hello, world'});
});

module.exports = router;
