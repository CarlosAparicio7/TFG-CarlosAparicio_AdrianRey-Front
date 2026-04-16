import PersonIcon from '@mui/icons-material/Person';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Header() {
    <Box sx={{marginBottom: '5%'}}>
    <AppBar position="fixed" sx={{ width: '100%', left: 0, top: 0, backgroundColor: '#1976d2' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: { md: 10 } }}>
            <Link to="/" style={{display: 'flex', alignItems: 'center', color: 'white' }}>
              <Typography variant="h6" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 800 }}>
                INFOCINE&MAS
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit"/>
          </Box>

          <Box sx={{ flexGrow: 0, mr: { md: 5 } }}>
            <Link to="/login">
            <IconButton sx={{ p: 0 }}>
              <PersonIcon sx={{ fontSize: '40px', color: 'white' }} />
            </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
}