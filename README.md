# remix8

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/11/28

 update  :

***
### Summary

Remix + apollo-client , Cloudflare Workers app sample

***
### required
* remix
* node : 16.13
* @apollo/client

***
### setup

apollo-client.ts, set apollo-server URI

```
uri: 'http://localhost:3000/graphql',
```

***
* apollo-server

https://github.com/kuc-arc-f/apollo_sv_atlas_2_pub

***
### start server
* Start :

```
yarn build
yarn start
```

* build , Cloudflare Workes

```
yarn deploy
```

***
### Related: 

https://zenn.dev/knaka0209/articles/fd9d694b2ce41f

***

