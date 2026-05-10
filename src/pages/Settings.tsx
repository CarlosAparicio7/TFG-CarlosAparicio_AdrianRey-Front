import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
    const { theme } = useTheme();

    const { t } = useLanguage();
    
    return(

            <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
                <Header />
                <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                    <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
                        <Box sx={{ mb: { xs: 4, md: 8 }, textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>
                                {t("titleSetting")}
                            </Typography>
                        </Box>

                        <Grid container spacing={3} sx={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', transition: 'all 0.4s ease' }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 6, md: 10 } }}>
                                    <Typography variant="h4" noWrap sx={{ fontWeight: 900, mb: 4, color: '#e0f2fe', fontSize: { xs: '2rem', md: '2.8rem' }, textAlign: 'center' }}>
                                        {t("textThemeSwitch")}
                                    </Typography>
                                    
                                    <Box sx={{ transform: 'scale(2.2)', my: 4 }}>
                                        <ThemeToggle/>
                                    </Box>

                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 6, fontWeight: 600, fontSize: '1.1rem' }}>
                                        {t("textSelectExperienceMode")}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card sx={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', transition: 'all 0.4s ease' }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 6, md: 10 } }}>
                                    <Typography variant="h4" noWrap sx={{ fontWeight: 900, mb: 4, color: '#e0f2fe', fontSize: { xs: '2rem', md: '2.8rem' }, textAlign: 'center' }}>
                                        {t("textLanguageSwitch")}
                                    </Typography>
                                    
                                    <Box sx={{ transform: 'scale(2.2)', my: 4 }}>
                                        <LanguageSwitcher/>
                                    </Box>

                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 6, fontWeight: 600, fontSize: '1.1rem' }}>
                                        {t("textSelectExperienceMode")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Paper>
                </Container>
                <Footer/>
            </Box>
    );
}