import { AddPhotoAlternate, CheckCircle, Close, CloudUpload, Movie, MovieFilter } from "@mui/icons-material";
import { Box, Button, Container, Grid, IconButton, Input, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
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
    const { id } = useParams() as { id: string };
    const navigate = useNavigate();
    const [useErrorMsg, setErrorMsg] = useState<string>('');
    const [archivoBinario, setArchivoBinario] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const { theme } = useTheme();

    const { t } = useLanguage();

    useEffect(() => {
        if (id) {
            getOnePelicula(id).then(response => {
                if (response.ok && response.data) {
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
                } else if (!response.ok) {
                    console.log(response.error);
                }
            }).catch((useErrorMsg: Error) => {
                setErrorMsg(useErrorMsg.message)
            })
        }
    }, [id])

    const editarNombre = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({ ...datosPelicula, nombre: a.target.value })
    }

    const editarPortada = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const archivo = e.target.files[0];
            const vistaPrevia = URL.createObjectURL(archivo);
            setDatosPelicula({ ...datosPelicula, portada: vistaPrevia });
        } else {
            setDatosPelicula({ ...datosPelicula, portada: e.target.value });
        }
    }

    const eliminarPortada = () => {
        setDatosPelicula({ ...datosPelicula, portada: "" });
    };

    const editarDescripcion = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({ ...datosPelicula, descripcion: a.target.value })
    }

    const editarDirector = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({ ...datosPelicula, director: a.target.value })
    }

    const editarGenero = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({ ...datosPelicula, genero: a.target.value })
    }

    const editarValoracion = (a: React.ChangeEvent<HTMLInputElement>) => {
        const valorOriginal = a.target.value;

        if (valorOriginal === "") {
            setDatosPelicula({ ...datosPelicula, valoracion: 0 });
            return;
        }

        const valorNumerico = Number(valorOriginal);

        if (!isNaN(valorNumerico) && valorNumerico >= 0 && valorNumerico <= 10) {
            setDatosPelicula({ ...datosPelicula, valoracion: valorNumerico });
        }
    }

    const editarUrlVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setArchivoBinario(file);
            setDatosPelicula({ ...datosPelicula, urlVideo: file.name });
        }
    }

    const editarUrlVideoTexto = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosPelicula({ ...datosPelicula, urlVideo: a.target.value });
        setArchivoBinario(null);
    }

    const eliminarVideo = () => {
        setArchivoBinario(null);
        setDatosPelicula({ ...datosPelicula, urlVideo: "" });
    };

    const botonEditarPelicula = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!datosPelicula.portada || !datosPelicula.urlVideo) {
            setErrorMsg("Por favor, asegúrate de que la película tenga una portada y un archivo/enlace de video.");
            return;
        }

        if (!id) return;

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
            const peliculasEditadas: EditarPelicula = {
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

            if (respuesta.ok && respuesta.data) {
                clearInterval(timer);
                setProgress(100);
                setTimeout(() => {
                    setLoading(false);
                    navigate(`/pelicula/${id}`);
                }, 800);
            } else {
                clearInterval(timer);
                setLoading(false);
                setProgress(0);
                setErrorMsg("Error al actualizar la pelicula");
            }
        } catch (error) {
            clearInterval(timer);
            setLoading(false);
            setProgress(0);
            console.log(error);
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
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
                                {t("textLoadingContentEditFilm")}
                            </Typography>
                            <Box sx={{ width: '100%', maxWidth: '700px' }}>
                                <LinearProgress variant="determinate" value={progress} sx={{ height: 16, borderRadius: 8, bgcolor: 'rgba(0,0,0,0.05)', '& .MuiLinearProgress-bar': { borderRadius: 8, background: 'linear-gradient(90deg, #005f8a, #f06b06)' } }} />
                                <Typography sx={{ color: '#005f8a', mt: 3, textAlign: 'center', fontWeight: 900, fontSize: '1.2rem' }}>{Math.round(progress)}% COMPLETADO</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={botonEditarPelicula}>
                            {useErrorMsg && (
                                <Box sx={{ mb: 4, borderRadius: 3, border: '1px solid #f70505', backgroundColor: '#fff5f5', p: 2, color: '#f70505', textAlign: 'center', fontWeight: 900 }}>
                                    {useErrorMsg}
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 4 }}>
                                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <Button component={Link} to={"/pelicula/" + id} variant="contained" sx={{ position: 'absolute', left: 0, bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.2, '&:hover': { bgcolor: '#f06b06' } }}>
                                        {t("buttonBack")}
                                    </Button>
                                    <MovieFilter sx={{ color: '#005f8a', fontSize: 50 }} />
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -2, color: '#005f8a', fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
                                    {t("buttonEditFilm")}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#f06b06', mt: 0.5, fontWeight: 800, fontSize: '1.1rem', letterSpacing: 2 }}>
                                    {t("descriptionEditFilm")}
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        <TextField required fullWidth label={t("textLabelName")} variant="outlined" value={datosPelicula.nombre} onChange={editarNombre} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField required fullWidth label={t("textLabelFilmmaker")} variant="outlined" value={datosPelicula.director} onChange={editarDirector} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField required fullWidth label={t("textLabelGenders")} variant="outlined" value={datosPelicula.genero} onChange={editarGenero} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField required fullWidth label={t("textLabelDescription")} variant="outlined" value={datosPelicula.descripcion} multiline rows={5} onChange={editarDescripcion} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField required fullWidth label={t("textLabelRating")} variant="outlined" value={datosPelicula.valoracion === 0 ? "" : datosPelicula.valoracion} type="number" onChange={editarValoracion} slotProps={{ htmlInput: { min: 1, max: 10, step: 0.1 } }} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
                                        <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 1, textAlign: 'center', bgcolor: 'rgba(0, 95, 138, 0.05)', cursor: (datosPelicula.portada && !datosPelicula.portada.startsWith('http')) ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(0, 95, 138, 0.1)' } }}>
                                            {datosPelicula.portada && !datosPelicula.portada.startsWith('http') ? (
                                                <Box sx={{ bgcolor: '#005f8a', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                                                    <CheckCircle />
                                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>{t("textImageReady")}</Typography>
                                                    <IconButton size="small" onClick={eliminarPortada} sx={{ color: '#fff', ml: 1 }}><Close fontSize="small" /></IconButton>
                                                </Box>
                                            ) : (
                                                <Button component="label" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textTransform: 'none', color: '#005f8a', '&:hover': { background: 'transparent' } }}>
                                                    <AddPhotoAlternate sx={{ fontSize: 40, mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.1rem' }}>{t("textImageReady")}</Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>JPG, PNG o WEBP</Typography>
                                                    <Input type="file" onChange={editarPortada} slotProps={{ input: { accept: 'image/*' } }} sx={{ display: 'none' }} />
                                                </Button>
                                            )}
                                        </Box>

                                        <TextField fullWidth label={t("textUrlPoster")} variant="outlined" placeholder="https://..." value={datosPelicula.portada.startsWith('blob:') ? "" : datosPelicula.portada} onChange={editarPortada} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                        <Box sx={{ flex: 1, border: '2px dashed #f06b06', borderRadius: 5, p: 1, textAlign: 'center', bgcolor: 'rgba(240, 107, 6, 0.05)', cursor: (datosPelicula.urlVideo && !archivoBinario) ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(240, 107, 6, 0.1)' } }}>
                                            {archivoBinario ? (
                                                <Box sx={{ bgcolor: '#f06b06', p: 2, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
                                                    <Movie />
                                                    <Typography sx={{ fontWeight: 900, fontSize: '0.85rem' }}>{t("textVideoReady")}</Typography>
                                                    <IconButton size="small" onClick={eliminarVideo} sx={{ color: '#fff', ml: 1 }}><Close fontSize="small" /></IconButton>
                                                </Box>
                                            ) : (
                                                <Button component="label" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', textTransform: 'none', color: '#f06b06', '&:hover': { background: 'transparent' } }}>
                                                    <Movie sx={{ fontSize: 40, mb: 1 }} />
                                                    <Typography variant="h6" sx={{ fontWeight: 900, fontSize: '1.1rem' }}>{t("textFilmFile")}</Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{t("textUploadFinalFootage")}</Typography>
                                                    <Input type="file" onChange={editarUrlVideo} slotProps={{ input: { accept: 'video/*' } }} sx={{ display: 'none' }} />
                                                </Button>
                                            )}
                                        </Box>
                                        <TextField fullWidth label={t("textUrlFilm")} variant="outlined" placeholder="https://..." value={archivoBinario ? "" : datosPelicula.urlVideo} onChange={editarUrlVideoTexto} disabled={!!archivoBinario} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                                <Button type="submit" variant="contained" startIcon={<CloudUpload />} sx={{ bgcolor: '#005f8a', color: '#fff', borderRadius: 4, textTransform: 'none', fontWeight: 900, py: 2, px: 10, fontSize: '1.2rem', '&:hover': { bgcolor: '#004a6d', transform: 'translateY(-3px)' } }}>
                                    {t("buttonSaveChanges")}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Container>
            <Footer />
        </Box>
    )
}