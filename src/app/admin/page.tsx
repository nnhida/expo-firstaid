'use server';

import React from 'react'
import { getSession } from '@/lib/auth'
import Ui from './ui'
import { getUserCount } from '@/api/user';
import {getPostCount } from '@/api/post';

export default async function Page() {


    

    const dataUserCount = await getUserCount()
    const dataPostCount = await getPostCount()
    const dataLogin = await getSession()
    const data = dataLogin?.data

    return (
        <Ui dataLogin={data} userCount={dataUserCount} postCount={dataPostCount}  />
    )
}

