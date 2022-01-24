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
  const [searchTutor, setSearchTutor] = useState("");

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

  console.log(students);

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
    const tutorData = ev.currentTarget.value;
    setSearchTutor(tutorData);
  };

  const renderStudentsSelect = students
    .filter((student) => {
      return student.tutor
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(`${searchTutor}`);
    })
    .map((student) => {
      return (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.tutor}</td>
          <td>{student.specialty}</td>
          <td>
            {student.social.map((eachData) => (
              <a href={eachData.url}>{eachData.name}</a>
            ))}
          </td>
        </tr>
      );
    });

  const renderStudents = () => {
    if (searchTutor === "select") {
      return students
        .filter((student) => {
          return student.name
            .toLowerCase()
            .includes(searchStudent.toLowerCase());
        })

        .map((student) => {
          return (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.tutor}</td>
              <td>{student.specialty}</td>
            </tr>
          );
        });
    }
  };

  const renderNewStudents = () => {
    return newStudent
      .filter((student) => {
        return student.name.toLowerCase().includes(searchStudent.toLowerCase());
      })
      .map((student, index) => {
        return (
          <tr key={index}>
            <td>
              {student.name.charAt(0).toUpperCase() + student.name.slice(1)}
            </td>
            <td>
              {student.tutor.charAt(0).toUpperCase() + student.tutor.slice(1)}
            </td>
            <td>
              {student.specialty.charAt(0).toUpperCase() +
                student.specialty.slice(1)}
            </td>
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
        <label>Escoge un tutor: </label>
        <select
          name="select"
          id="select"
          defaultValue="select"
          onChange={handleSelect}
        >
          <option value="select">Todos los tutores</option>
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
            <th>Redes sociales</th>
          </tr>
        </thead>
        <tbody>{renderStudents()}</tbody>
        <tbody>{renderNewStudents()}</tbody>
        <tbody>{renderStudentsSelect}</tbody>
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
