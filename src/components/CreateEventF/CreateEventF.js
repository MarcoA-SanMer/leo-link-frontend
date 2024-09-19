import React, {useEffect ,useState } from 'react';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import './CreateEventF.css';
import Swal from 'sweetalert2';

const CreateEventF = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaPrincipal, setCategoriaPrincipal] = useState('');
    const [categoriasAsociadas, setCategoriasAsociadas] = useState([]);

    // Campos Caracteristicos
    const [fechaEvento, setFechaEvento] = useState('');
    const [horaEvento, setHoraEvento] = useState('');
    const [hostEvento, setHostEvento] = useState('');
    const [fechaFinEvento, setFechaFinEvento] = useState('');
    const [horaFinEvento, setHoraFinEvento] = useState('');
    const [lugarEvento, setLugarEvento] = useState('');


    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories/');
                const categoriasEvento = response.data.filter(categoria => categoria.tipo_e === 'evento');
                setCategorias(categoriasEvento);

            } catch (error) {
                setError('Error fetching categories');
            }
        };
        
        fetchCategories();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación de los nuevos campos
        if (!fechaEvento || !horaEvento || !hostEvento || !fechaFinEvento || !horaFinEvento || !lugarEvento) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos del evento marcados en rojo son obligatorios',
            });
            return;
        }

        if (!nombre.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre es obligatorio',
            });
            return;
        }
    
        if (!descripcion.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La descripción es obligatoria',
            });
            return;
        }
    
        if (!categoriaPrincipal) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La categoría principal es obligatoria',
            });
            return;
        }
    
        const token = localStorage.getItem('access');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No token found',
            });
            return;
        }
    
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        if (imagen) {
            formData.append('imagen', imagen);
        }
        formData.append('categoria_p', categoriaPrincipal);
        formData.append('categorias_ids', categoriasAsociadas.filter(id => id !== categoriaPrincipal).join(',')); // Excluye la categoría principal si está en categorías asociadas
        // Campos caracteristicos
        formData.append('fecha_evento', fechaEvento);
        formData.append('hora_evento', horaEvento);
        formData.append('host_evento', hostEvento);
        formData.append('fecha_fin_evento', fechaFinEvento);
        formData.append('hora_fin_evento', horaFinEvento);
        formData.append('lugar_evento', lugarEvento);
        try {
            await axios.post('http://localhost:8000/api/events/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Evento agregado',
                text: 'Se ha acreado el Evento con éxito',
            });
            setNombre('');
            setDescripcion('');
            setImagen(null);
            setCategoriaPrincipal('');
            setCategoriasAsociadas([]);
            setFechaEvento('');
            setHoraEvento('');
            setHostEvento('');
            setFechaFinEvento('');
            setHoraFinEvento('');
            setLugarEvento('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error creando el evento',
            });
        }
    };

    return (
        <div>
            {/* <UserNavbar/> */}
            <div className="bg-light">
                <div className="container-fluid single-section bg-light d-flex">
                    <div className="container align-self-center justify-content-center d-flex">
                    <div className="row">
                        <div className="justify-content-center text-center text-light">
                        <h1 className="main-register-title mt-5">Crear un nuevo evento</h1>
                        </div>
                        <div className="col-12 bg-light p-5 form-register bg-light">
                            <form className="m-auto p-5" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre <span className='text-danger'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripción <span className='text-danger'>*</span></label>
                                    <textarea
                                        className="form-control"
                                        id="descripcion"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">Imagen (Opcional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="imagen"
                                        accept="image/*"
                                        onChange={(e) => setImagen(e.target.files[0])}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="categoriaPrincipal" className="form-label">Categoría Principal <span className='text-danger'>*</span></label>
                                    <select
                                        className="form-select"
                                        id="categoriaPrincipal"
                                        value={categoriaPrincipal}
                                        onChange={(e) => setCategoriaPrincipal(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria.id} value={categoria.nombre}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="categoriasAsociadas" className="form-label">Categorías Asociadas (Opcionales)</label>
                                    <select
                                        className="form-select"
                                        id="categoriasAsociadas"
                                        multiple
                                        value={categoriasAsociadas}
                                        onChange={(e) => setCategoriasAsociadas([...e.target.selectedOptions].map(option => option.value))}
                                    >
                                        {categorias.map(categoria => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Campos caracteristicos */}
                                <div className="mb-3">
                                    <label htmlFor="fechaEvento" className="form-label">Fecha del Evento <span className='text-danger'>*</span></label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fechaEvento"
                                        value={fechaEvento}
                                        onChange={(e) => setFechaEvento(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="horaEvento" className="form-label">Hora del Evento <span className='text-danger'>*</span></label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="horaEvento"
                                        value={horaEvento}
                                        onChange={(e) => setHoraEvento(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="hostEvento" className="form-label">Host del Evento <span className='text-danger'>*</span></label>
                                    <select
                                        className="form-select"
                                        id="hostEvento"
                                        value={hostEvento}
                                        onChange={(e) => setHostEvento(e.target.value)}
                                    >
                                        <option value="">Selecciona un host</option>
                                        <option value="Cucei">Cucei</option>
                                        <option value="Empresa">Empresa</option>
                                        <option value="Consejo estudiantil">Consejo Estudiantil</option>
                                        <option value="Docente">Docente</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fechaFinEvento" className="form-label">Fecha de Fin del Evento <span className='text-danger'>*</span></label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fechaFinEvento"
                                        value={fechaFinEvento}
                                        onChange={(e) => setFechaFinEvento(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="horaFinEvento" className="form-label">Hora de Fin del Evento <span className='text-danger'>*</span></label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="horaFinEvento"
                                        value={horaFinEvento}
                                        onChange={(e) => setHoraFinEvento(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="lugarEvento" className="form-label">Lugar del Evento <span className='text-danger'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lugarEvento"
                                        value={lugarEvento}
                                        onChange={(e) => setLugarEvento(e.target.value)}
                                    />
                                </div>
                                
                                <button type="submit" className="btn btn-primary mt-3">Crear Evento</button>

                                {error && <div className="mt-3 text-danger">{error}</div>}
                                {success && <div className="mt-3 text-success">{success}</div>}
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEventF;