import { useEffect, useState } from "react";
import "../styles/App.scss";
import callToApi from "../services/api";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    callToApi().then((response) => {
      setStudents(response);
    });
  }, []);

  const renderStudents = students.map((student, index) => {
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
      </table>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <h2>Añadir una adalaber</h2>
        <label>Nombre:</label>
        <input type="text" />
        <label>Tutor/a:</label>
        <input type="text" />
        <label>Especialidad:</label>
        <input type="text" />
        <button>Añadir nueva adalaber</button>
      </form>
    </div>
  );
}

export default App;
