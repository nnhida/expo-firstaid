'use server';

import React from 'react'
import Ui from './ui'
import { getUserAll } from '@/api/user';

export default async function page  () {

    const userList = await getUserAll()
  return (
    <Ui userList={userList}/>
  )
}
