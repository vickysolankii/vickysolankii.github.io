---
layout: post
title: "Configure the UFW Firewall on Ubuntu"
category: configuration
tags: [linux, ubuntu, firewall, security]
description: "Allow SSH and web traffic, block everything else, using UFW."
---

## Goal
Allow only the ports the server needs and block the rest.

## Steps
```bash
sudo apt update && sudo apt install ufw -y
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

> Always allow SSH **before** enabling UFW, or you can lock yourself out of a remote server.

## Verify
```bash
sudo ufw status verbose
```

## Common tasks
| Task | Command |
|------|---------|
| Delete a rule | `sudo ufw delete allow 80/tcp` |
| Allow one IP | `sudo ufw allow from 192.168.1.10` |
| Turn firewall off | `sudo ufw disable` |
