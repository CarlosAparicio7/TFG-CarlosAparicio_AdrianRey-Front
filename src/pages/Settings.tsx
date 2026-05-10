import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
    const { theme } = useTheme();
    
    return(

            <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
                <Header />
                <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                    <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
                        <Box sx={{ mb: { xs: 4, md: 8 }, textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>
                                Configuración
                            </Typography>
                        </Box>

                        <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                            <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', border: '1px solid #fff' } }}>
                                <CardContent>
                                    <Typography variant="h6" noWrap sx={{ fontWeight: 900, mb: 0.5, color: '#e0f2fe', fontSize: '1.4rem' }}>
                                        Cambio de apariencia
                                    </Typography>
                                    <ThemeToggle/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
    );
}