import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useParams } from 'react-router-dom';
import { getLessonById, updateLesson, getModules } from '../../api/apiCallsAdmin';

import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Spinner from '../../components/Spinner/Spinner';
import UpdateIcon from '../../components/UpdateIcon/UpdateIcon';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateLesson = () => {

    const [modules, setModules] = useState([]);
    const [singleModule, setSingleModule] = useState({});
    const [lesson, setLesson] = useState({});
    const [loading, setLoading] = useState(false);

    // get param moduleId for url
    const { lessonId } = useParams();

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        name: yup.string().required('El nombre de la lección es requerido'),
        module: yup.string().ensure().required('Debe de elegir un módulo'),
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = data => {
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await updateLesson(lesson._id, data);
                    setLoading(false);
                    MySwal.fire('¡La lección se actualizó correctamente!', '', 'success');
                } catch (error) {
                    setLoading(false);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un error al actualizar los datos. Intente de nuevo.'
                    })
                }
            }
        })
    }

    const allModules = async () => {
        try {
            const res = await getModules();
            setModules(res);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cargar los módulos. Intente de nuevo.'
            })
        }
    }

    const loadSingleLesson = async lessonId => {
        try {
            const res = await getLessonById(lessonId);
            setLesson(res);
            setSingleModule(res.module);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se cargaron los datos. Intente de nuevo.'
            })
        }
    }

    useEffect(() => {
        allModules();
        loadSingleLesson(lessonId);
    }, [])

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const lessonForm = () => (
        <form className="sign-box" onSubmit={handleSubmit(clickSubmit)}>
            <div className="form-group">
                <label className="text-muted">Nombre de la lección</label>
                <input type="text" {...register('name')} defaultValue={lesson.name} className='form-control' />
                {errors.name && errorValidator(errors.name.message)}
            </div>
            <div className='form-group'>
                <label className='text-muted'>Módulo</label>
                <select type='text' {...register('module')} className='form-select' >
                    <option value={singleModule ? singleModule._id : ''}>{singleModule ? singleModule.name : 'Seleccione un módulo'}</option>
                    {modules && modules.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.module && errorValidator(errors.module.message)}
            </div>
            <div className="form-group mb-3">
            </div>
            <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink>
            <input type='submit' className="btn btn-primary" />
        </form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <>
            <NavigationAdmin />
            <div className='container'>
                <div className='row'>
                    <h2 className='text-center mt-2'>Actualizar lección {lesson.name}</h2>
                </div>
                <div className='row'>
                    {showLoading()}
                    {<UpdateIcon lesson={lesson} />}
                    {lessonForm()}
                </div>
            </div>
        </>
    )
}

export default UpdateLesson;