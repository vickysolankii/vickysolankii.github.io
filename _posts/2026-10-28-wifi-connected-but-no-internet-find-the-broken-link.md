---
layout: post
title: "WiFi Connected but No Internet? Find the Broken Link in 4 Pings"
category: troubleshooting
tags: [windows, networking, wifi, ping, ipconfig]
description: "WiFi shows connected but nothing loads. Use four ping tests to find out whether the problem is your PC, your router, DNS or your ISP before you change anything."
---

## Problem

The laptop shows WiFi connected, but websites will not open. Other devices on the same network may or may not work.

## Cause

One of four things: the PC did not get a proper IP address, the router cannot be reached, the router has no internet from the ISP, or DNS is failing. The tests below tell you which one.

## Diagnosis

Open Command Prompt and run these in order. Stop at the first one that fails.

**1. Check the IP address**

```
ipconfig
```

Note the IPv4 Address and Default Gateway. If the address starts with `169.254`, the PC did not get an address from the router (DHCP failure).

![ipconfig output showing IPv4 address and default gateway](/assets/images/wifi-no-internet-01-ipconfig.png)

**2. Ping the router**

```
ping 192.168.1.1
```

Use your own Default Gateway address. If this fails, the problem is between your PC and the router.

![Ping to the default gateway (router)](/assets/images/wifi-no-internet-02-ping-gateway.png)

**3. Ping the internet by number**

```
ping 8.8.8.8
```

If this fails but the router ping worked, the router has no internet. Check the ISP.

![Ping to 8.8.8.8 result](/assets/images/wifi-no-internet-03-ping-8888.png)

**4. Ping the internet by name**

```
ping google.com
```

If 8.8.8.8 works and this fails, DNS is the problem.

![Ping to google.com result](/assets/images/wifi-no-internet-04-ping-google.png)

| Router | 8.8.8.8 | google.com | Problem |
|---|---|---|---|
| Fails | Fails | Fails | PC to router link |
| Works | Fails | Fails | Router or ISP |
| Works | Works | Fails | DNS |
| Works | Works | Works | Browser, proxy or VPN |

## Fix

**PC cannot reach the router:** disable and enable the WiFi adapter, forget the network and reconnect, then restart the router (unplug for 30 seconds).

![Disabling and enabling the WiFi adapter](/assets/images/wifi-no-internet-05-adapter-toggle.png)

**169.254 address:**

```
ipconfig /release
ipconfig /renew
```

![ipconfig release and renew output](/assets/images/wifi-no-internet-06-release-renew.png)

**Router has no internet:** check whether other devices are also offline. If yes, restart the router and call your ISP if it stays down.

**DNS failing:** see my post on [fixing DNS server not responding]({% post_url 2026-10-07-fix-dns-server-not-responding %}).

**Everything pings but the browser fails:** turn off any proxy (Settings > Network & internet > Proxy), disconnect VPN, check the date and time, and open `http://neverssl.com` in case it is a public WiFi login page.

![Windows proxy settings turned off](/assets/images/wifi-no-internet-07-proxy-settings.png)

## Root cause

[Write your actual cause here.]

## Prevention

Restart the router now and then, keep the WiFi driver updated, and turn off proxy or VPN settings you no longer use.
