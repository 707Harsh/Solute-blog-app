import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@harshchaudhary/solute-common';

export const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
    Variables: {
        userId: string
    }
}>();

blog.use(async (c, next) => {
  const header = c.req.header('Authorization') || ""
  const token = header?.split(' ')[1]

  try {
    const response = await verify(token, c.env.JWT_SECRET) as {id:string}
    if(!response){
        c.status(403)
        return c.json({ "msg": "Unauthorized" })
    }
    else{
        c.set('userId', response.id)
        await next()
    }
  } catch (error) {
    c.status(403)
    return c.json({ "msg": "Unauthorized" })
    
  }
})


// todo : add pagination
blog.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        try {
            const posts = await prisma.post.findMany()
            return c.json({ posts: posts })
        } catch (error) {
            c.status(403);
            return c.json({ "msg": "Error getting posts" })
        }
})
blog.get('/:id',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

  const id = c.req.param('id')

  try {
      const post = await prisma.post.findUnique({
        where: {
          id: id
        }})
        return c.json({ post: post })
  } catch (error) {
    c.status(403);
    return c.json({ "msg": "Error getting post" })  
  }
}) 
blog.post('/',async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({ "msg": "Invalid input" })
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        })
        return c.json({ id: post.id })
    } catch (error : any) {
        c.status(403);
        return c.json({ "msg": "Error creating post" })
        
    }
})
blog.put('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({ "msg": "Invalid input" })
    }

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({ id: post.id })
    } catch (error) {
        c.status(403);
        return c.json({ "msg": "Error updating post" })
    }
})