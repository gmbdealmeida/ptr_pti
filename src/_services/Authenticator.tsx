import React from 'react'
import { CheckToken, GetProfile } from './api';

export default function IsAuthenticated () {
    if(Date.now() - (new Date(parseInt(localStorage.getItem("lastChecked") as string))).getTime() > 600000) {
        CheckToken().then(res => {
            localStorage.setItem("lastChecked", Date.now().toString())
            localStorage.setItem("authenticated", "true")
            localStorage.setItem("accountType", res.data.accountType)
            GetProfile().then(dataP => {
                localStorage.setItem("userData" ,JSON.stringify(dataP.data.user))
                localStorage.setItem("authenticated", "true")
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            localStorage.setItem("authenticated", "false")
        })
    } else if(localStorage.getItem("lastChecked") ===  null) {

        CheckToken().then(res => {
            localStorage.setItem("lastChecked", Date.now().toString())
            localStorage.setItem("authenticated", "true")
            localStorage.setItem("accountType", res.data.accountType)
            GetProfile().then(dataP => {
                localStorage.setItem("userData" ,JSON.stringify(dataP.data.user))
                localStorage.setItem("authenticated", "true")
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            localStorage.setItem("authenticated", "false")
        })
    }
}

export function LogOut(){
    localStorage.clear()
}