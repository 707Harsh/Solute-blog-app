import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

user.post('/signup',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }})
  
    const token  =  await sign({id : user.id}, c.env.JWT_SECRET)
  
    return c.json({ jwt : token })

  } catch (error : any) {
    c.status(403);
    return c.json({ "msg": "error during signing up" })
  }

})

user.post('/signin',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })
    
      if(!user) {
        c.status(403);
        return c.json({ "msg": "User not found" })
      }
    
      if(user.password !== body.password) {
        c.status(403);
        return c.json({ "msg": "Invalid password" })
      }
    
      const token = await sign({id : user.id}, c.env.JWT_SECRET)
      return c.json({ jwt : token })
  } catch (error : any) {
    c.status(403);
    return c.json({ "msg": "error during signing in" })
    
  }
})