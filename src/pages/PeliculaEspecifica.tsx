import { DeleteForever } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, IconButton, Paper, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { borrarPelicula, getOnePelicula } from "../service/peliculasService";
import { borrarResena, crearResena, mostrarResenas } from "../service/resenasService";
import type { PeliculaResena } from "../types/peliculas";
import type { usuarioResena } from "../types/usuarios";

type getOnePelicula = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string 
}

type Resenas = {
    id: string,
    comentario: string,
    numeroEstrellas: number,
    usuario: usuarioResena,
    pelicula: PeliculaResena
}

type NuevaResena = {
    comentario: string,
    numeroEstrellas: number,
    usuarioId: string,
    peliculaId: string
}

export default function PeliculaEspecifica() {

    const navigate = useNavigate();
    const [usePeliculaEspecifica, setPeliculaEspecifica] = useState<getOnePelicula>();
    const { id } = useParams() as { id: string };
    const [useErrorMsg, setErrorMsg] = useState<string>('');
    const [listaResenas, setListaResenas] = useState<Resenas[]>([]);
    const [resenaTexto, setResenaTexto] = useState<string>('');
    const [notaUsuario, setNotaUsuario] = useState<number>(0);

    const usuarioEnStorage = localStorage.getItem('usuario');
    const datosUsuarioLogueado = usuarioEnStorage ? JSON.parse(usuarioEnStorage) : null;

    const { theme } = useTheme();

    const { t } = useLanguage();

    const cargarResenas = () => {
        mostrarResenas().then(response => {
            if (response.ok && response.data) {
                const filtradas = response.data.filter(r => r.pelicula.id === id);
                setListaResenas(filtradas);
            }
        });
    };

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        if (!user) {
            navigate('/login');
            return;
        }

        if (id) {
            getOnePelicula(id).then(response => {
                if (response.ok && response.data) {
                    setPeliculaEspecifica({
                        id: response.data.id,
                        nombre: response.data.nombre,
                        portada: response.data.portada,
                        descripcion: response.data.descripcion,
                        director: response.data.director,
                        genero: response.data.genero,
                        valoracion: response.data.valoracion,
                        urlVideo: response.data.urlVideo 
                    });
                    cargarResenas();
                } else if (!response.ok) {
                    console.log(response.error);
                }
            }).catch((error: Error) => {
                setErrorMsg(error.message);
            });
        }
    }, [id]);

    const handleDeletePelicula = (peliculaId: string) => {
        borrarPelicula(peliculaId).then((response) => {
            if (!response.ok) {
                alert(response.error?.detalle || "Error al eliminar la película");
                return;
            }
            navigate("/"); 
        }).catch((err) => {
            setErrorMsg(err?.message ?? "Error desconocido");
        });
    };

    const handlePublicarResena = () => {
        const userStr = localStorage.getItem('usuario');
        if (!userStr || !id) return;

        const usuario = JSON.parse(userStr);
        const nueva: NuevaResena = {
            comentario: resenaTexto,
            numeroEstrellas: Number(notaUsuario),
            usuarioId: usuario.id,
            peliculaId: id
        };

        crearResena(nueva).then(response => {
            if (response.ok) {
                setResenaTexto('');
                setNotaUsuario(0);
                cargarResenas();
            }
        });
    };

    const handleDeleteResena = (resenaId: string) => {
        borrarResena(resenaId).then(response => {
            if (response.ok) {
                cargarResenas();
            } else {
                alert("No se pudo eliminar la reseña");
            }
        }).catch(err => console.error(err));
    };

    const totalEstrellas = listaResenas.reduce((acumulador, resenaActual) => acumulador + resenaActual.numeroEstrellas, 0);
    const mediaComunidad = listaResenas.length > 0 ? Number((totalEstrellas / listaResenas.length).toFixed(1)) : 0;
    
    return (
    <>
        <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
                    
                    {useErrorMsg ? (
                        <Box
                            id="error-message"
                            sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#f70505', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                            {t("textError")} {useErrorMsg}
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Button component={Link} to={"/"} variant="contained" sx={{ width: '200px', height: '60px', bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', marginRight: 'auto', '&:hover': { bgcolor: '#f06b06' } }}>
                                        {t("buttonBack")}
                                    </Button>
                                    <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)', textAlign: 'center', width: '100%' }}>
                                        {usePeliculaEspecifica?.nombre}
                                    </Typography>
                                    {datosUsuarioLogueado && datosUsuarioLogueado.rol === 'ADMIN' && (
                                        <Button component={Link} to={"/control"} variant="contained" sx={{ width: '200px', height: '60px', bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', marginLeft: 'auto', '&:hover': { bgcolor: '#f06b06' } }}>
                                            {t("controlBack")}
                                        </Button>  
                                    )}
                                </Box>
                            </Box>

                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, lg: 4 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                                        <Card sx={{ borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', p: 3, minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1, p: 0 }}>
                                                <Typography variant="h4" sx={{ color: '#e0f2fe', fontWeight: 900, mb: 4, borderBottom: '2px solid rgba(255,255,255,0.3)', pb: 2 }}>
                                                    {t("titleDescriptionWatchFilm")}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: '#fff', lineHeight: 2.1, fontSize: '1.2rem', fontWeight: 500, textAlign: 'justify' }}>
                                                    {usePeliculaEspecifica?.descripcion}
                                                </Typography>
                                            </CardContent>
                                            
                                            <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', p: 3, borderRadius: 4, mt: 4 }}>
                                                <Typography variant="h6" sx={{ color: '#ffd1b3', fontWeight: 900, mb: 2, fontSize: '0.9rem', letterSpacing: 1.5 }}>{t("titleTechnicalDetailsWatchFilm")}</Typography>
                                                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                                                    {t("textGenderWatchFilm")} <span style={{ fontWeight: 900, color: '#ffd1b3' }}>{usePeliculaEspecifica?.genero}</span>
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                                                    {t("textFilmmakerWatchFilm")} <span style={{ fontWeight: 900, color: '#ffd1b3' }}>{usePeliculaEspecifica?.director}</span>
                                                </Typography>
                                            </Box>
                                        </Card>

                                        <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                                            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 3, textAlign: 'center' }}>{t("titleRatingsWatchFilm")}</Typography>
                                            
                                            <Box sx={{ mb: 4 }}>
                                                <Typography variant="overline" sx={{ color: '#ffd1b3', fontWeight: 900, fontSize: '0.9rem' }}>{t("textCriticReviewWatchFilm")}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Rating value={(usePeliculaEspecifica?.valoracion ?? 0) / 2} precision={0.1} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#f06b06' } }} />
                                                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>{usePeliculaEspecifica?.valoracion}</Typography>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Typography variant="overline" sx={{ color: '#e0f2fe', fontWeight: 900, fontSize: '0.9rem' }}>{t("textCommunityWatchFilm")}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Rating value={mediaComunidad / 2} precision={0.1} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#00a8e8' } }} />
                                                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>{mediaComunidad}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, lg: 8 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <Paper elevation={24} sx={{ width: '100%', borderRadius: 5, overflow: 'hidden', bgcolor: '#000', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', minHeight: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {usePeliculaEspecifica?.urlVideo ? (
                                            <CardMedia
                                                component={usePeliculaEspecifica.urlVideo.startsWith('http') ? "iframe" : "video"} 
                                                controls={!usePeliculaEspecifica.urlVideo.startsWith('http')}
                                                allowFullScreen
                                                scrolling="no"
                                                src={
                                                usePeliculaEspecifica.urlVideo.startsWith('http')
                                                    ? usePeliculaEspecifica.urlVideo
                                                        .replace("watch?v=", "embed/")
                                                        .replace("youtu.be/", "www.youtube.com/embed/")
                                                        .split("?si=")[0]
                                                        .split("&")[0]
                                                    : `http://localhost:8080/videos/${usePeliculaEspecifica.urlVideo}`
                                                }
                                                sx={{ width: '100%', aspectRatio: '16/9', display: 'block', border: 0, overflow: 'hidden', borderRadius: '8px' }} 
                                            />
                                        ) : (
                                            <Box sx={{ textAlign: 'center', color: '#fff' }}>
                                                <CircularProgress color="inherit" sx={{ mb: 2 }} />
                                                <Typography variant="h6" sx={{ fontWeight: 900 }}>{t("textLoadingFilmWatchFilm")}</Typography>
                                            </Box>
                                        )}
                                        </Paper>
                                        {datosUsuarioLogueado && datosUsuarioLogueado.rol === 'ADMIN' && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                                            <Button component={Link} to={"/editarPelicula/" + usePeliculaEspecifica?.id} variant="contained" sx={{ bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', width: '100%', maxWidth: 300, height: 60, '&:hover': { bgcolor: '#004a6d' } }}>
                                                {t("buttonEditFilm")}
                                            </Button>
                                            <Button variant="contained" color="error" startIcon={<DeleteForever />} onClick={() => usePeliculaEspecifica && handleDeletePelicula(usePeliculaEspecifica.id)} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', width: '100%', maxWidth: 300, height: 60 }}>
                                                {t("buttonDeleteFilm")}
                                            </Button>
                                        </Box>
                                        )}
                                        <Grid container spacing={4}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', height: '100%', boxSizing: 'border-box' }}>
                                                    <Box sx={{ mb: 3, borderBottom: '2px solid #e2e8f0', pb: 2 }}>
                                                        <Typography variant="h5" sx={{ color: '#005f8a', fontWeight: 900, letterSpacing: -1 }}>{t("titleReviewWatchFilm")}</Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                                            <Typography component="input" type="number" value={notaUsuario === 0 ? "" : notaUsuario} onChange={(e) => {
                                                                            const val = e.target.value; 
                                                                            if (val === "") {
                                                                                setNotaUsuario(0);
                                                                            } else {
                                                                                const num = Number(val);
                                                                                if (!isNaN(num) && num >= 0 && num <= 10) {
                                                                                    setNotaUsuario(num);
                                                                                }
                                                                            }
                                                                        }} 
                                                                sx={{ fontWeight: 800, color: '#f06b06', bgcolor: 'rgba(0, 0, 0, 0.05)', border: '1px solid rgba(240, 107, 6, 0.3)', borderRadius: 1, outline: 'none', width: '60px', fontSize: '1.2rem', textAlign: 'center', p: '4px 8px', '&:focus': { borderColor: '#f06b06', bgcolor: 'rgba(255, 255, 255, 0.8)' } }} 
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <TextField 
                                                        label={t("textShareOpinionWatchFilm")} 
                                                        multiline 
                                                        rows={6}
                                                        fullWidth
                                                        value={resenaTexto}
                                                        onChange={(e) => setResenaTexto(e.target.value)}
                                                        variant="filled" 
                                                        slotProps={{ 
                                                            input: { sx: { fontWeight: 600, color: '#003a54', fontSize: '1rem', p: 2, pt: 3 } }, 
                                                            inputLabel: { sx: { fontWeight: 800, color: '#005f8a' } } 
                                                        }} 
                                                    />
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                        <Button onClick={handlePublicarResena} variant="contained" sx={{ bgcolor: '#005f8a', fontWeight: 900, px: 4, py: 1.5, borderRadius: 3, fontSize: '0.9rem', boxShadow: '0 10px 20px rgba(0,95,138,0.3)', '&:hover': { bgcolor: '#003a54' } }}>
                                                            {t("buttonPostWatchFilm")}
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900, mb: 3, borderBottom: '2px solid rgba(255,255,255,0.2)', pb: 2 }}>{t("textCommunityWatchFilm")}</Typography>

                                                    <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, maxHeight: '300px', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '10px' } }}>
                                                        {listaResenas.map(resena => 
                                                        <Box key={resena.id} sx={{ mb: 3, p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 3, position: 'relative', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                                                <Box>
                                                                    <Typography sx={{ color: '#ffd1b3', fontWeight: 900, fontSize: '0.85rem', letterSpacing: 0.5 }}>{resena.usuario.nombre} {resena.usuario.apellido}</Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Rating size="small" value={resena.numeroEstrellas / 2} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#00a8e8' } }} />
                                                                        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '0.9rem' }}>{resena.numeroEstrellas}</Typography>
                                                                    </Box>
                                                                </Box>
                                                                {(datosUsuarioLogueado?.id === resena.usuario.id || datosUsuarioLogueado?.rol === 'ADMIN') && (
                                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                                        <IconButton component={Link} to={"/editarResena/" + resena.id} state={{ idPelicula: id }} size="small" sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#12a507', bgcolor: 'rgba(255,77,77,0.1)' } }}>
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton onClick={() => handleDeleteResena(resena.id)} size="small" sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#ff4d4d', bgcolor: 'rgba(255,77,77,0.1)' } }}>
                                                                            <DeleteForever sx={{ fontSize: '1.5rem' }} />
                                                                        </IconButton>
                                                                    </Box>
                                                                )}
                                                            </Box>
                                                            <Typography sx={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>{resena.comentario}</Typography>
                                                        </Box>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Paper>
            </Container>
            <Footer />
        </Box>
    </>
    );
}