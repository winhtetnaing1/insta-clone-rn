import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { SignInStack, SignOutStack } from './StackNavigator'
import MyContext from '../utlity/context'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../database/firebase'
import { useNetInfo } from '@react-native-community/netinfo'

export default function AuthNavigator() {
    const [currentLoginUser, setCurrentLoginUser] = useState(null)
    const netInfo = useNetInfo()

    const userHandler = async user => {
        if (!user) return setCurrentLoginUser(null)
        try {
            const docRes = await getDoc(doc(db, 'users', user.email))
            setCurrentLoginUser(docRes.data())
        }
        catch (error) { console.log(error) }
    }


    netInfo.isInternetReachable ?
        onAuthStateChanged(auth, (user) => userHandler(user)) : null

    return (
        <>{currentLoginUser ?
            <MyContext.Provider value={{ currentLoginUser }} >
                <SignInStack />
            </MyContext.Provider>
            : <SignOutStack />}
        </>
    )
}