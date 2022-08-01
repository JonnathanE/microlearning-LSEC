import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { getLessonById, updateLesson, getModules } from '../../api/apiCallsAdmin';
import tw from 'twin.macro';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Spinner from '../../components/Spinner/Spinner';
import UpdateIcon from '../../components/UpdateIcon/UpdateIcon';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Container = tw.div`
    p-5 flex flex-col items-center gap-5
`;

const Title = tw.h2`
    font-bold text-xl text-gray-600 dark:text-gray-400
`;

const Form = tw.form`
    flex flex-col gap-6 justify-center items-center mb-4 sm:px-9
`;

const FormGroup = tw.div`
    w-full lg:w-5/6 flex flex-col
`;

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
        <Form onSubmit={handleSubmit(clickSubmit)}>
            <FormGroup>
                <label>Nombre de la lección</label>
                <input type="text" {...register('name')} defaultValue={lesson.name} className='dark:bg-gray-800' data-testid='inputName' />
                {errors.name && errorValidator(errors.name.message)}
            </FormGroup>
            <FormGroup>
                <label>Módulo</label>
                <select type='text' {...register('module')} className='dark:bg-gray-800' >
                    <option value={singleModule ? singleModule._id : ''}>{singleModule ? singleModule.name : 'Seleccione un módulo'}</option>
                    {modules && modules.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.module && errorValidator(errors.module.message)}
            </FormGroup>
            {/* <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink> */}
            <input type='submit' className="w-36 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value="Actualizar" />
        </Form>
    )

    // shows loading when submit is executing
    const showLoading = () =>
        loading && (
            <Spinner />
        )

    return (
        <LayoutAdmin>
            <Container>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg'>
                    <Title className='text-start'>Actualizar lección: <span className='text-bookmark-cyan-500'>{lesson.name}</span></Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white flex flex-col sm:flex-row gap-2'>
                    {showLoading()}
                    <div className='flex-1 border p-2'>
                        {<UpdateIcon lesson={lesson} />}
                    </div>
                    <div className='flex-[1] border p-2'>
                        {lessonForm()}
                    </div>
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default UpdateLesson;