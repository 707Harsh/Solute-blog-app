import { Hono } from 'hono'
import { user } from './routes/user'
import { blog } from './routes/blog'


const v1route = new Hono()

v1route.route('/user', user)
v1route.route('/blog', blog)

const app = new Hono()

app.route('/api/v1', v1route)

export default app
