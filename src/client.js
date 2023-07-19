"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@trpc/client");
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
var trpc = (0, client_1.createTRPCProxyClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: 'http://localhost:3000',
        }),
    ],
});
// Inferred types
var users = await trpc.userList.query();
console.log(users);
var createdUser = await trpc.userCreate.mutate({ name: 'sachinraja' });
var newUsers = await trpc.userList.query();
console.log(newUsers);
