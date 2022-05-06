import { userService } from "services";
import { Link } from "components";

export default Home;

function Home() {
  const user = userService.userValue;
  return (
    <div className="p-4">
      <div className="container">
        <h1>Hi {user.name}!</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Titulo</th>
              <th style={{ width: "70%" }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Número de inscrição</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Curso</th>
              <td>{user.curse}</td>
            </tr>
            <tr>
              <th>ID</th>
              <td>{user.id}</td>
            </tr>
          </tbody>
        </table>
        <p>
          <Link
            href={`/users/edit/${user.id}`}
            className="btn btn-sm btn-primary mr-1"
          >
            Editar
          </Link>
        </p>
      </div>
    </div>
  );
}
