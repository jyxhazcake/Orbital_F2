import React from 'react'
import "firebase/firestore";
import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore"

export default function DisplayStudents(props) {
    const UsersRef = firebase.firestore().collection("Users").doc(props.student)

    const [user] = useDocumentData(UsersRef)


    return (
        <div>
            {user?.Name}
        </div>
    )
}

