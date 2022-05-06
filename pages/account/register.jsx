import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("First Name is required"),
    curse: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
    gender: Yup.string(),
    birth: Yup.string(),
    about: Yup.string(),
    hobbies: Yup.string(),
    quote: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        alertService.success("Registration successful", {
          keepAfterRouteChange: true,
        });
        router.push("login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Nome completo</label>
              <input
                name="name"
                type="text"
                {...register("name")}
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.name?.message}
              </div>
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
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            
            <div className="form-group">
              <label>Gênero</label>
              <input
                name="gender"
                type="text"
                {...register("gender")}
                className={`form-control ${
                  errors.gender ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.gender?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Nacionalidade</label>
              <input
                name="birth"
                type="text"
                {...register("birth")}
                className={`form-control ${
                  errors.birth ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.birth?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Sobre</label>
              <input
                name="about"
                type="text"
                {...register("about")}
                className={`form-control ${
                  errors.about ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.about?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Hobbies</label>
              <input
                name="hobbies"
                type="text"
                {...register("hobbies")}
                className={`form-control ${
                  errors.hobbies ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.hobbies?.message}
              </div>
            </div>

            <div className="form-group">
              <label>Citação</label>
              <input
                name="quote"
                type="text"
                {...register("quote")}
                className={`form-control ${
                  errors.quote ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.quote?.message}
              </div>
            </div>

            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Register
            </button>
            <Link href="/account/login" className="btn btn-link">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
