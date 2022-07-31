import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { updateModule, getModuleById } from '../../api/apiCallsAdmin';
import tw from 'twin.macro';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Container = tw.div`
    p-5 flex flex-col items-center gap-5
`;

const Title = tw.h2`
    font-bold text-xl text-gray-600 dark:text-gray-400
`;

const Form = tw.form`
    flex flex-col gap-6 justify-center items-center mb-4
`;

const FormGroup = tw.div`
    w-full sm:w-2/5 flex flex-col
`;

const UpdateModule = () => {

    const [module, setModule] = useState({});
    const [loading, setLoading] = useState(false);

    // get param moduleId for url
    const { moduleId } = useParams();

    const MySwal = withReactContent(Swal)

    // yup schema to validate inputs
    const schema = yup.object().shape({
        number: yup.number().positive().integer().required('Debe de ingresar el número de módulo'),
        name: yup.string().required('Requiere que ingrese un nombre para el módulo'),
    });

    // initialize the React Hook Form methods
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // load moduel for API
    const loadSingleModule = async moduelId => {
        try {
            const res = await getModuleById(moduelId);
            setModule(res);
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Lo sentimos, no se pudieron encontrar los datos'
            })
        }
    }

    useEffect(() => {
        loadSingleModule(moduleId);
    }, [])

    // submit method
    const clickSubmit = data => {
        setLoading(false);
        MySwal.fire({
            title: <p>¿Quieres guardar los cambios?</p>,
            showCancelButton: true,
            confirmButtonText: `Guardar cambios`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await updateModule(module._id, data)
                    setLoading(false);
                    MySwal.fire('¡Módulo actualizado con éxito!', '', 'success');
                } catch (error) {
                    setLoading(false);
                    MySwal.fire('¡Gurdado!', '', 'success');
                    loadSingleModule(moduleId);
                }
            }
        })
    };

    // shows the validation error of the inputs
    const errorValidator = (messageError) => (
        <p style={{ color: '#ff0000' }}>{messageError}</p>
    )

    // form structure
    const signInForm = () => (
        <Form onSubmit={handleSubmit(clickSubmit)}>
            <FormGroup>
                <label>Número de módulo</label>
                <input type="number" {...register('number')} defaultValue={module.number} className='dark:bg-gray-800' min={0} data-testid='inputNumber' />
                {errors.number && errorValidator(errors.number.message)}
            </FormGroup>
            <FormGroup>
                <label>Nombre</label>
                <input type="text" {...register('name')} defaultValue={module.name} className='dark:bg-gray-800' data-testid='inputName' />
                {errors.name && errorValidator(errors.name.message)}
            </FormGroup>
            {/* <NavLink to='/admin/showmodules'>
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
                    <Title className='text-start'>Modificar el módulo {module.name}</Title>
                </div>
                <div className='w-full p-3 bg-white dark:bg-gray-800 drop-shadow-lg dark:text-white'>
                    {showLoading()}
                    {signInForm()}
                </div>
            </Container>
        </LayoutAdmin>
    )
}

export default UpdateModule;