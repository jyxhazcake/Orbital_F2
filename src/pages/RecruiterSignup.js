import React, { useRef, useState } from 'react'
import { TextField, Grid, Paper, Button, Link, FormGroup, Checkbox } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { Link as RouterLink } from 'react-router-dom'
import logo from "../components/img/NVJBlogo.png"
import kids from "../components/img/kids.png"
import { AuthProvider, useAuth } from '../contexts/Authcontext'

const paperStyle = {
    padding: '20px',
    width: 300,
    margin: "30px auto"
}

const background = {
    backgroundImage: `url(${kids})`,
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

const logoStyle = {
    height: 100,
    width: 90
}

const buttonStyle = {
    marginTop: "20px",
    marginBottom: "5px"
}

const bottomStyle = {
    margin: '30px auto',
    width: 300
}

/*const useStyles = makeStyles({
    label: {
      fontSize: '14px',
    },
});*/
  



const RecruiterLogin = () => {
    const organisationNameRef = useRef()
    const emailRef = useRef()
    const contactRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }
    
    return (
        <AuthProvider>
            <Grid style={background} overflow='scroll'>
                <Paper  elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <RouterLink to='/'>
                            <img src={ logo } alt='NVJBlogo' style={logoStyle}></img>
                        </RouterLink>
                        <p class="text-xl font-bold">Sign up</p>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <FormGroup>
                    <TextField
                    label='Organisation Name'
                    placeholder='Organisation Name'
                    fullWidth required
                    ref={organisationNameRef}
                    />
                    <TextField
                    label='Daytime Contact number'
                    placeholder='Daytime Contact number'
                    fullWidth required
                    ref={contactRef}
                    />
                    <TextField
                        label='Email'
                        placeholder='Enter Email Address'
                        fullWidth required
                        ref={emailRef}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth required
                        ref={passwordRef}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth required
                        ref={passwordConfirmRef}
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        fullWidth
                        style={buttonStyle}
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                    Sign up
                    </Button>
                    </FormGroup>
                    <p>
                    By continuing, you acknowledge that you accept our
                    <Link component={RouterLink} to="/termsOfUse"> Terms & Conditions </Link>
                    </p>
                    </Paper>
                    <Paper style={bottomStyle}>
                    <p class="text-center"> Already have an account?
                        <Link component={RouterLink} to="/recruiterlogin"> Sign In.</Link>
                    </p>
                    </Paper>
            </Grid>
            
        </AuthProvider>
    )
}

export default RecruiterLogin