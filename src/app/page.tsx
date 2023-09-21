'use client'

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import AuthUtils from "@/utils/authUtils";

export default function Home1() {
    const router = useRouter();
    const { i18n, t } = useTranslation()

    // useEffect(() => {
    //     i18n.changeLanguage('he')
    // }, [])


    useEffect(() => {
        setTimeout(() => {
            if (AuthUtils.isLoggedIn()){
                router.push("login");
            }
            else {
                router.push("login");
            }
        }, 200)
    }, [])



    return (

        <main>
            <div>

            </div>
        </main>
    )
}
