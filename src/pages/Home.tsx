import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Paper, Rating } from "@mui/material";
import Header from "../components/Header";

export default function Home() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f7fafc', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                <Paper elevation={2} sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#edf2f7', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid #cbd5e0', display: 'flex', flexDirection: 'column' }}>
                    
                    <Box sx={{ mb: { xs: 4, md: 8 }, textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, background: 'linear-gradient(90deg, #003a54 0%, #005f8a 50%, #00a8e8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}>
                            Cartelera de Películas
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#2d3748', mt: 1, fontWeight: 700, fontSize: '1.2rem', letterSpacing: 1 }}>
                            DESCUBRE • CALIFICA • DISFRUTA
                        </Typography>
                    </Box>

                    <Grid container spacing={4} sx={{ width: '100%', margin: 0, px: { xs: 0, md: 2 } }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', borderRadius: 5, bgcolor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 25px 50px rgba(0,95,138,0.15)', '& .movie-poster': { transform: 'scale(1.05)' } } }}>
                                
                                <Box sx={{ m: 2, borderRadius: 4, overflow: 'hidden', position: 'relative', boxShadow: '0 10px 18px rgba(0,0,0,0.12)' }}>
                                    <CardMedia className="movie-poster" component="img" height="420" image="https://via.placeholder.com/600x400?text=Poster+Pelicula" alt="Poster" sx={{ transition: 'transform 0.6s ease' }} />
                                </Box>

                                <CardContent sx={{ flexGrow: 1, p: 3, pt: 1 }}>
                                    <Typography variant="h6" noWrap sx={{ fontWeight: 900, mb: 0.5, color: '#0a1a2e', fontSize: '1.4rem' }}>
                                        Título de la Película
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Rating value={4.5} precision={0.5} size="small" readOnly />
                                        <Box sx={{ ml: 1.5, bgcolor: '#e0f1f9', px: 1.5, py: 0.3, borderRadius: 2 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 900, color: '#005f8a', fontSize: '0.9rem' }}>4.5</Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" sx={{ color: '#4a5568', lineHeight: 1.7, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, fontSize: '1.05rem' }}>
                                        Una experiencia cinematográfica única que redefine los límites del género con una narrativa visual impactante y envolvente.
                                    </Typography>
                                </CardContent>

                                <Box sx={{ p: 3, pt: 0 }}>
                                    <Button variant="contained" fullWidth sx={{ bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', boxShadow: 'none', '&:hover': { bgcolor: '#004a6d' } }}>
                                        Ver Película
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}