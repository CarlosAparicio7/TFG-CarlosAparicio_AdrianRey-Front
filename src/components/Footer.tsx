import { Box, Container, Typography, IconButton, Divider, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter, Email } from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <Box sx={{ background: 'linear-gradient(90deg, #003a54 30%, #005f8a 100%)', color: 'white', pt: 3, pb: 2, width: '100%' }}>
                <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
                    <Grid container spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
                        
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: { xs: 90, md: 115 }, 
                                            width: 'auto', 
                                            objectFit: 'contain',
                                            mb: 0.5
                                        }}
                                        alt="INFOCINE&MAS Logo"
                                        src="/logo_infocine&mas.png"
                                    />
                                </Link>
                                <Typography variant="h5" sx={{ fontWeight: 900, color: '#f06b06', letterSpacing: 1, fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
                                    INFOCINE&MAS
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#f06b06', fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
                                ÚNETE A LA REVOLUCIÓN
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff', mb: 1.5, px: 1, fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.3 }}>
                                Sube tus creaciones y comparte talento sin filtros.
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <Email sx={{ color: '#f06b06', fontSize: 22 }} />
                                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>comunidad@infocinemas.com</Typography>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: '#f06b06', fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
                                COMUNIDAD
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)', p: 1, '&:hover': { bgcolor: '#f06b06' } }}>
                                    <Facebook sx={{ fontSize: 32 }} />
                                </IconButton>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)', p: 1, '&:hover': { bgcolor: '#f06b06' } }}>
                                    <Instagram sx={{ fontSize: 32 }} />
                                </IconButton>
                                <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)', p: 1, '&:hover': { bgcolor: '#f06b06' } }}>
                                    <Twitter sx={{ fontSize: 32 }} />
                                </IconButton>
                            </Box>
                        </Grid>

                    </Grid>

                    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.15)' }} />

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#f06b06', fontWeight: 900, letterSpacing: 2, fontSize: '0.85rem' }}>
                            INFOCINE&MAS — TU CINE, TU COMUNIDAD — 2026
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}