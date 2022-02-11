# A working demo of RustDesk server implementation

This is a super simple working demo implementation with only one relay connection allowed, without NAT traversal, persistence, encryption and any other advanced features. But it can be your good starting point to write your own RustDesk server program.

## How to run

```bash
# install rustup first, https://rustup.rs/
IP=<public ip of this machine> cargo run

sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbr -p 21117:21117 -v `pwd`:/root -it --rm rustdesk/rustdesk-server hbbr -m <registered_email>
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -v `pwd`:/root -it --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip> -m <registered_email>
```

https://rustdesk.com/blog/id-relay-set/

https://github.com/rustdesk/rustdesk/issues/115

If you still need my private help, [buy me a good hotpot](https://github.com/sponsors/rustdesk/sponsorships?sponsor=rustdesk&tier_id=84000&preview=false) please!

# Acknowledgements

- [realm](https://github.com/zhboner/realm)
