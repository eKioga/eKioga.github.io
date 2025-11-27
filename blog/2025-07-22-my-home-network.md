---
slug: my-home-network
title: My Home Network
authors: eric
tags: [selfhosting]
---

Look at those circles and square! What the heck is a Zigbee!?

<!-- truncate -->

My home network has evolved rather little over the years. In fact, I've wasted a weekend not too long ago because I checked a box in some interface 8 to 10 years prior. So, this isn't me bragging. It's just a realization that I'm having. I just hit my 40s the other day. My stuff is old! I'm old!

The reason it's old, my network that is, is because I've used Unifi since I can remember. It's all I know now. Before that, I would just flash whatever consumer Netgear or Asus router I had on hand with open-wrt or tomato. I then spent a few years with PFsense/OPNsense on a dual nic atom Supermicro. As my interest in gaining more network control expanded, I moved onto hosting pfsense on a VM. I went deeper into the complexity. "Sorry, Babe. Your game server is down, and I still don't know why yet..."

The more I learned, the more I wanted an excuse to mess around. The more services I spun up, which consequently became important over time. And so the more complicated my home network became. I'm glad I slowed down to at least do some basic security here and there. Template something out, lock in auto updates and forgetting about it is not so bad right?

I figured it would be easier to implement security concepts as I went from the start instead of trying to retro-fit some kind of art piece that I would otherwise design.

I'm still not a networking guy. I just like to know exactly what I need to know to get to where I want to be. It's also true that I want to go in every direction by like 3 easy steps. No more, please. Let me hit that wall in just a few hours. I'll let my subconscious figure the rest out as a toss and turn in bed for a few nights. That'll make the hard part look easy.

One day at work, my boss unpacked a bunch of Unifi gear and wouldn't stop boasting about how cheap it was. "Sure, it's not CISCO," he said. "So it will never be business certified." I got the message. If you're a cheap shop like us, Unifi is a warm place to stay.

I ran home from my helpdesk job and bought one of those UFO shaped Unifi Wi-Fi pucks, a basic Unifi 8-port switch, and a searing Unifi gateway. Don't touch it! I then combined it all together using their cloud key software I hosted on a Raspberry Pi. I still think that's cool they let me do all that.

About 5 years later, around 2020, I replaced my cloud key and gateway with a UDM-PRO, added some security cameras around my Mt Rainier cabin and tossed a few PoE switches into the mix. It worked like magic! Nothing died! All my data was local!

As my network needs expanded over time, I would just go to the Unifi store and click some gizmo into my digital cart. I wouldn't even consider a 2nd opinion and smile about it the whole time. It would make it all the way to my rurally located mountain cabin and I would find a spot to plug it into a power outlet, and be almost done already. Unifi means I don't need to learn more than just a few things get to where I need to be today. That's been addicting so far. Maybe I am addicted to something about this.

Unifi is a walled garden. But, it's a relatively cheap walled garden. If you buy into the ecosystem wholesale, like I have apparently, it's just a matter of "plugging" things into things. Virtually and physically. Click a button to "adopt" the new doo-dad into in my local Unifi web gui to add it my your network. Watch as it pushes your configs to it, pulsates some pleasant LED glow, and now you move on. This walled garden has been cozy to me! Others have ghost stories with Unifi.

Apple users get it. I use Google stuff on my iPhone because I've lost it completely with all that stuff a while ago. I have no plan anymore. However, If I am allowed to have a high level of control in this walled garden, then I am all for it. I'll gladly stay inside if I don't feel hassled.

What are all these circles at the top about? I forgot.

I have 3 networks in total. Wifi, Wired and Zigbee.

-   Wifi
    -   Designed as a IoT no-mans land. It's where the monsters live.
    -   Completely segmented away from the "Wired" network. Hosts on the wired network cannot communicate with hosts on the Wi-Fi network, and the other way around.
    -   Truth is: I no longer host IoT devices on here. I still like the idea of treating my password secured Wi-Fi as if it was open internet. I could change that one day without worrying a lot, but I don't have to for now. So I will continue to pretend its lava.
-   Wired
    -   The gooey center!
    -   This is where all the desktop gaming computers, servers, containers, and other types hosts live and do their stuff.
-   Zigbee
    -   My new home for all IoT devices.
    -   Zigbee is its own separate network protocol that cannot talk to the internet, LAN, nor Wifi. A perfect location for privacy focused IoT devices!

I think it's the Zigbee part that might be the most interesting to me. The rest is just boring Unifi gear. Sorry I wrote so much about that.

So how did I make this "Zigbee" network happen?

I bought a ZigBee gateway coordinator ([SMLIGHT SLZB-06](https://smlight.tech/product/slzb-06/?ref=eric-post.com)) because of the YouTube algorithm back in May 2025. My IoT stuff was about 8 years old, and I began to wonder about them for a while already. Maybe it's good that I refresh some of that stuff. Then I found out about Zigbee and bought into another walled garden that promised full control of my local data. Deal! I plugged into one of my PoE connections and my [Home Assistant](https://www.home-assistant.io/?ref=eric-post.com) just picks it up right away! What's even better, Home Assistant manages its firmware updates, too! There are a lot of cheap ZigBee compatible devices on Amazon! All topics for later.

Oh Yeah, Home Assistant is my proxy host. That is what we were talking about. That square in the middle of the circles at the very top of this post. I forgot about that. It's running Nginx Proxy Manager as one of it's many plugins. Probably just containers but I like how it's not obvious to me.

This Raspberry Pi 5 running official Home Assistant OS sits in the middle of all 3 of these networks.

-   It's associated with the ZegBee gateway by managing the ZegBee gateway coordinator over IP.
    -   All my light bulbs and IR blasters can go nuts chattering to each other without me caring. No need to design a network box for them. They can go feral in their own obscure weird wireless protocol. That feels just fine at my current knowledge level.
-   It's the only host on my wired network that is simultaneously connected to my wifi network. This is why I care about running Nginx Proxy Manager on this Home Assistant host. I can choose which wired services I want to expose to wifi over HTTPS using my personal domain certificates. Where you're looking now.

I know that some folks would argue that I should be using Traefik instead of Nginx Proxy Manager. I'd fire back saying that I am just not smart enough for that yet.

Maybe it's because I just turned 40, but I am fine coasting on how this is working right now. Sure, there is a lot more I had to do to get make this far. I had to try and fail a few times and sit frustrated for a month or two. Like many things I've done, networking felt easy at first, and I thought I knew a lot. But I hadn't realized how much I took for granted this whole time.

Why would I care about this when I have been using that? Bumped into the concept of local DNS rewriting by accident that pieced it all together. My old tool didn't do that, so that meant I remained dumb about it. Not cool! I now get why my cloud flare idea failed. Just had to try to answer that question when looking at this weird new tool this one random day. Suddenly I became way more receptive to DNS topics after that. One thing led to another. Home Assistant became my Proxy Host.

It's now time for a breather. What does a few years of this look like? There is always more time to talk about this stuff later.