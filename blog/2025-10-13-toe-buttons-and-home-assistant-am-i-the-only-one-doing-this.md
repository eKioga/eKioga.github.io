---
slug: toe-buttons-and-home-assistant-am-i-the-only-one-doing-this
title: Toe buttons and Home Assistant. Am I the only one doing this?
authors: eric
tags: [selfhosting]
---

I've relied on Alexa for many years. It turns my TV on and off with my voice because I like to eat my pizza with a slice in each hand. I wouldn't have time to get anything done without it.

<!-- truncate -->

It lives inside an old fire TV cube, muted with no HDMI plugged in for over 6 years. Every time I told it to turn the TV on or off, it did. It served no other purpose.

Earlier this year, I finally got around to setting up home assistant after learning about ZigBee devices (more on that in [my network](https://eric-post.com/my-home-network/) post). That gave me the push I needed to give this project a shot.

Stuff I bought:

-   Raspberry Pi 5 8GB
-   KLIM Talk USB Desk Microphone
    -   KISEER 2 Pcs USB 2.0 Mini Microphone (backup Mics)
-   LIELONGREN USB Computer Speaker
-   Tuya Smart IR Blaster
    -   Lets Home Assistant record and send IR blast on command. This is how I manage my TV inputs.
-   SONOFF Zigbee Indoor Temperature Humidity Sensor
    -   I had hopes of setting this up to kick-off my dehumidifier, but I lost the remote, so I haven't had a chance to record the IR code.
-   SONOFF Zigbee Smart Plug
-   Aqara LED Strip T1
-   THIRDREALITY ZigBee Smart Button 3 Pack
    -   More on this near the bottom.

Setup was pretty simple. Though, it did take some time fussing over the hardware and software components getting them all to work together in sync. Eventually, I was up and running with my own voice assistant that responded to "Hey, Randy". (My wife liked the idea of our in-house AI having the voice of Randy Marsh from South Park.) I had it connected it to my local AI server running Ollama, Faster-Whisper (nvidia) and Piper (nvidia). In addition to the normal run-of-the-mill home automation tasks, Randy could also answer general questions using local LLMs! Pretty cool.

After a few days of things working well enough, Alexa was turned off and tossed in a drawer. Good by forever.

Here's the rub. Every other day, something unique and bizarre would break with some aspect of the voice assistant chain.

-   Some days the USB mic had to be unplugged and plugged back in.
-   Some days I had to disable the mic within home assistance's hardware settings, then re-enable it to get it to work.
-   Some days the ZigBee network running on home assistant would inexplicably crash in a way that home assistant couldn't detect as a 'down' state.
-   Some days either piper or whisper would inexplicably break. Requiring the services to be 'rebooted' on the server.
-   Some days, telling it to turn on/off the TV would illicit bizarre and lengthy responses that can't be interrupted. I'd mute the speaker and move on with my day.
-   If you need to reboot the Raspberry Pi it's running on, then you will be going through the list above (and more) struggling to get it to work again.
-   Even worse, on some days, none of the above would resolve the issue. I would then give up, make zero changes and come back a few days or week later and suddenly everything is working great. The next day, it's broken again. Two days later, suddenly works great. Yucky.

It felt like Randy had a hard time getting out of bed sometimes. Come back later and try again would eventually replace my troubleshooting steps.

My Alexa sat in a dark cabinet with only power for over half a decade and it always just 'worked'. This open source voice assistant from home assistant is janky at best. I get it. It's using a stack of random hardware and software cobbled together in a long daisy chain just to get something that feels similar to Alexa and Google home. I'm not surprised that I had some issues, but this just has one job: Turn the TV on/off. Having it randomly fail at this task every other day, for random reasons, leading to lengthy troubleshooting, wore thin on me really quickly. I don't want to bring back the privacy nightmare (Alexa), so what do I do?

Bought toe buttons. Connected them to my ZigBee network. Assigned TV/OFF IR blast on the long press. Tossed toe button on the floor next to the TV. Works flawlessly. Once again, I can hold a pizza slice in each hand while turning the TV on and off.

In this configuration, the only problem I run into is the occasional ZigBee network crash a few times a month. That is fixed in just a minute. I still have the voice-assistant setup and the AI components still running pointlessly. I haven't felt the need to care about them in months. Speaker is mute. Just toe buttons from now on.

I recommend that everybody move over to toe buttons.