const express = require('express');
const {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);
router.get('/students', getAllStudent);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

module.exports = { routes: router };
