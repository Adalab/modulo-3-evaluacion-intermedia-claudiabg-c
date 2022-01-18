import { useEffect, useState } from "react";
import "../styles/App.scss";
import callToApi from "../services/api";

function App() {
  const [students, setStudents] = useState([]);
  const [newStudentInput, setNewStudentInput] = useState({
    name: "",
    tutor: "",
    specialty: "",
  });
  const [newStudent, setNewStudent] = useState([]);

  useEffect(() => {
    callToApi().then((response) => {
      setStudents(response);
    });
  }, []);

  const handleInput = (ev) => {
    const dataNewStudent = ev.currentTarget.name;
    setNewStudentInput({
      ...newStudentInput,
      [dataNewStudent]: ev.currentTarget.value,
    });
  };

  console.log(newStudentInput);

  const handleAddBtn = () => {
    const addNewStudent = {
      name: newStudentInput.name,
      tutor: newStudentInput.tutor,
      specialty: newStudentInput.specialty,
    };
    setNewStudent([...newStudent, addNewStudent]);
    const addToStudents = students.push(addNewStudent);
    setStudents(students);
  };

  const renderStudents = students.map((student, index) => {
    return (
      <tr key={index}>
        <td>{student.name}</td>
        <td>{student.tutor}</td>
        <td>{student.specialty}</td>
      </tr>
    );
  });

  const renderNewStudents = newStudent.map((student, index) => {
    return (
      <tr key={index}>
        <td>{student.name}</td>
        <td>{student.tutor}</td>
        <td>{student.specialty}</td>
      </tr>
    );
  });

  return (
    <div className="App">
      <h1>Adalabers</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutor/a</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>{renderStudents}</tbody>
        <tbody>{renderNewStudents}</tbody>
      </table>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <h2>Añadir una adalaber</h2>
        <label>Nombre:</label>
        <input type="text" name="name" onChange={handleInput} />
        <label>Tutor/a:</label>
        <input type="text" name="tutor" onChange={handleInput} />
        <label>Especialidad:</label>
        <input type="text" name="specialty" onChange={handleInput} />
        <button onClick={handleAddBtn}>Añadir nueva adalaber</button>
      </form>
    </div>
  );
}

export default App;
