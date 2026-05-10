import { Movie, Replay } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function PageNotFound() {
  const { theme } = useTheme();

  const { t } = useLanguage();

  return (
    <Container maxWidth={false} sx={{ background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2, p: 6, bgcolor: 'rgba(255, 255, 255, 0.12)', borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px)', maxWidth: 500, width: '100%' }}>

        <Movie sx={{ fontSize: 100, color: '#fff', mb: 1 }} />

        <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '6rem', m: 0, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)', letterSpacing: -4 }}>
          404
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffd1b3', mt: -1 }}>
          {t("titlePageNotFound")}
        </Typography>

        <Typography variant="body1" sx={{ color: '#fff', mb: 2, fontWeight: 500, fontSize: '1.1rem' }}>
          {t("descriptionPageNotFound")}
        </Typography>

        <Button component={Link} to="/" variant="contained" startIcon={<Replay />} sx={{ bgcolor: '#005f8a', textTransform: 'none', px: 5, py: 1.6, borderRadius: 3, fontWeight: 900, fontSize: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.2)', '&:hover': { bgcolor: '#f06b06', boxShadow: '0 12px 25px rgba(0,0,0,0.3)' } }}>
          {t("buttonBackPageNotFound")}
        </Button>

      </Box>
    </Container>
  );
}