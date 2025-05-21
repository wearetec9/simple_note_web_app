'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

function Headers() {
    const {user} = useUser()
  return (
    <div>
        {user && (
            <h1>
                User is loggin
            </h1>
        )}
    </div>
  )
}

export default Headers

