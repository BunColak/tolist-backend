import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import express from 'express'

const prisma = new PrismaClient()

interface ContextFunctionParams {
  req: express.Request
}

export interface UserToken {
  id: number;
}

export interface Context {
  prisma: PrismaClient
  user?: UserToken
}

export function createContext ({ req }: ContextFunctionParams): Context {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    const verifiedToken = jwt.verify(token, 'secret')
    if (typeof verifiedToken === 'object') {
      return { prisma, user: verifiedToken as UserToken }
    }
  }
  return { prisma }
}
