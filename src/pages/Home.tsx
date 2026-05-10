import { DeleteSweep, NewReleases, Search, Star } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, InputAdornment, MenuItem, Paper, Rating, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getAllPeliculas } from "../service/peliculasService";

type getAllPeliculas = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number
}

export default function Home() {

    const [usePeliculas, setPeliculas] = useState<getAllPeliculas[]>([]);
    const [useErrorMsg, setErrorMsg] = useState<string>('');

    const [filtroTexto, setFiltroTexto] = useState('');
    const [tipoBusqueda, setTipoBusqueda] = useState<'nombre' | 'director'>('nombre');
    const [filtroValoracion, setFiltroValoracion] = useState('todos');
    const [filtroGenero, setFiltroGenero] = useState('todos');
    const [filtroEspecial, setFiltroEspecial] = useState<'todas' | 'ultimas' | 'top'>('todas');

    const { theme } = useTheme();

    const { t } = useLanguage();

    useEffect(()=>{
        getAllPeliculas().then(response =>{
            if(response.ok && response.data){
                const allPeliculas = response.data.map(a =>{
                    return{
                        id: a.id,
                        nombre: a.nombre,
                        portada: a.portada,
                        descripcion: a.descripcion,
                        director: a.director,
                        genero: a.genero,
                        valoracion: a.valoracion
                    }
                });
                setPeliculas(allPeliculas);
            }else if(!response.ok){
                console.log(response.error);
            }
        }).catch((useErrorMsg: Error)=>{
            setErrorMsg(useErrorMsg.message);
        });
    }, []);

    const limpiarFiltros = () => {
        setFiltroTexto('');
        setTipoBusqueda('nombre');
        setFiltroValoracion('todos');
        setFiltroGenero('todos');
        setFiltroEspecial('todas');
    };

    const normalizarTexto = (texto: string) => 
        texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const generosUnicos = Array.from(new Set(usePeliculas.map(p => p.genero)));
    
    const peliculasFiltradas = (() => {
        const filtradas = usePeliculas.filter(pelicula => {
            const cumpleTexto = tipoBusqueda === 'nombre' 
                ? normalizarTexto(pelicula.nombre).includes(normalizarTexto(filtroTexto))
                : normalizarTexto(pelicula.director).includes(normalizarTexto(filtroTexto));

            const cumpleValoracion = filtroValoracion === 'todos' 
                || Math.trunc(pelicula.valoracion) === Number(filtroValoracion);

            const cumpleGenero = filtroGenero === 'todos' 
                || normalizarTexto(pelicula.genero) === normalizarTexto(filtroGenero);

            return cumpleTexto && cumpleValoracion && cumpleGenero;
        });

        if (filtroEspecial === 'ultimas') return [...filtradas].reverse().slice(0, 3);
        if (filtroEspecial === 'top') return [...filtradas].sort((a, b) => b.valoracion - a.valoracion).slice(0, 5);
        
        return filtradas;
    })();

    return (
        <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>              

                    <Box sx={{ mb: { xs: 4, md: 8 }, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, position: 'relative', minHeight: '100px' }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>
                                {t("titleHome")}
                            </Typography>
                            <Button component={Link} to={"/subirPelicula"} variant="contained" sx={{ position: 'absolute', right: 0, bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 2.5, px: 4, fontSize: '1.2rem', '&:hover': { bgcolor: '#004a6d' } }}>
                                {t("buttonUploadFilm")}
                            </Button>
                        </Box>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', borderRadius: 4 }}>
                            <TextField size="medium" placeholder={tipoBusqueda === 'nombre' ? t("textSearchFilm") : t("textSearchFilmmaker")} value={filtroTexto}
                                onChange={(e) => setFiltroTexto(e.target.value)}
                                slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: '#ffd1b3', fontSize: '1.4rem' }} /></InputAdornment>, sx: { color: '#fff', bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3, width: 350, height: 56, border: '1px solid rgba(255, 255, 255, 0.2)', '& fieldset': { border: 'none' } } } }}
                            />
                            <Select size="medium" value={tipoBusqueda} sx={{ color: '#fff', bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3, minWidth: 160, height: 56, border: '1px solid rgba(255, 255, 255, 0.2)', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: '#ffd1b3' } }}
                                onChange={(e) => setTipoBusqueda(e.target.value)}
                            >
                                <MenuItem value="nombre">{t("filterName")}</MenuItem>
                                <MenuItem value="director">{t("filterFilmmaker")}</MenuItem>
                            </Select>
                            <Select size="medium" value={filtroValoracion} displayEmpty sx={{ color: '#fff', bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3, minWidth: 200, height: 56, border: '1px solid rgba(255, 255, 255, 0.2)', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: '#ffd1b3' } }}
                                onChange={(e) => setFiltroValoracion(e.target.value)}
                            >
                                <MenuItem value="todos">{t("filterNote")}</MenuItem>
                                {[...Array(11)].map((_, i) => (
                                    <MenuItem key={i} value={i.toString()}>{i} {t("textFilterNote")}</MenuItem>
                                ))}
                            </Select>
                            <Select size="medium" value={filtroGenero} displayEmpty sx={{ color: '#fff', bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3, minWidth: 200, height: 56, border: '1px solid rgba(255, 255, 255, 0.2)', '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: '#ffd1b3' } }}
                                onChange={(e) => setFiltroGenero(e.target.value)}
                            >
                                <MenuItem value="todos">{t("filterGender")}</MenuItem>
                                {generosUnicos.map(g => (
                                    <MenuItem key={g} value={g}>{g}</MenuItem>
                                ))}
                            </Select>
                            <Button startIcon={<NewReleases />} variant={filtroEspecial === 'ultimas' ? "contained" : "outlined"} onClick={() => setFiltroEspecial('ultimas')} sx={{ borderRadius: 3, height: 56, color: '#fff', borderColor: 'rgba(255, 255, 255, 0.4)', bgcolor: filtroEspecial === 'ultimas' ? '#005f8a' : 'transparent', px: 3, '&:hover': { bgcolor: '#004a6d' } }}>Últimas 3</Button>
                            <Button startIcon={<Star />} variant={filtroEspecial === 'top' ? "contained" : "outlined"} onClick={() => setFiltroEspecial('top')} sx={{ borderRadius: 3, height: 56, color: '#fff', borderColor: 'rgba(255, 255, 255, 0.4)', bgcolor: filtroEspecial === 'top' ? '#f06b06' : 'transparent', px: 3, '&:hover': { bgcolor: '#d65f05' } }}>Top 5</Button>
                            <Button startIcon={<DeleteSweep />} onClick={limpiarFiltros} variant="outlined" sx={{ borderRadius: 3, height: 56, color: '#fff', borderColor: 'rgba(255, 204, 188, 0.4)', px: 3, '&:hover': { borderColor: '#fff', color: '#fff' } }}>Limpiar</Button>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#ffd1b3', mt: 1, fontWeight: 700, fontSize: '1.2rem', letterSpacing: 1 }}>
                            {t("sloganHome")}
                        </Typography>
                    </Box>
                    {useErrorMsg ?
                        <Box
                            id="error-message"
                            sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#f70505', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                            {t("textError")} {useErrorMsg}
                        </Box>
                    :
                    <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                        {peliculasFiltradas.map(peliculas => (
                            <Grid key={peliculas.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex' }}>
                                <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', border: '1px solid #fff' } }}>
                                    
                                    <Box sx={{ m: 2, borderRadius: 4, overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', bgcolor: '#003a54', height: 420 }}>
                                        <CardMedia component="img" src={peliculas.portada} alt="Poster" sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', '&:hover': { transform: 'scale(1.08)' } }} />
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, p: 3, pt: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" noWrap sx={{ fontWeight: 900, mb: 0.5, color: '#e0f2fe', fontSize: '1.4rem' }}>
                                            {peliculas.nombre}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Rating value={peliculas.valoracion / 2} precision={0.5} size="small" readOnly />
                                            <Box sx={{ ml: 1.5, bgcolor: '#f06b06', px: 1.5, py: 0.3, borderRadius: 2 }}>
                                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#fff', fontSize: '0.9rem' }}>
                                                    {peliculas.valoracion}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                <Typography variant="body2" sx={{ color: '#fff', bgcolor: 'rgba(0, 58, 84, 0.7)', borderRadius: 2, px: 1.5, py: 0.3, lineHeight: 1.7, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, fontSize: '1.05rem', fontWeight: 500 }}>
                                                    {peliculas.director}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Typography variant="body2" sx={{ color: '#f1f5f9', lineHeight: 1.7, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, fontSize: '1.05rem', fontWeight: 500 }}>
                                            {peliculas.descripcion}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: 3, pt: 0 }}>
                                        <Button component={Link} to={"/pelicula/" + peliculas.id} variant="contained" fullWidth sx={{ bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', '&:hover': { bgcolor: '#004a6d' } }}>
                                            {t("buttonWatchFilm")}
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    }
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
}