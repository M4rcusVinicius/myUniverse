import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { userService, alertService } from "services";

export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("First Name is required"),
    curse: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    gender: Yup.string(),
    birth: Yup.string(),
    about: Yup.string(),
    hobbies: Yup.string(),
    quote: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  }

  function createUser(data) {
    return userService
      .register(data)
      .then(() => {
        alertService.success("Usuário adicionado", {
          keepAfterRouteChange: true,
        });
        router.push(".");
      })
      .catch(alertService.error);
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success("Usuário atualizado", {
          keepAfterRouteChange: true,
        });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Nome completo</label>
        <input
          name="name"
          type="text"
          {...register("name")}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.name?.message}</div>
      </div>
      <div className="form-group">
        <label>Curso</label>
        <input
          name="curse"
          type="text"
          {...register("curse")}
          className={`form-control ${errors.curse ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.curse?.message}</div>
      </div>
      <div className="form-group">
        <label>Numero de inscrição</label>
        <input
          name="username"
          type="text"
          {...register("username")}
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </div>
      <div className="form-group">
        <label>
          Senha
          {!isAddMode && (
            <em className="ml-1">(Deixe em branco para não alterar a senha)</em>
          )}
        </label>
        <input
          name="password"
          type="password"
          {...register("password")}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>

      <div className="form-group">
        <label>Gênero</label>
        <input
          name="gender"
          type="text"
          {...register("gender")}
          className={`form-control ${errors.gender ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.gender?.message}</div>
      </div>

      <div className="form-group">
        <label>Nacionalidade</label>
        <input
          name="birth"
          type="text"
          {...register("birth")}
          className={`form-control ${errors.birth ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.birth?.message}</div>
      </div>

      <div className="form-group">
        <label>Sobre</label>
        <input
          name="about"
          type="text"
          {...register("about")}
          className={`form-control ${errors.about ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.about?.message}</div>
      </div>

      <div className="form-group">
        <label>Hobbies</label>
        <input
          name="hobbies"
          type="text"
          {...register("hobbies")}
          className={`form-control ${errors.hobbies ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.hobbies?.message}</div>
      </div>

      <div className="form-group">
        <label>Citação</label>
        <input
          name="quote"
          type="text"
          {...register("quote")}
          className={`form-control ${errors.quote ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.quote?.message}</div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/users" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
}
