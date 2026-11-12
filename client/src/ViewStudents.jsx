
import { useEffect, useState } from 'react'
import axios from 'axios'
import './ViewStudents.css'

function ViewStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://studentmanagement-ln6q.onrender.com/students')
        setStudents(response.data)
      } catch (error) {
        console.error('Error fetching students:', error)
        alert('Unable to load students')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  if (loading) {
    return <h2>Loading students...</h2>
  }

  return (
    <div className="students-container">
      <h1>All Students</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
          <div className="student-card" key={student._id}>
            <h3>{student.name}</h3>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Year:</strong> {student.year}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default ViewStudents
