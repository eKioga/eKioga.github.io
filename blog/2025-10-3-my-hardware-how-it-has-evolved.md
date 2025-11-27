---
slug: my-hardware-how-it-has-evolved
title: My Hardware & How it Has Evolved
authors: eric
tags: [selfhosting]
---

Up until around 2008, I would be either hosting a Ventrillo server or some ad-hoc game server directly off my gaming rig. Before I learned about port-forwarding, I'd route the ethernet cable from the ISP modem directly into my desktop computer so all my friends can connect over. I'm not going to let some firewall tell me what I can and can't host! I was a dumb kid that reformatted his system almost weekly back then. I wonder why...

<!-- truncate -->

From 2008 to 2014, my self-hosting skills got a bit better. I had a spare MacBook Pro that I would run Ubuntu on. I guess this would be my first server hardware. As a bonus, I knew enough about networking that I had zero problems managing proper firewall access. I'd host my ventrillo and game servers strait from the local terminal. It's built in battery acting like a UPS. I felt like a wizard. That is, until the MacBook would over-heat each time I tried to shut the lid or place it somewhere out of the way. Not great, but I got by.

In 2015, two big things happened. I was introduced to Raspbery Pi's through a work project. I was also gifted an old Dell PowerEdge desktop server from 2012 by my IT director.

My IT director at the time had a dream where we would stick a Raspberry Pi to the back of the TV in the IT room. He wanted it to display up/down checks to all the satellite offices spread out across the US. Mostly as a display prop for when upper management walks in.

I told him that if bought the Raspberry Pi 3, I'd work on making his dream a reality. I was just a helpdesk guy who never used one or seen one before, but the idea of tinkering with it and learning more while getting paid was too hard to pass up. Within a few days, I had the Raspberry Pi 3 stuck on the back of the TV, running Raspbian desktop as the OS, with CheckMK running network checks under the hood. It looked nice with the CheckMK browser dashboard up on full screen. I felt some pride.

My director was happy, and I got to learn a lot about using a Raspberry Pi, Linux and networking tools like Nagios, Cacti and CheckMK. I was so happy with what I learned that I went home and bought 4x Raspberry Pi's for my home lab and a tiny cluster rack to store them in. Each Pi ran headless Raspbian OS, hosted its own service and remotely managed over SSH. I installed Pihole on one of these Pi's and pointed my network equipment at it as my DNS server. (This was my internal DNS server all the way until mid-way 2025 where I migrated over to AdguardHome due to its DNSSEC features that PiHole didn't have.) It ran almost constantly for 9 years with zero issues. Same with my other Pi's. I trust them.

The Dell PowerEdge desktop server introduced my home to server VMs. It had fancy ECC ram and a Xeon processor. It felt like the real deal to me at the time. I had already played with ESXi a lot already on an old company test server. (That is where I'd validate all my ideas.) So, naturally, I installed ESXi on my new test server at home. Learning about importing [TurnKey Linux](https://www.turnkeylinux.org/?ref=eric-post.com) VMs took my addiction to another level. After a month or two, I started testing other hypervisors and then settled on ProxMox, my favorite hypervisor to this day.

I ran this desktop server with several VMs for 8 years. Over the duration, its performance became agonizingly slow with it's 10 year old hard drives. I knew I needed to come up with another hardware solution soon, but I dragged my feet as much as I could.

It was around then that I finally explored this whole 'container' stuff. I've dabbled in docker and Kubernetes years before, I'd get stuff working, but it never really clicked why I'd want to it over VMs. I'd shut it all down and move back to VMs. Turns out, I had been doing it the hard way.

One day in 2022, while looking up documentation on how to install a shiny new service to a VM I had set up, I saw mention of something called "Docker Compose". I've seen this phrase pop up more and more over the years and decided to look into it. After a few hours of learning and testing, I was done with VMs forever. I now hate them. Docker compose all the things! So what now?

Consolidate my entire home lab into one single device!

My new plan was simple. Purchase a Synology NAS with the beefiest CPU, throw 32 GB of RAM. I then popped in 2 TB of NVME storage and 8TB of HD storage into it. NVME for server workloads and HD for data storage. I felt like the smartest guy around thinking I can consolidate everything into one device I can just hide.

The parts came, I put it all together and realized 3 awful things.

-   Synology now only accepts Synology branded NVME hard drives. I ran into this problem after installing my 2TB WD NVME reds. I quickly found a workaround online that disabled this check and my WD reds ran without an issue since. However, there is always the fear with any given update that those 2x WD reds might drop off the file system because they are not "official" drives. Luckily, that never happened.
-   Synology wants you to pay a monthly subscription if you dare to run more than 2 VMs at the same time. I had no idea. Suddenly the 32GB of ram I invested felt pretty dumb now.
-   Synology's container manager does work with docker compose, but its interface is limited and makes some odd choices. What's even worse is that it's always running a two-year-old version of docker under the hood. Since every docker version that is over a year old is end-of-life, every Synology update to the container manager is archeological on arrival. I really hate that.

I went from Synology being by far my favorite hardware for running a NAS to something I will never purchase again. I don't want to buy products that explode out into required subscriptions when you want to use its features. I really wish I did my homework on this one instead of making assumptions.

What now? Repeat what I did 10 years earlier. Freak out and buy 4x Raspberry Pi 5 devices and dump my containers onto those. I get to have full control again I learned about Portainer and used that in conjunction with Gitea (where I stored my docker compose files) to remotely start/stop and deploy docker compose workloads across any device with docker installed. Even easier and more addicting than TurnKey Linux.

After using them in multiple configurations, including a Docker Swarm setup across all 4 pi's that included features like HA (keepalived) and replication (CephOS). That worked alright, but the setup was way too complicated for running a few containers. I think I used 0.2% of the resources of just one of these Pis. So, I broke apart my cluster and moved on. I settled on running each Pi as its own container server while keeping the exposed volumes on an NFS share hosted on my NAS. This honestly worked really well, and I could coasted on this forever. I liked being able to deploy a docker compose file on any server without having to worry about losing data.

I don't regret buying those RPi5 devices. I did for a while back when I was only using one for my container workloads. Now days, I have one running home assistant OS, one at my Mom's house running a tale scale router so I can give her access to my picture hosting service (built in Raspberry Pi connect service makes this a dream to use as a jump box). I have one that runs bare-metal services that aren't available/compatible as a container. I have a spare one that I use for testing from time to time. It was running CasaOS for a while, but that was not a good solution for me.

Even though my dreams of running an all-in-one home lab shattered with Synology, there still is hope. I learned about Unraid and after a few weeks of testing that, I bought a lifetime license. It's running on my 5-year-old gaming rig. It's proven to be everything I could want and more. As the years go on, I will be migrating more and more stuff over to it until it's the only running box in my house. Any container workloads that don't play nice in Unraid's native interface gets relegated to a padded cell (a container VM) just for them, also running on Unraid. That's been working very nice for me over the last 4 months.

Okay, enough of all that, here is the hardware I am running today.

-   2x Synology NAS.
    -   The old one runs media related stuff because it has a celeron chip. Slow as heck, but it does well with video transcoding.
    -   The new one just holds data, NFS work loads and run just one service, Syncthing. I think of it as my datacenter. As in, the center of my data.
        -   I'll admit that I've had to run some VMs on it in emergency situations. Even though It's limited to 2 running VMs, this has been very helpful in a pinch. As in, I broke something that I don't remember how to fix. Been very handy to get something going as a workaround while I fix the actual issue.
-   4x Rasperry Pi 5
    -   Pi #1: Home Assistant OS
        -   Runs container workloads.
            -   Primary DNS server.
    -   Pi #2: Bare metal app server
    -   Pi #3: Tail scale router at a remote location
    -   Pi #4: Off and doing nothing.
-   4x Raspberry Pi 3 (still kicking after 10 years)
    -   Pi #1: Secondary DNS server (automatically syncs with primary DNS server)
    -   Pi #2: Ansible server
    -   Pi #3: Off and Unused
    -   Pi #4: Power cable died. Not motivated to replace it.
-   Gaming Desktop PC (I7, 32GB Ram, 2TB of NVME storage and an NVIDIA 2080 super for simple AI workloads)
    -   My beloved Unraid server.
        -   Runs container and VM workloads.
-   Bonus: 2x gaming PCs (AMD Ryzen 7 9800XD and NVIDIA 4080 super)
    -   Only included because I have them connected to my LLM proxy to run advanced local AI workloads on. They just have better video cards than my "AI" server right now. So, I guess I need to include them as servers.

What have I learned?

-   Just because a service runs on a container, doesn't mean it will work well with the hardware you are running it on. Example: Some containers are not ARM compatible, therefore cannot run on a Pi.
-   Some services are unstable over NFS. Those need their own local solution and need to be kept separated. I only ran into a few of these.
-   Some container services are inherently bloated (Example: YouTrack) or churn through CPU running schedule tasks (Example: UrBackup and Syncthing). Isolate those to hosts that can handle the load without robbing resources from other important services during critical times.
-   Some services are too essential to run on a host with others, they need to be isolated. I always want to be able to reboot a host without it causing network issues with other hosts or killing my automation service. If something goes wrong during maintenance, I don't want that to snowball into a complete outage.

Chasing the dream of an all-in-one home lab may never actually come to pass. I know I mentioned the possibility of Unraid fulfilling that for me. I will aim for that, but I don't think it will a 100%. I'm starting to feel like each piece of hardware I have represents a tribe with its own customs, rules, and traditions. When I become interested in setting up a new service, I need to sort out which tribe it will belong to. The rest is easy.

The better question becomes: How can I limit the amount of tribes (physical hosts) while still accommodating for all the individual quirks that each of my services have. They all require a home, after all. I expect that is what I will be thinking about the most as I continue with this hobby as I go into the future.