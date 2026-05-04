import { AddPhotoAlternate, Close, CloudUpload, Movie, MovieFilter, CheckCircle } from "@mui/icons-material";
import { Box, Button, Container, Grid, Input, Paper, TextField, Typography, LinearProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { crearPelicula } from "../service/peliculasService";
import Footer from "../components/Footer";

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
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const [archivoBinario, setArchivoBinario] = useState<File | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    const crearNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, nombre: e.target.value });
    }

    const crearPortada = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, portada: e.target.value });
    }

    const eliminarPortada = () => {
        setAddPelicula({ ...addPelicula, portada: "" });
    };

    const crearDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, descripcion: e.target.value });
    }

    const crearDirector = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, director: e.target.value });
    }

    const crearGenero = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, genero: e.target.value });
    }

    const crearValoracion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, valoracion: Number(e.target.value) });
    }

    const crearUrlVideoManual = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPelicula({ ...addPelicula, urlVideo: e.target.value });
        setArchivoBinario(null);
    }

    const crearUrlVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setArchivoBinario(file);
            setAddPelicula({ ...addPelicula, urlVideo: file.name });
        }
    }

    const eliminarVideo = () => {
        setArchivoBinario(null);
        setAddPelicula({ ...addPelicula, urlVideo: "" });
    };

    const botonPublicarPelicula = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setProgress(0);
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 95) return 95;
                const diff = Math.random() * 15; 
                return Math.min(oldProgress + diff, 95);
            });
        }, 150); 
        try {
            const respuesta = await crearPelicula(addPelicula, archivoBinario as File);
            if (respuesta.ok && respuesta.data) {
                clearInterval(timer);
                setProgress(100);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/");
                }, 800);
            } else {
                clearInterval(timer);
                setLoading(false);
                setProgress(0);
                setErrorMsg("Error al publicar la pelicula");
            }
        } catch (error) {
            clearInterval(timer);
            setLoading(false);
            setProgress(0);
            console.error(error);
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 }, justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={0} sx={{ 
                    p: { xs: 3, md: 5 }, 
                    background: 'linear-gradient(135deg, #e0f2f9 0%, #fff0e6 100%)', 
                    borderRadius: { xs: 0, md: 6 }, 
                    width: '100%', 
                    maxWidth: '1000px', 
                    boxSizing: 'border-box', 
                    border: '2px solid #fff', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)' 
                }}>
                    
                    {loading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12, gap: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#005f8a', textAlign: 'center' }}>
                                PUBLICANDO CONTENIDO...
                            </Typography>
                            <Box sx={{ width: '100%', maxWidth: '700px' }}>
                                <LinearProgress variant="determinate" value={progress} sx={{ height: 16, borderRadius: 8, bgcolor: 'rgba(0,0,0,0.05)', '& .MuiLinearProgress-bar': { borderRadius: 8, background: 'linear-gradient(90deg, #005f8a, #f06b06)' } }} />
                                <Typography sx={{ color: '#005f8a', mt: 3, textAlign: 'center', fontWeight: 900, fontSize: '1.2rem' }}>{Math.round(progress)}% COMPLETADO</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <>
                            {useErrorMsg && (
                                <Box sx={{ mb: 4, borderRadius: 3, border: '1px solid #f70505', backgroundColor: '#fff5f5', p: 2, color: '#f70505', textAlign: 'center', fontWeight: 900 }}>
                                    {useErrorMsg}
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 4 }}>
                                <MovieFilter sx={{ color: '#005f8a', fontSize: 50 }} />
                                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -2, color: '#005f8a', fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
                                    Subir Película
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#f06b06', mt: 0.5, fontWeight: 800, fontSize: '1.1rem', letterSpacing: 2 }}>
                                    CENTRO DE CONTROL
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
                                        <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: 'rgba(0, 95, 138, 0.05)', cursor: (addPelicula.portada && !addPelicula.portada.startsWith('http')) ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(0, 95, 138, 0.1)' }, opacity: (addPelicula.portada && addPelicula.portada.startsWith('http')) ? 0.5 : 1 }}>
                                            {addPelicula.portada && !addPelicula.portada.startsWith('http') ? (
                                                <Box sx={{ bgcolor: '#005f8a', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                                                    <CheckCircle />
                                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>IMAGEN LISTA</Typography>
                                                    <IconButton size="small" onClick={eliminarPortada} sx={{ color: '#fff', ml: 1 }}><Close fontSize="small" /></IconButton>
                                                </Box>
                                            ) : (
                                                <Button component="label" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textTransform: 'none', color: '#005f8a', '&:hover': { background: 'transparent' }, cursor: addPelicula.portada.startsWith('http') ? 'default' : 'pointer' }} disabled={addPelicula.portada.startsWith('http')}>
                                                    <AddPhotoAlternate sx={{ fontSize: 40, mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.1rem' }}>Imagen de Portada</Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>JPG, PNG o WEBP</Typography>
                                                    <Input type="file" onChange={crearPortada} slotProps={{ input: { accept: 'image/*' } }} sx={{ display: 'none' }} />
                                                </Button>
                                            )}
                                        </Box>

                                        <TextField fullWidth label="Enlace URL de Portada" variant="outlined" placeholder="https://..." value={addPelicula.portada} onChange={crearPortada} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                        <Box sx={{ flex: 1, border: '2px dashed #f06b06', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: 'rgba(240, 107, 6, 0.05)', cursor: (addPelicula.urlVideo && !archivoBinario) ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(240, 107, 6, 0.1)' }, opacity: (addPelicula.urlVideo && !archivoBinario) ? 0.5 : 1 }}>
                                            {archivoBinario ? (
                                                <Box sx={{ bgcolor: '#f06b06', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                                                    <Movie />
                                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>VIDEO LISTO</Typography>
                                                    <IconButton size="small" onClick={eliminarVideo} sx={{ color: '#fff', ml: 1 }}><Close fontSize="small" /></IconButton>
                                                </Box>
                                            ) : (
                                                <Button component="label" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textTransform: 'none', color: '#f06b06', '&:hover': { background: 'transparent' } }} disabled={!!addPelicula.urlVideo && !archivoBinario}>
                                                    <Movie sx={{ fontSize: 40, mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.1rem' }}>Archivo de Video</Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Sube el metraje final</Typography>
                                                    <Input type="file" onChange={crearUrlVideo} slotProps={{ input: { accept: 'video/*' } }} sx={{ display: 'none' }} />
                                                </Button>
                                            )}
                                        </Box>
                                        <TextField fullWidth label="Enlace URL de Video" variant="outlined" placeholder="https://..." value={archivoBinario ? "" : addPelicula.urlVideo} onChange={crearUrlVideoManual} disabled={!!archivoBinario} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={botonPublicarPelicula} startIcon={<CloudUpload />} sx={{ bgcolor: '#005f8a', color: '#fff', borderRadius: 4, textTransform: 'none', fontWeight: 900, py: 2, px: 10, fontSize: '1.2rem', '&:hover': { bgcolor: '#004a6d', transform: 'translateY(-3px)' } }}>
                                    Publicar Película
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}