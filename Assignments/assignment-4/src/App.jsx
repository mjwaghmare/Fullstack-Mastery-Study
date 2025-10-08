import './App.css'
import CustomButton from './components/custom_button'
import EmployeeCard from './components/custom_card'

function App() {

  const employees = [
    { name: "John Doe", designation: "Software Engineer" },
    { name: "Jane Smith", designation: "Product Manager" },
    { name: "Sam Wilson", designation: "UI/UX Designer" },
    { name: "Alice Brown", designation: "QA Engineer" },
    { name: "Bob Johnson", designation: "DevOps Engineer" },
    { name: "Charlie Davis", designation: "Backend Developer" },
    { name: "Emma White", designation: "Frontend Developer" },
    { name: "Liam Taylor", designation: "Data Scientist" }
  ]

  return (
    <div>
      <h1>Employee List</h1>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {employees.map((emp, index) => (
          <EmployeeCard
            key={index}
            name={emp.name}
            designation={emp.designation}
          />
        ))}
      </div>
    </div>
  )
}

export default App
