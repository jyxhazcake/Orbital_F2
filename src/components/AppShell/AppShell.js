import React from 'react'
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core"
import { IfFirebaseAuthed } from '@react-firebase/auth'

function AppShell() {
    const handleLogout = (firebase) => {
        firebase.auth().signOut();
    };

    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
              Volunteer Board
            </Typography>
            <IfFirebaseAuthed>
              {({ user, firebase }) => (
                <Button color="inherit" onClick={() => handleLogout(firebase)}>
                  Logout
                </Button>
              )}
            </IfFirebaseAuthed>
          </Toolbar>
        </AppBar>
      );
    };

export default AppShell
