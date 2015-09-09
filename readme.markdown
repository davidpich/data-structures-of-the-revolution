# data structures of the revolution

---

large companies control a vast share of the world's resources

---

large technology firms control a vast amount of information and power

---

things you can't do on the web right now:

* scraping data freely (rate limits everywhere)
* use web services offline
* freely publish tools that reach a wide audience (app store gate-keeping)

---

imagine how many more tools we could make
if people were putting data into open p2p systems instead

---

how to build systems that nobody can own

---

how to build systems that nobody can own
how to build systems that can't be shut down

---

how to build systems that nobody can own
how to build systems that can't be shut down
how to build systems that don't extract rent forever

---

almost every VC-backed startup is trying to build a monopoly
to charge rent as long as possible

---
# the sharing (aka rent-seeking) economy

solving coordination problems with technology
and skimming a percent off the top of every transaction

---
# sharing economy vulnerabilities

* few of these companies have much lock-in (yet)
* most companies operating at a loss, powered by VC money faucet
* coordination problems can be solved for fixed cost using p2p

---
# goals

* be ready with working p2p alternatives when other systems fail

---
# decentralized alternatives

* trust
* data distribution
* hosting
* anonymity

---
# other overlooked coordination problems

* collective bargaining power (rent strike! debt strike!) 
* direct action
* workplace unionization
* laws

---
# how-to

* protocols
* transports
* DHT
* merkle DAG

---
# protocols

* favor symmetric protocols (peers) over defined roles (server, client)

---
# transport-agnostic

http://github.com/dominictarr/rpc-stream#rant

Instead of picking a transport, use a duplex stream!

``` js
REMOTE_SSH_STREAM           //<-- pipe data from a remote source
  .pipe(DECRYPT_STREAM)    //through some ('middleware') streams
  .pipe(GUNZIP_STREAM)
  .pipe(RPC)               //<--- pipe the data through the RPC system.
  .pipe(GZIP_STREAM)
  .pipe(ENCYPT_STREAM)
  .pipe(REMOTE_SSH_STREAM)  //<-- and back to the remote
```

---
# transports

If you pick a transport that browsers can speak natively,
every web page can become a peer.

* websockets (npm install websocket-stream)
* webrtc (npm install simple-peer wrtc)

handy command-line tools: nc, wsnc, rtcat

---
## symmetric protocols

If your replication speaks stdin and stdout, you can do:

```
$ dupsh 'yourproto replicate -d /tmp/a' 'yourproto replicate -d /tmp/b'
```

---
## symmetric protocols

If one side needs to be a websocket connection:

```
$ dupsh 'yourproto replicate -d /tmp/a' 'wsnc ws://localhost:5000'
```

---
## symmetric protocols

If one side needs to be an ssh connection:

```
$ dupsh 'ssh yourhost "yourproto replicate -d /tmp/a"' \
  'yourproto replicate -d /tmp/b'
```

---
## symmetric protocols

Now you can replicate with a browser using `ws://localhost:5000`:

```
$ dupsh 'yourproto replicate -d /tmp/a' 'wsnc -lp 5000'
```

---
## handy protocol modules

* multiplex
* rpc-stream
* protocol-buffers

---
## useful multiplex pattern

* control stream on one channel (named `'rpc'` or whatever)
* other streams for bulk data

weather satellites work this way

---
# dht

Distributed Hash Table

fetch pieces of files from peers

* bittorrent (currently works in the browser)
* ipfs (browser support soon)

inverse scaling: the more people get the data, the better it works

---
# append-only logs

only append, not modify or delete

---
# merkle DAG

robust, tamper-proof data, like git!

we have these messages: A, B, C, D

A includes the hash of B
B includes the hash of C
C includes the hash of D

---
# merkle DAG useful modules

* ipfs
* bittorrent-dht with bep44
* hyperlog
* forkdb

---
# identity in a distributed system

centralized identity:

* to sign up, you need to ask somebody's (a webserver's) permission

decentralized identity:

* to sign up, you create a keypair (locally)
and start signing messages (locally)

---
# identity

* for node: npm install sodium
* for the browser/node: npm install tweetnacl

or use: npm install sodium-signatures

---
# handy client/server data module ecosystem

* leveldb

To use in the browser: level-js / level-browserify

---
# p2p homework: youtube

* indexing scheme for search and feeds
* host data over webtorrent or ipfs
* pinning to make sure content is seeded (ipfs pin)
* slick interface

---
# p2p homework: p2p live streaming

same as youtube replacement, but incremental upload

* ideally self-archiving
* https://github.com/mafintosh/peervision

---
# more homework:

* p2p twitter, facebook, taxi, hotels
* voting, github issues
* p2p secret union election

---

HACK THE PLANET
