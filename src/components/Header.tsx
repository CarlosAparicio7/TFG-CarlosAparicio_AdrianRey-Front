import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppBar, Avatar, Box, Container, Divider, IconButton, Toolbar, Tooltip, Typography, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

type Usuario = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
    avatarIcon: string;
    password?: string;
}

type Comprobacion = {
    abierto: boolean;
    elemento?: HTMLElement;
}

type EstadoUsuario = Usuario | { sesion: false };

export default function Header() {
    const [usuario, setUsuario] = useState<EstadoUsuario>({ sesion: false });
    const [menuEstado, setMenuEstado] = useState<Comprobacion>({ abierto: false });
    const navigate = useNavigate();

    useEffect(() => {
        const userJson = localStorage.getItem('usuario');
        if (userJson) {
            try {
                setUsuario(JSON.parse(userJson));
            } catch (error) {
                console.error("Error al parsear el usuario", error);
            }
        }
    }, []);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => { setMenuEstado({ abierto: true, elemento: event.currentTarget }); };
    const handleCloseMenu = () => { setMenuEstado({ abierto: false }); };

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        setUsuario({ sesion: false });
        navigate('/');
    };

    const esValido = 'rol' in usuario;

    return (
        <>
            <Box sx={{ marginBottom: '80px' }}>
                <AppBar position="fixed" sx={{ width: '100%', left: 0, top: 0, background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', height: '80px', justifyContent: 'center' }}> 
                    <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
                        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: { md: 5 } }}>
                                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                    <Box component="img" sx={{ height: { xs: 60, md: 65 }, width: 'auto', my: 1, mr: 2 }} alt="INFOCINE&MAS Logo" src="/logo_infocine&mas.png" />
                                    <Typography variant="h5" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 900, color: '#f06b06' }}>INFOCINE&MAS</Typography>
                                </Link>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0, mr: { md: 5 }, gap: 1 }}>
                                {esValido ? (
                                    <>
                                        <Box sx={{ textAlign: 'right', mr: 1 }}>
                                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1 }}>{(usuario as Usuario).nombre} {(usuario as Usuario).apellido}</Typography>
                                            <Typography variant="caption" sx={{ color: '#ffccbc', fontWeight: '800', textTransform: 'uppercase' }}>{(usuario as Usuario).rol}</Typography>
                                        </Box>
                                        <IconButton onClick={(usuario as Usuario).rol === 'ADMIN' ? handleOpenMenu : undefined} sx={{ p: 0 }}>
                                            <Avatar src={(usuario as Usuario).avatarIcon} sx={{ width: 50, height: 50, border: '2px solid orange' }} />
                                        </IconButton>
                                        {(usuario as Usuario).rol === 'ADMIN' && (
                                            <Menu anchorEl={menuEstado.elemento} open={menuEstado.abierto} onClose={handleCloseMenu} sx={{ mt: '55px', '& .MuiPaper-root': { backgroundColor: '#005f8a', border: '1px solid #f06b06' } }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                                <MenuItem onClick={() => { navigate('/control'); handleCloseMenu(); }} sx={{ fontWeight: 'bold', color: 'white' }}>
                                                    <ListItemIcon><DashboardIcon fontSize="small" sx={{ color: 'white' }} /></ListItemIcon> Panel de Control
                                                </MenuItem>
                                            </Menu>
                                        )}
                                        <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255,255,255,0.3)', height: '40px', alignSelf: 'center' }} />
                                        <Tooltip title="Cerrar Sesión">
                                            <IconButton onClick={handleLogout} sx={{ color: 'white' }}><LogoutIcon sx={{ fontSize: '30px' }} /></IconButton>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <Link to="/login">
                                        <IconButton sx={{ p: 0 }}><PersonIcon sx={{ fontSize: '45px', color: 'orange' }} /></IconButton>
                                    </Link>
                                )}
                                <Link to="/settings">
                                    <IconButton sx={{ p: 0, ml: 1 }}><SettingsIcon sx={{ fontSize: '35px', color: 'purple' }} /></IconButton>
                                </Link>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
}