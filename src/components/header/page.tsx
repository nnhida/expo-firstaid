'use server';

import React from 'react'
import { getSession } from '../../lib/auth'
import Ui from './ui'

export default async function Header() {
    const dataLogin  = await getSession()
    const data = dataLogin?.data
  return (
    <Ui dataLogin={data}/>
  )
}
