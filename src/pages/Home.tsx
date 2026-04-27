import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Paper, Rating } from "@mui/material";
import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <Container maxWidth={false} sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', px: { xs: 2, md: 4 } }}>
                <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, backgroundColor: '#f5f5f5', borderRadius: 5, width: '100%', maxWidth: '1800px', minHeight: '80vh', boxSizing: 'border-box' }}>
                    <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 'bold', color: '#1a1a1a', letterSpacing: 1 }}>
                        Cartelera de Películas
                    </Typography>

                    <Grid container spacing={3} sx={{ justifyContent: 'flex-start', width: '100%', margin: 0 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '100%', maxWidth: '300px', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' } }}>
                                <CardMedia component="img" height="350" image="https://via.placeholder.com/400x600?text=Poster+Pelicula" alt="Poster" />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                        Título de la Película
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating value={4.5} precision={0.5} size="small" readOnly />
                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>4.5</Typography>
                                    </Box>

                                    <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineHeight: 1.4 }}>
                                        Esta es una descripción visual de prueba para ajustar el diseño de las 5 columnas en la cuadrícula principal.
                                    </Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button variant="contained" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold', py: 0.8, fontSize: '0.8rem' }}>
                                        Ver Película
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
}