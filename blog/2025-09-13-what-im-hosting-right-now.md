---
slug: what-im-hosting-right-now
title: What I'm Hosting Right Now?
authors: eric
tags: [selfhosting]
---

A few years back, my wife and I decided to start messing around with game design as a hobby. My brain immediately time traveled to a future where we're working with contractors and publishers as a business entity.

A bit early for that? Absolutely. In response, I'll posit this: It's never too early to build out our studio's IT infrastructure! I then run off with my binder and pocket protector.

<!-- truncate -->

I am a huge fan of workflows and tooling. Having a large practical problem like this to solve is a fun as eating ice cream. It's a long post, so please skip around.

Table of Contents
-----------------

-   [Networking Apps](https://eric-post.com/what-im-hosting-right-now/#network-apps)
-   [Identity Access](https://eric-post.com/what-im-hosting-right-now/#identity-access)
-   [Monitoring](https://eric-post.com/what-im-hosting-right-now/#monitoring)
-   [Notifications](https://eric-post.com/what-im-hosting-right-now/#notifications)
-   [AI](https://eric-post.com/what-im-hosting-right-now/#ai)
-   [Container Management](https://eric-post.com/what-im-hosting-right-now/#container-management)
-   [Update Management](https://eric-post.com/what-im-hosting-right-now/#update-management)
-   [Documentation](https://eric-post.com/what-im-hosting-right-now/#documentation)
-   [Backup & Disaster Recovery](https://eric-post.com/what-im-hosting-right-now/#backup-disaster-recovery)
-   [Security](https://eric-post.com/what-im-hosting-right-now/#security)
-   [End-user Support](https://eric-post.com/what-im-hosting-right-now/#end-user-support)
-   [Productivity Services](https://eric-post.com/what-im-hosting-right-now/#productivity-services)

Network Apps
------------

-   Nginx Proxy Manager
    -   My reverse Proxy
    -   Bought a domain (eric-post.com) and pulled its cert using this tool. This, in conjunction with DNS rewriting, allowed me to put HTTPS in front of my internal home services.
-   AdGuard Home
    -   My internal DNS
    -   I used PiHole for about a decade before moving over to AdGuard Home. I felt that the ad blocking performance and efficacy was about the same between the two.
    -   What got me to finally switch over was the AdGuard's ability create DNS rewrites. At first, I used this to make internal domain names based off of cat puns. Much better to give my wife a URL to bookmark once, instead of telling her new IPs each time I swapped services to other hosts. However, this became 100% critical once I introduced Nginx Proxy Manager.
-   Cloudflare DNS & Zero Trust Netoworking
    -   My external DNS
    -   I rely on Cloudflare as my eternal DNS provider for eric-post.com because their 'Zero Trust' network access tool lets me securely expose my internal services. Oh yeah, it's also free!
        -   I self-host their 'Cloudflared' container which creates a private network tunnel between Cloudflare and whatever internal service I point it at. (I love tunnels because I don't have to open ports on my end.) I then created a network application on the Cloudflare end that put's my exposed service behind an MFA prompt.
            -   In order to access the login page for my exposed service outside my network, you need to already have your email address included in the ACLs within Cloudflare. Then you need to be able to check that email to gain the codes you need to proceed. Not bad!
        -   If at some point, I stop trusting Cloudflare's zero trust solution, I'll move onto Pangolin, a comparable open source solution.

Identity Access
---------------

-   Pocket-ID
    -   My private SSO Provider that provides OIDC authentication.
    -   This is a super light weight and focuses on passing tokens instead of passwords.
    -   Not all my services are compatible with OIDC yet. For those, I still rely 1password to get by.
    -   I may add Authentik at some point if I end up with more users than just my wife, only because it supports every other authentication solution, and should cover almost all of my services. It's also been audited by independent security firms. However, it's bloated and 97% of its features are overkill for my use cases.
        -   I am sticking with Pocket-ID for now, holding out hope that OIDC support in the FOSS community continues to grow.
        -   If I suddenly need to onboard other apps using Pocket-ID OIDC tokens that aren't compatible, I believe I know better option than Authentik.
            -   I would try to use the "oauth2-proxy" container service to do the translation with non-OIDC compatible services. I had this setup once but never really needed it, so I spun down the service. However, if security audits get involved, I'll probably have to come crawling over to Authentik instead to make sure I'm covered.

Monitoring
----------

-   Beszel
    -   Simple host and container performance monitoring.

-   It's agent can be installed on the host itself, or ran in a container. I love this flexibility.

-   Uptime Kuma
    -   Service up/down monitoring.
    -   An open-source Swiss army knife for monitoring a ton of different services. Very useful when troubleshooting.

Notifications
-------------

-   Mailrise/Apprise/Pushover stack
    -   Mailrise acts as an SMPT server that translates SMTP messages into something that Apprise can read.
    -   Apprise is compatible with a ton of modern message protocols. It takes the translated email sent from Mailrise and sends it over to Pushover's API.
    -   Pushover is a service that will send push notifications to your phone. I've been using its free tier for a long time without any troubles.

AI
--

Because it's 2025, and everybody should have their own private AI tools.

-   LiteLLM
    -   Connects all LLM models together into one API.
        -   External Models (With super cheap API pricing!)

-   Grok
-   Chat-GPT
-   Anthropic

-   Local Models
    -   Llama
    -   gpt-oss
    -   Gemma
    -   Deepseek

-   Comfy UI
    -   Used for generating images from text prompts to kick-start creativity and inspiration.
-   Open WebUI
    -   Gives me an easy chat interface like chat-gpt.
    -   Connects with LiteLLM, which in turn connects it to all the LLMs above.
-   MAESTRO
    -   Geared towards time intensive research. Give it a topic, a series of questions to answer, how long you want it to spend, and it will get to work searching the internet for you. It will spawn a bunch of individual web search agents, then compile all their notes onto one page. Then it will take those notes and compile it into a fancy report for you.
    -   SearXNG - This is a private self-hosted search engine. It can be used like Google and all that, but I honestly just have this running for MAESTRO.
        -   You can pay for API tokens from a service like LinkUP. Or, you can be like me and just point MAESTRO at your local SearXNG instance and enjoy free automated web searching.
-   Home Assistant
    -   I replaced my Alexa and Google Home devices with the voice assistant feature that comes with Home Assistant. In addition to the typical home automation fair, you can ask my local LLMs a question using your voice.

Container Management
--------------------

-   GitHub (The exception!)
    -   My source of truth for all my container's docker compose files and other scripts.
    -   I used a Gitea instance for years, but I outgrew it when I began playing around with mend renovate and becoming envious of Github/Gitlab pages.
    -   I moved over to hosting my own GitLab instance (using runners for CI/CD automation) for a while before settling with GitHub. It's become too important as a core service and I no longer trust myself to self-host it more securely than how GitHub already does.

> "It's a relief knowing that I'm no longer self-hosting my source of truth for my self-hosted service." Eric Post, right to your face.

-   Komdo
    -   Docker container orchestration
    -   I used Portainer for a few years before moving over to this Komodo earlier this year. If I ever went back to hosting an HA docker swarm cluster, I can easily see myself moving back to Portainer.
    -   Komodo was a bit tougher to set up, but I love how it's work flow is centered around remote Git repositories and lets me easily point my stacks (compose files) at other servers on the fly. Perfect for how often I tend to move services around.
    -   These days, I primarily use it to manage containers located on a special container VM I have set up on Unraid. These are for services that I have not migrated over to either Unraid or Home Assistant yet. Or, for the few services begrudgingly located on my Synology's NAS's for whatever reason.
    -   I played around with Kubernetes using Talos Linux and Lens about a year ago. I dropped all that when I realized how much time I'll be spending converting services over. Learning about helm files gave me hope on getting back into Kubernetes once again if my services actually become important.
-   Unraid
    -   Focused on GPU and heavy CPU container workloads.
    -   I have an old gaming machine with top end hardware for the 2020 era, i7 with a GeForce 2080 Super . I replaced it with a new one this year and wasn't sure what to do with it. Slapping Unraid on it elevated it to being my favorite server in my home. It's so easy to use that even my wife is fine logging into it and managing our game servers.
        -   I came up with an odd use case where I wanted the video card HDMI output to pipe video from a Pop!_OS VM. I wanted it to be my VM for all my GPU related work flows and containers while also being the family media PC connected to my living room TV. I thought that was just a bridge to far until I learned about Unraid. I gave it a shot, and it did all that I wanted and more! I liked it so much I bought the lifetime license within a week of the trial. I might go on and on about how great Unraid is in another post at some point.
            -   I would be lying if I said I kept that setup going for too long. As impressive as Unraid's flexibility was, the GPU workloads were just bogged down too much by all the layers of translation between the VM and the GPU hardware itself. It worked, but not practically speaking. I now run all my VM workloads directly on Unraid itself via it's apps, and it's fantastic. I had to dump the Pop!*OS VM and just use an old laptop as my media PC (with it running Pop!_OS because I grew to love it)*.
    -   It's replaced my old ProxMox hypervisor server. Unraid now runs my VM work loads. As of now, this is just a single small docker container VM. I am trying to keep my VM count as low as possible. I'm trying to move away from that maintenance as much as possible
    -   Web GUI so easy and the heavy technical stuff has been abstracted away behind apps (containers) and plugins (linux tools, services, and drivers). Installing apps and plugins is as easy as browsing through the included app store.
        -   It also supports typical docker compose files and can be managed like these "apps". You can even install a container manager agent for something like Portainer and Komodo and manage all these "apps" remotely if you prefer that instead. I did for quite a while.
        -   At first, the user-friendliness felt restrictive. However, once I realized how easy it was to turn my wife into her own system admin with just a few clicks had me thinking that I had an answer to an old question. If I got obliterated by a buss, how will she manage the services I maintain that she's come to rely on? I think focusing on migrating as much as I can to Unraid will be the best solution to this for now. I'm about 60-70% there already.
    -   Home Assistant Add-Ons
        -   Similar to Unraid, add-on for home assistant are just curated containers from their built-in app store.
            -   At first, this app store feels a bit too small to fit many use cases. However, once I set up HACS (a custom add-on repo) my options opened up immensely.
                -   I use this to host many containers like my primary DNS (AdGuard), ZigBee2MGTT, Nginx Proxy Manager and much more. I trust Home Assistant because the folks behind the project seem to know what they are doing.
                -   I've accidentally broke the OS catastrophically by poking around under the hood where I should have more than a few times. Any other OS when of kernel panicked. Yet, Home assistant OS keeps scanning for my mistakes and fixing itself upon reboot each time.
            -   Just like Unraid, my wife is already logging into turn things on and off occasionally, so when I kick the bucket, she can easily keep it updated, add new apps, and trucking along for as long as she wants. For very light CPU only workloads, I try to put them on this server first.
    -   Synology NAS
        -   Not a fan of how perpetually out of date their docker container app is. It's also easy to outgrow the GUI within just a few hours of learning docker compose. However, it works great when used in conjunction with a container manager like Komodo or Portainer. Just install a Komodo agent on there, then you can manage the stack remotely.
        -   Not a fan of the 2x VM license limit.
        -   Perfect for container based workloads focusing on managing data on the NAS directly.

Update Management
-----------------

-   Containers
    -   Komodo
        -   Komodo is most likely the worst answer to most. I say that because it's auto update features, albeit totally functional, doesn't give you any control as to when it performs the container update. It does support push notifications which goes far into at least letting me know what's going on as it happens.
        -   Not great, but my backups are resilient enough to where I'd rather just get the latest security updates and live recklessly.

-   Unraid
    -   App and plugin updates are managed through an auto-backup job that runs each night at a set time. Much more manageable to Komodo's update jump scares.
-   Home Assistant
    -   Most of the services on this host are way too important to auto-update on their own. I have it set to let me know when updates are ready in the GUI. I check once a week, click a button and do the needful in a controlled manner.

-   VM Hosts
    -   Ansible
        -   I have playbooks that run package manager updates at a set time every night. They're configured to send push notifications when a host needs a reboot.
        -   I hate having to remember to maintain bare-metal and VM hosts. I try to minimize their presence in my home as much as possible. Ansible is there to make sure that basic routine maintenance doesn't slip by for the ones I begrudgingly have running.

Other hosts like bare metal Unraid or my Synology NAS's send me push notifications when a new update is ready. I review them and get them installed during weekends. Way too critical for anything automatic.

Documentation
-------------

-   Blinko
    -   Used for quick notes I need to take down on my smartphone when I am out and about. When I get home, I move these notes over to one of the services listed below. Exposed using Cloudflare zero trust.
-   TrilliumNext
    -   I have a separate instance for my wife and I. Best used for when a hierarchical note style is needed.
-   Bookstack
    -   This is used as our main knowledge base for just about everything. It's organized like a physical library. You have bookshelves that contain individual books and those each have their own chapters and pages. Very intuitive architecture.
-   YouTrack
    -   My favorite project management tool. It has all the project tools you can ask for in one location.
    -   It's a commercial tool created by JetBrains. It's free and self-hostable if you have less than 10 users.
    -   Just like home assistant, it backs itself up as a zip file every night and copies that zip file over to my NAS. It stores only 30 days worth of backups. Those are shipped out to Switzerland nightly.

Backup & Disaster Recovery
--------------------------

Asset Drive

-   iSCSI/Syncthing/ProtoDrive stack. Automated local and offsite backups syncing.
-   I am a little proud of this asset drive solution I came up with. I think of it like a data conveyor belt that automatically syncs backups and ships them out to Switzerland.
    -   It starts off as 2x iSCSI shares connected to both our PCs. Both are stored on my NAS's raid.

-   I have a Syncthing agent installed on both PCs. Allowing the Syncthing container running on my NAS to sync all the data in the asset folder every minute over to the iSCSI drives attached to each of our PCs. This gives the asset drive the feeling like it's a shared Dropbox that you can execute applications on directly. It's as resilient as it is collaborative.
-   On my PC, I have my Proton Drive installed and pointed to the asset drive, along with another backup drive. All changes that get synced to those drives get synced out to my off site backup location at the same time. Located in the EU using the Proton Drive service.
-   It's easy to tell my wife that anything she really cares about can just be dragged and dropped onto this asset drive, and she can then safly forget about it.

Paperless-NGX

-   Automatically places important physical documents that I scan with my phone into a single location on my NAS's asset drive location. It then allows me to search and tag them within the interface. There is a folder on my iSCSI asset drive that I can drag and drop files into and have it automatically be ingested into Paperless-NGX. All gets shipped out to Switzerland.
-   I also have this connected to Paperless-AI and Paperless-GPT so that my local LLMs can interact with these documents.

NAS

-   NFS Mounts
    -   Used originally to host my exposed docker volumes across the network. This worked fine but ran into odd issues with containers that relied on a database. I had to move those services around to different hosts until I realized that pattern. I looked it up and found out that what I was doing was dumb. I later learned to minimize my use of NFS.
    -   Used primarily has a method to ship backups from host to NAS.
-   iSCSI
    -   Desktop PC Drives
        -   Asset Drive
        -   Proton Backup Drive
-   Windows Shares
    -   The original network shares I set up about a decade ago, with data going back to when I was a child in the 90s. Not used as much since I implemented the iSCSI drives.

Containers Volumes

-   Komodo
    -   Nautical Container Backup Service
        -   Every night at a set time, Nautical stops all the other running containers on the host, copies all the volume data to a backup file share on my NAS across my network using an NFS mount.
        -   This NFS backup file share is synced to my PC's Proton Backup Drive iSCSI drive using Syncthing. The installed Proton Drive application on my PC then syncs all this backup data out to Switzerland.
        -   This ensures that I always have the last nights backups available in raw form. Allowing me to quickly revert and fix any containers that I break or blow up from a bad update.
-   Home Assistant
    -   It's super easy to configure it to back up itself and it's apps into a super easy zip file then drop it on a remote file share. I have it set to do this every night and delete any backups older than 30 days.
-   Unraid
    -   Appdata Backup Plugin
        -   Appdata is where all the container volumes are stored by default.
        -   Just like Nautical, this plugin stops all running containers each night, copies all their volume data over to the backup share on the Synology NAS over an NFS mount. This backup share is synced out to Switzerland. Finally, it runs the containers again, pulling in its latest updates.
    -   Duplicati
        -   Runs as container located on the container VM (hosted on unraid)
        -   This service takes the copied files from the Nautical backup job described above, encrypts them and applies a "Smart backup retention" backup policy. Then it places those encrypted files in a separate directory in the same backup shared on the NAS.
            -   What is smart backup retention? For Duplicati, it means this: There will remain one backup for each of the last 7 days, each of the last 4 weeks, each of the last 12 months. There will always be at least one remaining backup.
        -   The Duplicati NFS file share is also synced to my Proton Backup Drive using syncthing and shipped out to Switzerland.

-   UrBackup
    -   My wife's old gaming PC turned into a Fallout 4 only computer. She spent so much time in reinventing the world like an environmental artist using hundreds of mods over 7 years.
        -   Her gaming PC had to be enshrined as it was back in 2018. Still near her desk but only connected with a network cable so she can remotely play with moonlight/sunshine. Her thousands of hours spent on her save file meant that getting a backup solution for her became very important.
    -   UrBackup runs a full image backup once a month, and then incremental image backups every 2 days and store those files on the NAS.
        -   These backups have been tested in VMs, and I was able to install her PC image on her steam deck and her fallout 4 save worked! UrBackup is a perfect file backup and network image solution.
    -   It's running on my Unraid server because it can use a lot of CPU while running its remote image backups. What would take up 80% of my Raspberry Pi 5 or on my NAS would only use about 10% cpu on my Unraid server's i7. Much better tradeoff.
    -   This backup does not go to Switzerland. I'm too cheap to pay for that much storage right now.

UPS

-   I own 3x UPS's.
    -   UPS 1: Powers all my network gear and a few Raspberry Pi's.
        -   I heavily rely on PoE to keep the all the networking gear across my entire home efficiently powered and protected. I find that having all your network gear on a single UPS can keep my entire network going chugging along for an hour or so. If I plug in anything else, I suddenly only have 8 minutes.
    -   UPS 2: Powers my Unraid server and a few Raspberry Pi's.
        -   Installed the NUT (Network UPS Tools) plugin that could connect to my UPS over USB. It sends me push notifications when it detects power up/down events. It's also configured to gracefully shutdown VMs and containers if power isn't restored within 5 minutes. This covers about all of my important services. I really, really love this!
        -   I tried many times to manage my UPS with NUT with just the Linux command line. I could never get it to fully work. Meanwhile with Unraid, just download the plugin using the GUI, and it works great out the box with its own dashboard widgets.
    -   UPS 3: Powers our desktop PCs. Gives us about 10 minutes quite our games and shut down out computers.

DNS Failover

-   AdGuard Home Sync
    -   This service syncs the configurations once an hour between my primary DNS server and secondary DNS server.
    -   I initially ran an HA cluster with failover, but after learning about AdGuard Home Sync, I realized this container provides the same redundancy without all the hassle that comes with cluster maintenance.

Security
--------

KASM

-   Web app running my Unraid (because of the GPU support) server that allows you to spin up temporary containers, from a full OS or just a single app like a web browser. You can download full operating systems and applications from the app store and get something up and running in seconds, then destroy it a minute later.
-   Tools appear when I need them and go away when you don't. No need to maintain VMs. Perfect for using tools that you only need every once in a while.
-   It's my #1 tool for:
    -   Running stuff found in Kali Linux or Parrot OS.
    -   Opening up browser containers to detonate links.

End-User Support
----------------

-   RustDesk
    -   Feels like an open source TeamViewer.
    -   I host a RustDesk container server that allows designated clients can connect to.
    -   I have Raspberry Pi running at my Mom's house that is connected to its own restricted vLan in my home network using tailscale. I have this vLan connected to this RustDesk server. Meaning I can help my mom over the phone and gain remote access using all my own tools as if they were in the same network. Very nice!

Productivity services
---------------------

-   The typical boring media PC related stuff that most people commonly self-host.
-   Navidrome
    -   I'm a child of the MP3 90s. I never got into streaming platforms. I buy mp3's from Bandcamp and stream them to my devices using Navidrome.
-   Drawpile server
    -   Open source multiplayer photoshop-like application. Great for collaborative mood boards and stuff like that.
-   LanguageTool
    -   It's your own free private self-hosted open source Grammarly!
-   Mealie
    -   Recipe and shopping list. Exposed using Cloudflare zero trust so I can access on my phone at the grocery store.
-   DumbSuite - Very singularly focused web apps.
    -   Dumb Do
        -   Basic to-do list
    -   Dumb Pad
        -   Basic scratch pad
    -   Dumb Kan
        -   Basic KanBan Board.
    -   Dumb Budget
        -   Basic budgeting app.
-   Haus
    -   Perfect little suite of productive side tools. I primarily use it for mixing ambient sounds to help me focus.
-   Ghost
    -   It's the blog thing you're looking at right now. Based off an old WordPress add-on, I believe.
    -   I don't know if I really recommend it. It's very simple, straight forward and not a lot of fun for tinkers like me. But, it's out-of-the box nature does force me to actually focus on writing. I hate how effective that has been for me.
-   Wallos:
    -   Service to keep track of our active monthly and yearly subscriptions. Tied to push notifications that alert when specified services are about to renew.
    -   I really need to take the time to set this up properly. It's one of those things that feels important but too boring to really dig into.
-   IT-Tools
    -   Swiss-army knife of free random system admin tools.
    -   There are better, more complete solutions like this out there. I just haven't spent the time playing with them yet.
-   Home Intranet
    -   Homepage
        -   Yaml based homepage tool. I've added custom widgets like stock tickers, search bars and integration like home assistant automation, and much more. Ton's of API compatibility with lots of popular self-hosted tools
        -   I placed all my end-user facing applications and AI services here.
    -   Organizr
        -   Fantastic services that wrap a website around a very customizable roll-out frames that give you access to more bookmarks. I added all my system admin bookmarks here.
        -   I have this pointed to my homepage service by default, allowing me to see both user and admin world simultaneously. It's worked so well for me and my routine that I haven't used my browser's bookmarks for several months now. I never thought I'd be a "homepage" guy, but using both homepage and organizr in conjunction with each other is a perfect solution for having admin and user scopes isolated, yet available.
        -   Big downside: Maintainer disappeared 3 years ago and this service apparently wasn't popular enough for any forks to appear. Very, very depressing. It still works, but it's a bit janky, and I am sad for the day it becomes a too much of a liability.

I have a few more services bouncing around, but I want to end this here. I now realize just how much work I have put into this stuff over the past few years. Wow!