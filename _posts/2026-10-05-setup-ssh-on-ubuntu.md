---
layout: post
title: "Set Up SSH on Ubuntu and Connect from Windows"
category: setup
tags: [linux, ubuntu, ssh, windows]
description: "Install OpenSSH server on Ubuntu and connect from Windows with the built-in ssh client."
---

## Goal
Manage an Ubuntu machine remotely over SSH.

## On Ubuntu
```bash
sudo apt update
sudo apt install openssh-server -y
sudo systemctl enable --now ssh
sudo systemctl status ssh
hostname -I
```

## On Windows
Open PowerShell or Command Prompt (the `ssh` client is built into Windows 10/11):

```powershell
ssh username@192.168.1.50
```

## Optional: key-based login
```powershell
ssh-keygen -t ed25519
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh username@192.168.1.50 "cat >> ~/.ssh/authorized_keys"
```

## Troubleshooting
- **Connection refused:** check `sudo systemctl status ssh`
- **Timed out:** check the IP and the firewall (see the UFW post)
