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
  const [searchStudent, setSearchStudent] = useState("");

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

  const handleAddBtn = () => {
    if (
      newStudentInput.name !== "" &&
      newStudentInput.tutor !== "" &&
      newStudentInput.specialty !== ""
    ) {
      const addNewStudent = {
        name: newStudentInput.name,
        tutor: newStudentInput.tutor,
        specialty: newStudentInput.specialty,
      };
      setNewStudent([...newStudent, addNewStudent]);
    }
    setNewStudentInput({
      name: "",
      tutor: "",
      specialty: "",
    });
  };

  const handleInputSearch = (event) => {
    setSearchStudent(event.target.value);
  };

  const handleSelect = (ev) => {
    const tutorData = ev.target.name;
    setStudents({
      ...students,
      [tutorData]: ev.target.value,
    });
  };

  const renderStudents = () => {
    return students
      .filter((student) => {
        return student.name.toLowerCase().includes(searchStudent.toLowerCase());
      })
      .map((student, index) => {
        return (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.tutor}</td>
            <td>{student.specialty}</td>
          </tr>
        );
      });
  };

  const renderNewStudents = () => {
    return newStudent
      .filter((student) => {
        return student.name.toLowerCase().includes(searchStudent.toLowerCase());
      })
      .map((student, index) => {
        return (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.tutor}</td>
            <td>{student.specialty}</td>
          </tr>
        );
      });
  };

  return (
    <div className="App">
      <h1>Adalabers</h1>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <label>Nombre: </label>
        <input
          type="text"
          placeholder="Ej: MariCarmen"
          onChange={handleInputSearch}
        />
        <label>Escoge una tutora: </label>
        <select
          name="select"
          id="select"
          defaultValue="select"
          onChange={handleSelect}
        >
          <option value="select" disabled>
            Escoge una opción
          </option>
          <option value="yanelis">Yanelis</option>
          <option value="dayana">Dayana</option>
          <option value="ivan">Iván</option>
          <option value="miguel">Miguel</option>
        </select>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutor/a</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>{renderStudents()}</tbody>
        <tbody>{renderNewStudents()}</tbody>
      </table>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <h2>Añadir una adalaber</h2>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={newStudentInput.name}
          onChange={handleInput}
        />
        <label>Tutor/a:</label>
        <input
          type="text"
          name="tutor"
          value={newStudentInput.tutor}
          onChange={handleInput}
        />
        <label>Especialidad:</label>
        <input
          type="text"
          name="specialty"
          value={newStudentInput.specialty}
          onChange={handleInput}
        />
        <button onClick={handleAddBtn}>Añadir nueva adalaber</button>
      </form>
    </div>
  );
}

export default App;
