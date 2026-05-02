import { AddPhotoAlternate, CloudUpload, Movie, MovieFilter } from "@mui/icons-material";
import { Alert, Box, Button, Container, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { crearPelicula } from "../service/peliculasService";

type AddPelicula = {
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string
}

const DefaultAddPelicula: AddPelicula = {
    nombre: "",
    portada: "",
    descripcion: "",
    director: "",
    genero: "",
    valoracion: 0,
    urlVideo: ""
}

export default function SubirPelicula() {
    const [addPelicula, setAddPelicula] = useState<AddPelicula>(DefaultAddPelicula);
    const [useErrorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [archivoBinario, setArchivoBinario] = useState<File | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const crearNombre = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAddPelicula({
            ...addPelicula,
            nombre: e.target.value,
        });
    }

    const crearPortada = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        setAddPelicula({
            ...addPelicula,
            portada: e.target.value,
        });
        if (value && value !== "") {
            setAlertText("Imagen de portada adjuntada correctamente");
            setOpenAlert(true);
        }
    }

    const crearDescripcion = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAddPelicula({
            ...addPelicula,
            descripcion: e.target.value,
        });
    }

    const crearDirector = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAddPelicula({
            ...addPelicula,
            director: e.target.value,
        });
    }

    const crearGenero = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAddPelicula({
            ...addPelicula,
            genero: e.target.value,
        });
    }

    const crearValoracion = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAddPelicula({
            ...addPelicula,
            valoracion: Number(e.target.value),
        });
    }

    const crearUrlVideo = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setArchivoBinario(file);

            setAddPelicula({
                ...addPelicula,
                urlVideo: file.name,
            });
                setAlertText("Archivo de video adjuntado correctamente");
                setOpenAlert(true);

        }
    }

    const botonPublicarPelicula = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const respuesta = await crearPelicula(addPelicula, archivoBinario);

            if(respuesta.ok && respuesta.data) {
                setErrorMsg("");
                alert("Pelicula publicada");
                setAddPelicula(addPelicula);

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/")
                },3000);
            } else {
                setErrorMsg("Error al publicar la pelicula")
                console.warn("Reintentar")
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f7fafc', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: -2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 }, justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, backgroundColor: '#edf2f7', borderRadius: 6, width: '100%', maxWidth: '950px', boxSizing: 'border-box', border: '1px solid #cbd5e0', display: 'flex', flexDirection: 'column' }}>
                    
                    {useErrorMsg ? (
                        <Box
                            id="error-message"
                            sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#f70505', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                            Vaya, ha ocurrido un error. En este momento estamos trabajando en ello: {useErrorMsg}
                        </Box>
                    ) : (

                        <>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 4 }}>
                                <MovieFilter sx={{ color: '#005f8a', fontSize: 45 }} />
                                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -2, background: 'linear-gradient(90deg, #003a54 0%, #005f8a 50%, #00a8e8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '2.2rem', md: '3rem' } }}>
                                    Subir Película
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#2d3748', mt: 0.5, fontWeight: 700, fontSize: '1rem', letterSpacing: 1.5 }}>
                                    NUEVO CONTENIDO
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        <TextField fullWidth label="Nombre de la Película" variant="outlined" onChange={crearNombre} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        
                                        <TextField fullWidth label="Director" variant="outlined" onChange={crearDirector} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        
                                        <TextField fullWidth label="Géneros" variant="outlined" placeholder="Acción, Drama..." onChange={crearGenero} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                        <TextField fullWidth label="Descripción" variant="outlined" multiline rows={5} onChange={crearDescripcion} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                        <TextField fullWidth label="Valoración" variant="outlined" placeholder="1-10" type="number" onChange={crearValoracion} slotProps={{ htmlInput: { min: 1, max: 10, step: 0.1 } }} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
                                        <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f0f7fa', borderColor: '#00a8e8', transform: 'scale(1.01)' } }}>
                                            <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" onChange={crearPortada} />
                                            <label htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%' }}>
                                                <AddPhotoAlternate sx={{ fontSize: 40, color: '#005f8a', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#1a1a2e', fontSize: '1.1rem' }}>Imagen de Portada</Typography>
                                                <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>JPG, PNG o WEBP</Typography>
                                            </label>
                                        </Box>

                                        <TextField 
                                            fullWidth 
                                            label="Enlace URL de la Portada" 
                                            variant="outlined" 
                                            placeholder="https://ejemplo.com/imagen.jpg" 
                                            onChange={crearPortada}
                                            sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} 
                                        />

                                        <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f0f7fa', borderColor: '#00a8e8', transform: 'scale(1.01)' } }}>
                                            <input accept="video/*" style={{ display: 'none' }} id="upload-video" type="file" onChange={crearUrlVideo} />
                                            <label htmlFor="upload-video" style={{ cursor: 'pointer', width: '100%' }}>
                                                <Movie sx={{ fontSize: 40, color: '#005f8a', mb: 1 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#1a1a2e', fontSize: '1.1rem' }}>Archivo de Video</Typography>
                                                <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>Sube el metraje final</Typography>
                                            </label>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={botonPublicarPelicula} disabled={loading} startIcon={<CloudUpload />} sx={{ bgcolor: '#005f8a', borderRadius: 4, textTransform: 'none', fontWeight: 900, py: 1.8, px: 8, fontSize: '1.1rem', boxShadow: 'none', '&:hover': { bgcolor: '#004a6d', boxShadow: '0 10px 20px rgba(0,95,138,0.2)' } }}>
                                    Publicar Película
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setOpenAlert(false)} severity="success" variant="filled" sx={{ width: '100%', fontWeight: 700, borderRadius: 3 }}>
                    {alertText}
                </Alert>
            </Snackbar>
        </Box>
    );
}