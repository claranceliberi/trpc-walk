import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});


// Inferred types
const users = await trpc.userList.query();
console.log(users)
 
const createdUser = await trpc.userCreate.mutate({ name: 'sachinraja' });

const newUsers = await trpc.userList.query();

console.log(newUsers)