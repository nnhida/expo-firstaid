'use server';

import React from 'react'
import Ui from './ui'
import { getPostAll } from '@/api/post';
import { getUserAll } from '@/api/user';



export default async function page  () {

    const postList = await getPostAll()
    const userList = await getUserAll()
  return (
    <Ui postList={postList} userList={userList}/>
  )
}
