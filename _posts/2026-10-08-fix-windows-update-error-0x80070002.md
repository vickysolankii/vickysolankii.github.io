---
layout: post
title: "Fix Windows Update Error 0x80070002"
category: troubleshooting
tags: [windows, windows-update, error-codes]
description: "Windows Update fails with 0x80070002 because of missing or corrupt update files. Reset the update cache."
---

## Problem
Windows Update fails or hangs and shows error `0x80070002` ("file not found").

## Cause
The update cache in `C:\Windows\SoftwareDistribution` is corrupt, or a Windows Update service is not running.

## Solution
Open **Command Prompt as Administrator** and run:

```bat
net stop wuauserv
net stop bits
net stop cryptsvc
ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
ren C:\Windows\System32\catroot2 catroot2.old
net start cryptsvc
net start bits
net start wuauserv
```

If the error continues, repair system files:

```bat
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
```

Restart the PC.

## Verify the fix
Go to **Settings → Windows Update → Check for updates**. The updates should download and install without the error.

> Tip: if it still fails, check the date and time settings and run the Windows Update troubleshooter.
