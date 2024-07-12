import Container from '@mui/material/Container';
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [reShowPassword, setReShowPassword] = useState(false);
    const [user, setUser] = useState({name: '', phoneNumber: '', email: '', username: '', password: '', role: "admin", position: "admin", rePassword: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                phoneNumber: user.phoneNumber,
                email: user.email,
                username: user.username,
                password: user.password,
                role: user.role,
                position: user.position
            }),
        })
            .then(response => response.json())
            .then(data => console.log('User created: ', data))
            .catch(error => console.log('Error creating user', error));
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({...prevUser, [name]: value}));
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickReShowPassword = () => setReShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth='sm'>
            <h1>Register</h1>
            <TextField sx={{m: 1, width: '100%'}} id="outlined-basic" label="Fullname" variant="outlined" name="name"
                       value={user.name} onChange={handleChange} required/>
            <TextField sx={{m: 1, width: '100%'}} id="outlined-basic" label="Email" variant="outlined" name="email"
                       value={user.email} onChange={handleChange}/>
            <TextField sx={{m: 1, width: '100%'}} id="outlined-basic" label="PhoneNumber" variant="outlined"
                       name="phoneNumber" value={user.phoneNumber} onChange={handleChange}/>
            <TextField sx={{m: 1, width: '100%'}} id="outlined-basic" label="Username" variant="outlined"
                       name="username" value={user.username} onChange={handleChange}/>
            <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password" name="password" value={user.password} onChange={handleChange}
                    placeholder="Minumum 6 charaters required"
                />
            </FormControl>
            <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Re-enter Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={reShowPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickReShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {reShowPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="ReEnterPassword" name="rePassword" value={user.rePassword} onChange={handleChange}
                />
            </FormControl>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{m: 1}}>
                <Button sx={{m: 1, height: '6vh'}} variant="contained" color="success" onClick={handleSubmit}>
                    Register
                </Button>
                <p>Already registed?</p>
                <Link to="/login" style={{textDecoration: 'none'}}>Login here</Link>
            </Stack>
        </Container>
    );
}