import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Informe o nome'),
        curse: Yup.string()
            .required('Informe o curso'),
        username: Yup.string()
            .required('Informe o número de matrícula'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('A senha é obrigatória') : null)
            .min(6, 'A senha deve tr mais de 6 caracteres')
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
        return isAddMode
            ? createUser(data)
            : updateUser(user.id, data);
    }

    function createUser(data) {
        return userService.register(data)
            .then(() => {
                alertService.success('Usuário adicionado', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('Usuário atualizado', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Nome</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Curso</label>
                    <input name="curse" type="text" {...register('curse')} className={`form-control ${errors.curse ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.curse?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Número de matrícula</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>
                        Senha
                        {!isAddMode && <em className="ml-1">(Deixe em branco para não alterar a senha)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}