---
layout: post
title: "Slow PC? 15 Ways to Speed Up Your Windows Computer"
category: troubleshooting
tags: [windows, performance, troubleshooting, registry]
description: "Practical fixes for a slow Windows PC: startup apps, disk cleanup, animations disables, registry tweaks, malware removal and hardware upgrades."
---

---

# Slow PC? 15 Ways to Speed Up Your Windows Computer

A slow computer is one of the most common problems an IT support person handles. The cause can be software (too many startup apps, malware, a full drive) or hardware (low RAM, an old hard disk). This guide covers the main fixes in a sensible order, from the easiest to the most advanced, so you can find what actually applies to your PC.

## Part 1: Basic Checks

### 1. Restart the PC
A restart clears temporary files, stuck processes, and memory that apps never released. If a PC has been running for days, this alone can help.

### 2. Find the heavy program in Task Manager
Press **Ctrl + Shift + Esc** to open Task Manager. On the **Processes** tab, click the **CPU**, **Memory**, and **Disk** columns to sort by usage. The app at the top is your main suspect.

- Right-click the app and choose **End task** to close it.
- If the app is not needed, uninstall it.
- Keep an eye on the **Performance** tab. If CPU, Memory, or Disk stays near 100% while the PC is idle, something is wrong.

![Opening Task Manager with the Run command](/assets/img/slow-up-pc/run-command-taskmgr.png)

![Task Manager Processes tab](/assets/img/slow-up-pc/task-manager.png)

### 3. Watch for memory leaks
A memory leak happens when a program keeps taking more RAM over time and never gives it back. You will notice an app's memory usage slowly growing the longer it stays open (browsers and some old software are common examples).

- Watch the Memory column for a few minutes. If one app keeps climbing, it may be leaking.
- Close and reopen the app. This releases the memory.
- Update the app, because leaks are often fixed in newer versions.
- For deeper checking, use **Resource Monitor** (`resmon`) or Microsoft's free **Process Explorer**.
- In Chrome or Edge, press **Shift + Esc** to see which tab or extension is using the most memory.

![Resource Monitor Memory tab](/assets/img/slow-up-pc/memory-resource-monitor.png)

### 4. Disable unnecessary startup programs
Task Manager > **Startup apps** tab. Right-click apps with **High** startup impact that you don't need immediately and click **Disable**. Do not disable antivirus or Windows components.

For a more detailed view, Microsoft's **Autoruns** (Sysinternals) shows everything that runs at startup, including scheduled tasks and services.

![Disabling unnecessary startup programs](/assets/img/slow-up-pc/disable-unnessary-startup-program.png)

## Part 2: Storage and Disk

### 5. Free up the C: drive
When the C: drive is almost full, Windows has no room for temp files and virtual memory, so everything slows down. Keep **at least 15-20% free**.

- **Settings > System > Storage > Temporary files:** clear temp files and the Recycle Bin. Check carefully before deleting the Downloads folder.
- Run **Disk Cleanup**: press `Win + R`, type `cleanmgr`, then choose "c: drive for Clean up system files."
- Delete temp files manually: press `Win + R`, type `%temp%` (C:\Users\your-system-user-name\AppData\Local\Temp, and delete what you can (skip files in use).
- Uninstall unused apps: **Settings > Apps > Installed apps**.
- Turn on **Storage Sense** so Windows cleans up automatically.
- Find large files with a free tool like **WizTree** or **TreeSize Free**.
- Disable hibernation if you don't use it. This removes a large hidden file (`hiberfil.sys`). Run as admin: `powercfg -h off`
- Move photos, videos, and big files to another drive or cloud storage.

![Deleting temporary files from Settings > System > Storage](/assets/img/slow-up-pc/free-c-drive-from-setting-system-storage-temproryfile.png)

![Disk Cleanup using cleanmgr](/assets/img/slow-up-pc/disk-clean-up-using-cleanmgr.png)

![Deleting files from the temp folder](/assets/img/slow-up-pc/deletingfolder-tmpfiles.png)

### 6. Check disk health and errors
A failing disk makes the whole PC slow and freezes it randomly. Run in an admin Command Prompt:

```
chkdsk C: /scan
```

To check drive health in PowerShell (admin):

```
Get-PhysicalDisk | Select FriendlyName, MediaType, HealthStatus
```
![Checking disk health with chkdsk](/assets/img/slow-up-pc/check-disk-health-using-chkdsk-utility.png)

![Checking disk type and health with PowerShell](/assets/img/slow-up-pc/check-disk-health-using-powerhsell-utility.png)

This also shows whether the drive is an **HDD** or **SSD**. For detailed health data, **CrystalDiskInfo** is a good free tool. If it shows "Caution" or "Bad," back up your data and replace the drive.

### 7. Check virtual memory (page file)
Windows uses part of the disk as extra memory when RAM runs out. Let Windows manage it automatically: `Win + R` > `sysdm.cpl` > Advanced > Performance Settings > Advanced > Virtual memory > **Automatically manage paging file size**. If the PC has little free disk space, this file cannot work properly.

![Virtual memory settings in sysdm.cpl](/assets/img/slow-up-pc/virtual-memory-using-sysdm.cpl-utility.png)

## Part 3: Visual Effects and Settings

### 8. Disable animations and visual effects
Animations, shadows, and transparency use CPU and GPU resources. This matters most on older PCs.

1. Press `Win + R`, type `sysdm.cpl`, and press Enter.
2. Go to **Advanced > Performance > Settings**.
3. Choose **Adjust for best performance** (or Custom, keeping "Smooth edges of screen fonts" on for readable text).
4. Also go to **Settings > Accessibility > Visual effects** and turn off **Animation effects** and **Transparency effects**.

![Disabling animations in Performance Options](/assets/img/slow-up-pc/disabling-animations-for-better-performance.png)

### 9. Use a good power plan
**Settings > System > Power & battery > Power mode.** Use **Balanced** or **Best performance** when plugged in. "Best power efficiency" can slow the CPU down.

### 10. Stop background apps and extra browser extensions
Many apps keep running in the background. In **Settings > Apps > Installed apps > (app) > Advanced options**, restrict background activity for apps you rarely use. In your browser, remove extensions you don't need, because too many can make browsing very slow.

## Part 4: Registry Tweaks (Advanced)

> ⚠️ **Warning:** A wrong registry change can cause serious problems. Always back up first (Registry Editor > File > Export), and practice on a VM or test PC. Open Registry Editor with `Win + R` > `regedit`.

These tweaks give **small** improvements. Don't expect miracles.

Open Command Prompt with administator

**Tweak 1: Faster menu response**

```reg add "HKCU\Control Panel\Desktop" /v MenuShowDelay /t REG_SZ /d 100 /f```
Menus open with less delay.

**Tweak 2: Reduce startup delay for desktop apps**
```reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Serialize" /v StartupDelayInMSec /t REG_DWORD /d 0 /f ```
Startup apps load without the built-in delay.

**Tweak 3: Faster shutdown**
``` reg add "HKLM\SYSTEM\CurrentControlSet\Control" /v WaitToKillServiceTimeout /t REG_SZ /d 2000 /f ```
Windows waits less time for services to close. Don't set it too low.

**Tweak 4: Close hung apps faster**
``` reg add "HKCU\Control Panel\Desktop" /v WaitToKillAppTimeout /t REG_SZ /d 2000 /f```
```reg add "HKCU\Control Panel\Desktop" /v HungAppTimeout /t REG_SZ /d 2000 /f ```

**All at once**
```
reg add "HKCU\Control Panel\Desktop" /v MenuShowDelay /t REG_SZ /d 100 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Serialize" /v StartupDelayInMSec /t REG_DWORD /d 0 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Control" /v WaitToKillServiceTimeout /t REG_SZ /d 2000 /f
reg add "HKCU\Control Panel\Desktop" /v WaitToKillAppTimeout /t REG_SZ /d 2000 /f
reg add "HKCU\Control Panel\Desktop" /v HungAppTimeout /t REG_SZ /d 2000 /f
```
Restart the PC after the changes.

**Avoid "registry cleaner" and "PC booster" tools.** They promise a lot, give little, and can break things. Manual, understood changes are safer.



## Part 5: Malware and System Repair

### 11. Remove malware
Viruses, adware, and crypto miners secretly use CPU and disk. Signs include a sudden slowdown, pop-ups, a changed browser homepage, and a fan running loudly for no reason.
** uninstall a recently installed program from third-party and unofficial site,if you know the problem started after the new software was installed on system**
**Using Windows Security:** Virus & threat protection > **Quick scan**, then **Full scan** if suspicious. For stubborn malware, use **Microsoft Defender Offline scan**, which runs before Windows loads.

**Using PowerShell (admin):**

```
Update-MpSignature
Start-MpScan -ScanType QuickScan
Start-MpScan -ScanType FullScan
Start-MpWDOScan
```

(`Start-MpWDOScan` runs the offline scan and restarts the PC.)

**Free software I'd suggest:**
- **Microsoft Defender** (built in, good enough for most users)
- **Malwarebytes Free** (second-opinion scanner)
- **AdwCleaner** (removes adware and unwanted browser add-ons)

Don't run several real-time antivirus programs at the same time, because they conflict and slow the PC down.


### 12. Repair corrupted system files
Open Command Prompt as administrator and run:

```
sfc /scannow
```

If it finds problems it cannot fix, run:

```
DISM /Online /Cleanup-Image /RestoreHealth
```

Then run `sfc /scannow` again.

![Result of sfc /scannow](/assets/img/slow-up-pc/sfs-scan.png)

### 13. Update Windows and drivers
Check **Settings > Windows Update** for pending updates. Outdated drivers (graphics, storage, chipset) can cause lag. Download drivers from the manufacturer's official website, not from random driver-updater tools.

## Part 6: Hardware Upgrades

If software fixes are not enough, the hardware is the limit.

### 14. Upgrade HDD to SSD
This is usually the **biggest speed improvement** for an old PC. An SSD has no moving parts, so boot time and app loading drop dramatically. Check your drive type with Task Manager > Performance > Disk (it shows HDD or SSD). You can clone the old drive using tools like Macrium Reflect or the manufacturer's cloning software.

### 15. Upgrade RAM
- **4 GB** struggles with modern Windows and a browser.
- **8 GB** is the comfortable minimum today.
- **16 GB** is good for multitasking and heavy work.

Check RAM type (DDR3/DDR4/DDR5), speed, and free slots in Task Manager > Performance > Memory before buying. Use dual-channel (two matching sticks) when possible.

### Other hardware points
- **Overheating:** dust-clogged fans and vents cause the CPU to slow itself down (thermal throttling). Clean vents and monitor temperatures with **HWiNFO** or **HWMonitor**.
- **Old CPU:** if the processor is very old, upgrades may not be worth it.
- **Aging laptop battery or power adapter** can also limit performance on some laptops.

## Last Resort Options

- **Reset Windows** (Settings > System > Recovery > Reset this PC) after backing up your data. This removes years of accumulated clutter.
- **Clean install** of Windows from a bootable USB.
- On very old hardware, a **lightweight Linux distribution** can give the PC a new life.

## Quick Checklist

| Check | Tool / Command |
|---|---|
| Heavy apps and memory leaks | Task Manager, Resource Monitor |
| Startup programs | Task Manager > Startup, Autoruns |
| Free space | Settings > Storage, `cleanmgr`, WizTree |
| Disk health | `chkdsk`, CrystalDiskInfo |
| Animations | `sysdm.cpl` > Performance Settings |
| Malware | Windows Security, Malwarebytes, `Start-MpScan` |
| System files | `sfc /scannow`, `DISM` |
| Hardware | SSD upgrade, more RAM, clean fans |

## Conclusion

Start with the simple fixes (restart, Task Manager, startup apps, free space) because they solve most slow-PC complaints. Move on to malware scans and system repair, and only then think about registry tweaks or hardware upgrades. Measuring what is actually slow, instead of applying random tweaks, saves time and avoids breaking the system.

---

