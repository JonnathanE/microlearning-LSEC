import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import tw from 'twin.macro';
// import { NavLink } from 'react-router-dom';
import { addLesson, getModules } from '../../api/apiCallsAdmin';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Container = tw.div`
    p-5 flex flex-col items-center gap-5
`;

const Title = tw.h2`
    font-bold text-xl text-gray-400
`;

const Form = tw.form`
    flex flex-col gap-13 justify-center items-center mb-4
`;

const FormGroup = tw.div`
    w-full sm:w-2/5 flex flex-col
`;

const AddLesson = () => {

    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        name: yup.string().required('El nombre de la lección es requerido'),
        module: yup.string().ensure().required('Debe de elegir un módulo'),
        icon: yup.mixed().test("fileSize", "El icono debe ser 1MB", (value) => {
            if (value.length === 0) return false;
            return value[0].size <= 1000000;
        })
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // submit method
    const clickSubmit = async data => {
        let formData = new FormData();
        setLoading(true);
        formData.append('name', data.name);
        formData.append('module', data.module);
        formData.append('icon', data.icon[0]);
        try {
            await addLesson(formData);
            setLoading(false);
            MySwal.fire('¡Lección creado con éxito!', '', 'success');
            reset({
                name: '',
                module: 'Selecciona Módulo',
                icon: ''
            });
        } catch (error) {
            setLoading(false);
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
            })
        }
    };

    const init = async () => {
        try {
            const res = await getModules();
            setModules(res);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se cargaron los módulos. Intente de nuevo.'
            })
        }
    }

    useEffect(() => {
        init();
    }, [])

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <Form onSubmit={handleSubmit(clickSubmit)}>
            <FormGroup>
                <label htmlFor="iconFile">Icono
                </label>
                <input type='file' accept='image/*' {...register('icon')} id='iconFile' className='' data-testid='inputFileIcon' />
                {errors.icon && errorValidator(errors.icon.message)}
            </FormGroup>
            <FormGroup>
                <label>Nombre de la lección</label>
                <input type="text" {...register('name')} className='dark:bg-gray-800' data-testid='inputName' />
                {errors.name && errorValidator(errors.name.message)}
            </FormGroup>
            <FormGroup>
                <label>Módulo</label>
                <select type='text' {...register('module')} className='dark:bg-gray-800' >
                    <option value=''>Selecciona Módulo</option>
                    {modules && modules.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
                {errors.module && errorValidator(errors.module.message)}
            </FormGroup>
            {/* <NavLink to='/admin/dashboard'>
                <button type='button' className="btn btn-danger ms-4 me-4">Regresar</button>
            </NavLink> */}
            <input type='submit' className="w-36 p-3 rounded-xl bg-bookmark-cyan-500 hover:bg-bookmark-cyan-400 text-white font-bold cursor-pointer" value="Crear" />
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
                    <Title className='text-start'>Crear nueva Lección</Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default AddLesson;