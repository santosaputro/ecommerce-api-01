'usse strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();
const collection = 'students';

const addStudent = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection(collection).doc().set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllStudent = async (req, res) => {
  try {
    const students = await firestore.collection(collection);
    const data = await students.get();
    const studentArray = [];

    if (data.empty) {
      res.status(404).send('No student record found');
    } else {
      data.forEach(doc => {
        const student = new Student(
          doc.id,
          doc.data().firstName,
          doc.data().lastName,
          doc.data().fatherName,
          doc.data().class,
          doc.data().age,
          doc.data().phoneNumber,
          doc.data().subject,
          doc.data().year,
          doc.data().semester,
          doc.data().status
        );
        studentArray.push(student);
      });

      res.send(studentArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await firestore.collection(collection).doc(id);
    const data = await student.get();

    if (!data.exists) {
      res.status(404).send('Student with the given ID not found');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const student = await firestore.collection(collection).doc(id);
    await student.update(data);
    res.send('Student record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection(collection).doc(id).delete();
    res.send('Record deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addStudent,
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
