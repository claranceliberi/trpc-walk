import { z } from "zod";
import {procedure, router} from "./trpc";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const users = [
    {id: 1, name: "John"},
    {id: 2, name: "Jane"},
    {id: 3, name: "Jack"}
]

const appRouter = router({
    userList: procedure.query(async () => {
        return users;
    }),
    userById: procedure.input(z.number()).query(async (opts) => {
        const {input} = opts
        return users.find((user) => user.id === input)
    }),
    userCreate: procedure.input(z.object({name:z.string()})).mutation(async (opts) => {
        const {input} = opts
        const newUser = {id: users.length + 1, name: input.name}
        users.push(newUser)
        return newUser
    })
});

export type AppRouter = typeof appRouter;


const server = createHTTPServer({
    router: appRouter,
})

server.listen(3000)