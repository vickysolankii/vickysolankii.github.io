---
layout: post
title: "BSOD DRIVER_IRQL_NOT_LESS_OR_EQUAL (0xD1): How to Read the Crash and Trace the Driver"
category: troubleshooting
tags: [windows, bsod, bugcheck, event-viewer, reliability-monitor, drivers, troubleshooting]
description: "A hands-on walkthrough of stop code 0xD1 on Windows 10 22H2: reproducing it safely in a VM, reading Reliability Monitor, Event ID 41 and 1001, decoding the bugcheck parameters, and what to do next."
---

A user calls in: the PC flashed blue, restarted, and now "works fine." Most people would close the ticket here. Don't. A blue screen that disappears after a reboot is a symptom you haven't explained yet, and it usually comes back at the worst possible moment.

I wanted to practice this properly, so I reproduced a driver-level crash in a VirtualBox VM and worked through it the way I would on a real ticket. Everything below comes from that lab.

**Lab note:** the crash was deliberate. I triggered it with Microsoft's Sysinternals NotMyFault tool inside a VM (Windows 10 22H2, build 19045) with a snapshot taken beforehand. On a real machine you don't get to know the culprit in advance, so I've tried to keep the diagnosis honest about what each tool actually told me.

## The scenario

Stop code on screen: `DRIVER_IRQL_NOT_LESS_OR_EQUAL`. Failed module: `myfault.sys`. The screen sat at "100% complete" and then the VM restarted into the desktop.

![BSOD showing DRIVER_IRQL_NOT_LESS_OR_EQUAL and myfault.sys](/assets/images/bsod-error.png)

That "What failed" line is worth a screenshot every time. When it names a third-party driver, you've saved yourself an hour. When it names `ntoskrnl.exe`, it tells you almost nothing, because the kernel is just where the fault surfaced.

## What the error actually means

Windows kernel code runs at different interrupt request levels (IRQL). At `DISPATCH_LEVEL` and above, the kernel can't handle a page fault, because servicing one needs to read from disk and that requires running at a lower level. So code at that level is only allowed to touch memory that is guaranteed to be resident.

Stop code `0xD1` fires when a driver breaks that rule: it touches pageable or invalid memory while running at an elevated IRQL. Windows can't recover from that safely, so it stops the machine.

In real tickets this usually points at a faulty or outdated driver, and less often at bad RAM or corruption.

## Diagnosis: reading what Windows left behind

### 1. Reliability Monitor

`Win + R`, then `perfmon /rel`. Find the red X for the crash date. The Problem Details view shows the bugcheck data in a compact form:

![Reliability Monitor problem details showing code d1](/assets/images/perfmon-rel-problem-details.png)

Code `d1`, parameters listed, OS version `10.0.19045`. Useful for confirming timing and the stop code. It does not name the driver.

### 2. Event Viewer

Windows Logs, then System, filtered to Event IDs 41 and 1001.

**Event ID 41 (Kernel-Power)** says the system rebooted without cleanly shutting down. It's a classic trap. Plenty of people stop at Event 41 and blame the power supply. It only tells you the shutdown was unclean, and a BSOD is one of several ways to get there.

![Event ID 41 Kernel-Power](/assets/images/event-id-41.png)

**Event ID 1001 (BugCheck)** is the one with substance. It records the bugcheck code, the four parameters, and the dump file path:

![Event ID 1001 BugCheck with 0xd1 and dump path](/assets/images/event-id-1001.png)

```
Bugcheck: 0x000000d1
(0xffff8384f6cec010, 0x0000000000000002, 0x0000000000000000, 0xfffff80148ea1981)
Dump: C:\Windows\Minidump\101926-9828-01.dmp
```

### 3. Decoding the parameters

For `0xD1` the four values mean:

| Parameter | Value in my crash | Meaning |
|---|---|---|
| 1 | `ffff8384f6cec010` | Memory address that was referenced |
| 2 | `2` | IRQL at the time (2 = `DISPATCH_LEVEL`) |
| 3 | `0` | Type of access (0 = read, 1 = write, 8 = execute) |
| 4 | `fffff80148ea1981` | Address of the instruction that made the reference |

So: something running at `DISPATCH_LEVEL` tried to read an address it shouldn't have. That matches the textbook description exactly.

### 4. The dump file

`C:\Windows\Minidump` held a single 274 KB `.dmp` file with the crash timestamp.

![Minidump folder with the dump file](/assets/images/mini-dump.png)

On a real ticket, this is where you'd open it in WinDbg and run `!analyze -v` to see the faulting driver and call stack. [FILL IN: if you ran WinDbg or BlueScreenView on the dump, paste the result and a screenshot here. If you didn't, delete this paragraph's second sentence and say plainly that you didn't analyze the dump.]

## Trying to run the crash tool: a detour that cost me time

Before the crash worked at all, NotMyFault refused to start with an "Entry Point Not Found" error complaining about `TryCreatePackageDependency` in a system DLL. [FILL IN: your VM's build number before updating, from `winver`.] The current NotMyFault build expects newer Windows APIs than that VM had. I ran Windows Update, confirmed the build with `winver`, and the tool launched. If you hit the same error, check your Windows build first.

## Fix path on a real machine

The order matters, from cheapest to most disruptive:

1. **Identify the driver** from the blue screen, Event 1001 or the dump.
2. **Ask what changed.** A new driver, a Windows update, new hardware. Reliability Monitor's timeline is good at showing this.
3. **Update, roll back or remove the driver.** Device Manager, then Properties, then Driver tab. Pull updates from the hardware vendor, not from a driver-updater site.
4. **Check RAM** with Windows Memory Diagnostic (`mdsched.exe`). Results appear under Event Viewer, source `MemoryDiagnostics-Results`.
5. **Check system files** with `sfc /scannow`, then `DISM /Online /Cleanup-Image /RestoreHealth` if SFC reports problems it can't fix.
6. **Driver Verifier**, only as a last resort on a repeat offender with no clear culprit. It deliberately stresses drivers and can make a machine unbootable, so have Safe Mode and a restore point ready.

## What I did in the lab

- Removed the cause: closed NotMyFault and deleted its folder. [FILL IN: screenshot.]
- Ran Windows Memory Diagnostic. [FILL IN: result from Event Viewer. Event ID 1201 means no errors detected; 1101 means errors were found.]
- Ran `sfc /scannow` from an elevated Command Prompt. [FILL IN: exact result message and screenshot.] One thing that tripped me up: typing the command wrong just prints the SFC help text, which looks like a scan but isn't one.
- Used the VM for a while afterwards to confirm no repeat crash. [FILL IN: how long, and what you observed.]
- Restored the "Before BSOD" snapshot to return the VM to a clean state.

## Root cause

In this lab, the `myfault.sys` driver accessed invalid memory at `DISPATCH_LEVEL`, by design. In production, the same stop code most often traces back to a buggy third-party driver, sometimes to failing RAM, rarely to corrupted system files.

## Prevention

- Install drivers from the hardware vendor or Windows Update only.
- Create a restore point before installing a new driver.
- Keep Windows updated, and note what changed before a crash starts.
- Leave small memory dumps enabled (System Properties, Advanced, Startup and Recovery). Without a dump, you're guessing.
- Turn off "Automatically restart" when troubleshooting, so the stop screen stays visible long enough to photograph.

## What I took away from this

A reboot clears the screen, not the cause. The useful artifacts were the stop code, the failed module, and the Event 1001 record. [FILL IN: one or two sentences of your own on what surprised you or what you'd do differently.]
