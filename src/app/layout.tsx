import './globals.css'
import type { Metadata } from 'next'
import { Rubik, Ubuntu } from 'next/font/google'
const rubik = Rubik({ subsets: ['latin',  'hebrew'] })
import Head from "next/head";
import i18n from '../../i18n.config';
import ThemeRegistry from "@/app/ThemeRegistry";
import {AppConsts} from  '@/constants/app_consts'
import React from "react";
import HeaderBar from "@/components/HeaderBar";

export const metadata: Metadata = {
  title: AppConsts.app_name,
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
      <html lang="he" dir="rtl">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
          <body className={rubik.className}>
            <ThemeRegistry>
              <HeaderBar/>
              {children}
            </ThemeRegistry>
          </body>
      </html>
  );
}
