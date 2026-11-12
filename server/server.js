
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error))

// Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Student = mongoose.model('Student', studentSchema)

// POST API - Add Student
app.post('/students', async (req, res) => {
  try {
    const { name, department, year } = req.body

    const student = new Student({
      name,
      department,
      year
    })

    await student.save()

    res.status(201).json({
      message: 'Student added successfully',
      student
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error adding student',
      error: error.message
    })
  }
})

// GET API - View All Students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 })
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving students',
      error: error.message
    })
  }
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
