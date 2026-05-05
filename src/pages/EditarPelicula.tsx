import { AddPhotoAlternate, CheckCircle, CloudUpload, Movie, MovieFilter } from "@mui/icons-material";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { editarPelicula, getOnePelicula } from "../service/peliculasService";

type DetallePelicula = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string
}

const DefaultDetallePelicula: DetallePelicula = {
    id: "",
    nombre: "",
    portada: "",
    descripcion: "",
    director: "",
    genero: "",
    valoracion: 0,
    urlVideo: ""
}

type EditarPelicula = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string
}

export default function EditarPelicula() {
    const [datosPelicula, setDatosPelicula] = useState<DetallePelicula>(DefaultDetallePelicula);
    const {id} = useParams() as {id: string};
    const navigate = useNavigate();
    const [useErrorMsg, setErrorMsg] = useState<string>('');
    const [archivoBinario, setArchivoBinario] = useState<File | null>(null);

    useEffect(()=>{
        if(id) {
            getOnePelicula(id).then(response => {
            if(response.ok && response.data){
                setDatosPelicula({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    portada: response.data.portada,
                    descripcion: response.data.descripcion,
                    director: response.data.director,
                    genero: response.data.genero,
                    valoracion: response.data.valoracion,
                    urlVideo: response.data.urlVideo
                });
            }else if(!response.ok) {
                console.log(response.error);
            } 
            }).catch((useErrorMsg: Error)=> {
                setErrorMsg(useErrorMsg.message)
            })
        }
    },[id])

    const editarNombre = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            nombre: a.target.value,
        })
    }

    const editarPortada = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            portada: a.target.value,
        })
    }

    const editarDescripcion = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            descripcion: a.target.value,
        })
    }

    const editarDirector = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            director: a.target.value,
        })
    }

    const editarGenero = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            genero: a.target.value,
        })
    }

    const editarValoracion = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            valoracion: Number(a.target.value),
        })
    }

    const editarUrlVideo = (a: React.ChangeEvent<HTMLInputElement>) => {
        if (a.target.files && a.target.files[0]) {
            const file = a.target.files[0];
            setArchivoBinario(file);
            setDatosPelicula({ ...datosPelicula, urlVideo: file.name });
        }
    }

    const editarUrlVideoTexto = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({
            ...datosPelicula,
            urlVideo: a.target.value,
        });
        setArchivoBinario(null);
    }

    const botonEditarPelicula = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!id) {
            return;
        }

        try {
            const peliculasEditadas: EditarPelicula ={
                id: datosPelicula.id,
                nombre: datosPelicula.nombre,
                portada: datosPelicula.portada,
                descripcion: datosPelicula.descripcion,
                director: datosPelicula.director,
                genero: datosPelicula.genero,
                valoracion: datosPelicula.valoracion,
                urlVideo: datosPelicula.urlVideo
            };
            const respuesta = await editarPelicula(id, peliculasEditadas, archivoBinario);

                if(respuesta.ok && respuesta.data) {
                    setErrorMsg("");
                    alert("Pelicula actualizada");
                    navigate(`/pelicula/${id}`)
                } else{
                    setErrorMsg("Error al actualizar la pelicula");
                    console.warn("Error al actualizar la pelicula");
                }
        }catch(error) {
            console.log(error);
        }
    }

    return(
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
                        <>
                            {useErrorMsg && (
                                <Box sx={{ mb: 4, borderRadius: 3, border: '1px solid #f70505', backgroundColor: '#fff5f5', p: 2, color: '#f70505', textAlign: 'center', fontWeight: 900 }}>
                                    {useErrorMsg}
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 4 }}>
                                <MovieFilter sx={{ color: '#005f8a', fontSize: 50 }} />
                                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -2, color: '#005f8a', fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
                                    Editar Película
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#f06b06', mt: 0.5, fontWeight: 800, fontSize: '1.1rem', letterSpacing: 2 }}>
                                    CENTRO DE CONTROL
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        <TextField fullWidth label="Nombre de la Película" variant="outlined" value={datosPelicula.nombre} onChange={editarNombre} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField fullWidth label="Director" variant="outlined" value={datosPelicula.director} onChange={editarDirector} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField fullWidth label="Géneros" variant="outlined" value={datosPelicula.genero} onChange={editarGenero} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField fullWidth label="Descripción" variant="outlined" value={datosPelicula.descripcion} multiline rows={5} onChange={editarDescripcion} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField fullWidth label="Valoración" variant="outlined" value={datosPelicula.valoracion} type="number" onChange={editarValoracion} slotProps={{ htmlInput: { min: 1, max: 10, step: 0.1 } }} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
                                        <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: 'rgba(0, 95, 138, 0.05)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(0, 95, 138, 0.1)' } }}>
                                            {datosPelicula.portada ? (
                                                <Box sx={{ bgcolor: '#005f8a', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                                                    <CheckCircle />
                                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>IMAGEN LISTA</Typography>
                                                </Box>
                                            ) : (
                                                <>
                                                    <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" onChange={editarPortada} />
                                                    <label htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%' }}>
                                                        <AddPhotoAlternate sx={{ fontSize: 40, color: '#005f8a', mb: 1 }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#005f8a', fontSize: '1.1rem' }}>Imagen de Portada</Typography>
                                                        <Typography variant="caption" sx={{ color: '#005f8a', fontWeight: 600 }}>JPG, PNG o WEBP</Typography>
                                                    </label>
                                                </>
                                            )}
                                        </Box>

                                        <TextField fullWidth label="O pega el Enlace URL de Portada" variant="outlined" placeholder="https://..." value={datosPelicula.portada} onChange={editarPortada} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                        <Box sx={{ flex: 1, border: '2px dashed #f06b06', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: 'rgba(240, 107, 6, 0.05)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(240, 107, 6, 0.1)' } }}>
                                            {archivoBinario ? (
                                                <Box sx={{ bgcolor: '#f06b06', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                                                    <Movie />
                                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>VIDEO LISTO</Typography>
                                                </Box>
                                            ) : (
                                                <>
                                                    <input accept="video/*" style={{ display: 'none' }} id="upload-video" type="file" onChange={editarUrlVideo} />
                                                    <label htmlFor="upload-video" style={{ cursor: 'pointer', width: '100%' }}>
                                                        <Movie sx={{ fontSize: 40, color: '#f06b06', mb: 1 }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#f06b06', fontSize: '1.1rem' }}>Archivo de Video</Typography>
                                                        <Typography variant="caption" sx={{ color: '#f06b06', fontWeight: 600 }}>Sube el metraje final</Typography>
                                                    </label>
                                                </>
                                            )}
                                        </Box>

                                        <TextField fullWidth label="O pega el Enlace URL de Video" variant="outlined" placeholder="https://..." value={datosPelicula.urlVideo} onChange={editarUrlVideoTexto} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={botonEditarPelicula} startIcon={<CloudUpload />} sx={{ bgcolor: '#005f8a', color: '#fff', borderRadius: 4, textTransform: 'none', fontWeight: 900, py: 2, px: 10, fontSize: '1.2rem', '&:hover': { bgcolor: '#004a6d', transform: 'translateY(-3px)' } }}>
                                    Editar Película
                                </Button>
                            </Box>
                        </>
                </Paper>
            </Container>
            <Footer />
        </Box>
    )
}