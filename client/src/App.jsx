
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [student, setStudent] = useState({
    name: '',
    department: '',
    year: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post('/students', {
        ...student,
        year: Number(student.year)
      })

      alert('Student added successfully!')

      setStudent({
        name: '',
        department: '',
        year: ''
      })
    } catch (error) {
      console.error('Error adding student:', error)
      alert(
        error.response?.data?.message ||
        'Unable to add student. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <div className="navigation">
        <Link to="/">Add Student</Link>
        <Link to="/viewStudents">View Students</Link>
      </div>

      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Student Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter student name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          placeholder="Enter department"
          value={student.department}
          onChange={handleChange}
          required
        />

        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          placeholder="Enter year (1-4)"
          min="1"
          max="4"
          value={student.year}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  )
}

export default App
