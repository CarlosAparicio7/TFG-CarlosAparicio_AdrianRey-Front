import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <Box sx={{ marginBottom: '5%' }}>
                <AppBar position="fixed" sx={{ width: '100%', left: 0, top: 0, background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)' }}> 
                    <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
                        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: { md: 5 } }}>
                                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: { xs: 70, md: 60 },
                                            width: 'auto',
                                            my: 1
                                        }}
                                        alt="INFOCINE&MAS Logo"
                                        src="/logo_infocine&mas.png"
                                    />
                                    <Typography variant="h6" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 800, color: '#f06b06' }}>
                                      INFOCINE&MAS
                                    </Typography>
                                </Link>
                            </Box>

                            <Box sx={{ flexGrow: 0, mr: { md: 5 } }}>
                                <Link to="/login">
                                    <IconButton sx={{ p: 0 }}>
                                        <PersonIcon sx={{ fontSize: '40px', color: 'orange' }} />
                                    </IconButton>
                                </Link>
                                <Link to="/login">
                                    <IconButton sx={{ color: '#005f8a' }}>
                                        <LogoutIcon sx={{ fontSize: '30px', marginLeft: 3 }} />
                                    </IconButton>
                                </Link>
                                <Link to="/settings">
                                    <IconButton sx={{ p: 0, ml: 2 }}>
                                        <SettingsIcon sx={{ fontSize: '35px', color: 'purple', marginLeft: 1 }} />
                                    </IconButton>
                                </Link>
                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
}