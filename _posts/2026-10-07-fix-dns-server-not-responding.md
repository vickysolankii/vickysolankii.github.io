---
layout: post
title: "Fix 'DNS Server Isn't Responding' on Windows"
category: troubleshooting
tags: [windows, networking, dns]
description: "The internet shows connected but websites will not open. Flush DNS and reset the network stack."
---

## Problem
The PC shows it is connected, but browsers show "DNS server isn't responding". Pinging `8.8.8.8` works but `ping google.com` fails.

## Cause
A bad DNS cache, a wrong DNS server on the adapter, or a faulty router DNS.

## Solution
1. Confirm it is DNS: `ping 8.8.8.8` works, `ping google.com` fails.
2. In an **admin Command Prompt**:

```bat
ipconfig /flushdns
ipconfig /release
ipconfig /renew
netsh winsock reset
netsh int ip reset
```

3. Set a different DNS server: **Network Connections → adapter → Properties → IPv4**, then use `8.8.8.8` and `1.1.1.1`.
4. Restart the PC.

## Verify the fix
```bat
nslookup google.com
```
It should return an IP address, and websites should open.
