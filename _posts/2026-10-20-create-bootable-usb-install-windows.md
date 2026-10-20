---
layout: post
title: "How to Create a Bootable USB and Install Windows: A Step-by-Step IT Support Guide"
category: how-to
tags: [windows, bootable-usb, windows-installation, bios, uefi, rufus]
description: "A practical guide to creating a bootable Windows USB, setting up BIOS/UEFI, doing a clean install, and fixing common errors like missing drivers and GPT/MBR issues."
---

*By Vicky Solanki | vickysolankii.github.io*

If you work in IT, or you just like owning your hardware, you'll do a clean Windows install sooner or later. A virus-ridden laptop, a new SSD, a PC that's gotten so sluggish it's beyond saving. A bootable USB is the tool for all of it.

It's not hard. But there are a few spots where people get stuck, and I'll point those out as we go.

## What You Need

- **A USB drive, 8GB minimum.** I'd grab a 16GB one if you've got it. Everything on it will be wiped.
- **A working PC with internet.** This is where you'll build the installer.
- **The Windows ISO or the Media Creation Tool.** Both are free from Microsoft's official download page. Don't download ISOs from random sites. Ever.
- **Your target PC.** The machine you're installing Windows on.
- **A backup of anything you care about.** A clean install can wipe the drive. Documents, photos, browser bookmarks, license keys. Copy them somewhere else first.
- **Optional: a second USB drive.** Handy for storing drivers if the installer can't see your storage (more on that later).

## Phase 1: Creating the Bootable USB

You've got two solid options. The Media Creation Tool is the easy one. Rufus gives you more control.

### Option A: Microsoft's Media Creation Tool

This is what I'd hand to a non-technical friend.

1. Plug in your USB drive. Make sure there's nothing on it you need.
2. Go to Microsoft's Windows download page and grab the Media Creation Tool for the version you want (Windows 10 or 11).
3. Run it as administrator and accept the license terms.
4. Pick your language and edition. If "Use the recommended options for this PC" is checked and you're building this for a different machine, uncheck it.
5. Choose **USB flash drive**, then select your drive from the list.
6. Let it download and write. Depending on your connection, that's anywhere from 10 minutes to an hour.

When it says the drive is ready, you're done. Easy.

### Option B: Rufus

I reach for Rufus when I need to control the partition scheme, or when the Media Creation Tool throws a vague error at me (it does that).

Download the ISO straight from Microsoft first. Then grab Rufus from its official site, rufus.ie, and open it.

- **Device:** your USB drive.
- **Boot selection:** click *Select* and pick your ISO.
- **Partition scheme:** this is the one that matters.
- **Target system:** Rufus fills this in based on your partition scheme.

Here's the logic for the partition scheme:

- **GPT** goes with **UEFI**. Nearly every PC made in the last decade or so uses this, and Windows 11 requires it.
- **MBR** goes with **Legacy BIOS**. You only need this for really old hardware.

Not sure which one your target PC uses? Default to GPT. If you boot the USB and the installer later complains about the disk's partition style, you can fix that during setup. I'll show you how in Phase 3.

Rufus also offers a few Windows customization options when you click Start, like skipping the online account requirement. They're handy. But for your first install, I'd keep it simple.

One quick note: if the ISO contains a file bigger than 4GB, FAT32 can't hold it. Rufus and the Media Creation Tool both work around this. Just don't try to copy the ISO contents to the USB by hand.

## Phase 2: Configuring the Target PC's BIOS/UEFI

Now take the USB to the target machine. The PC needs to boot from it instead of its own drive.

### Getting to the boot menu

Power on the PC and start tapping a key right away. Don't hold it. Tap it. Which key depends on the manufacturer:

- **Dell:** F12 for the boot menu, F2 for setup
- **HP:** Esc, then F9 for the boot menu, or F10 for setup
- **Lenovo:** F12 or F1 (some have a small Novo button on the side)
- **ASUS:** F8 or Esc for the boot menu, Del or F2 for setup
- **Acer:** F12 or F2
- **Custom-built PCs:** usually Del or F2, with F11 or F12 for the boot menu

If the screen flashes by too fast, check the first screen after power-on. It usually tells you the key for about two seconds.

If your target PC already boots into Windows, there's an easier route. Hold **Shift** while clicking Restart, then go to *Troubleshoot → Advanced options → UEFI Firmware Settings*. No frantic key tapping.

### Picking the USB

The **one-time boot menu** is the faster option. Pick your USB from the list and go. No settings changed.

You may see your USB listed twice. One entry says something like "UEFI: [drive name]" and the other is just the drive name. Pick the **UEFI** one if you made a GPT drive. Pick the plain one if you made it with MBR for legacy.

If you'd rather change the permanent boot order, go into the BIOS/UEFI setup, find the **Boot** tab, and move the USB device to the top. Save and exit (usually F10). Just remember to put the internal drive back first when you're done, or you'll see the "Press any key to boot from USB" prompt on every restart.

### What if the USB doesn't show up?

Go through this list in order:

1. **Try a different USB port.** Use a USB 2.0 port if you have one. Some boards are picky about USB 3.x ports at boot.
2. **Check the drive.** Plug it into another PC and make sure the files are there.
3. **Turn off Fast Boot.** It sometimes skips USB detection entirely.
4. **Look at the Secure Boot setting.** Keep reading.
5. **Recreate the USB.** If the partition scheme doesn't match what the PC expects (GPT vs MBR), it just won't appear.

### Secure Boot

Secure Boot checks that whatever's booting is signed by a trusted source. Official Microsoft media is signed, so for a normal Windows install, **leave Secure Boot on**. Windows 11 expects it anyway.

It can cause trouble in two situations. One: you used a modified ISO or a custom-built image that isn't signed. Two: you're booting something that isn't Windows. In those cases, you can disable it in the Security or Boot tab of your BIOS. Turn it back on after the install if you can.

If you see a "Secure Boot violation" message, that's your cue to either check the ISO or temporarily disable the setting.

## Phase 3: The Windows Installation Process

The USB boots. You'll see the Windows Setup screen. Now we get to the part where mistakes are expensive, so slow down.

### The early screens

1. **Language, time, and keyboard.** Set them and click Next.
2. **Install now.**
3. **Product key.** If you've got one, enter it. If this PC ran Windows 10 or 11 before, click **"I don't have a product key."** Windows usually activates by itself once you're online, because the license is tied to the hardware.
4. **Choose the edition.** Pick the one you're licensed for (Home, Pro, etc.). If you pick wrong, activation will fail later.
5. **Accept the license terms.**

### Upgrade vs. Custom (Advanced)

This screen trips people up. You get two choices.

**Upgrade** keeps your files, apps, and settings. But it only works if you started Setup from inside a running Windows. Since you booted from the USB, this option will be greyed out or won't work. It's not what you want for a clean install anyway.

**Custom: Install Windows only (advanced)** is the clean install. Your old OS gets removed and a fresh one goes in. Choose this one.

### Partitions and formatting

The next screen lists your drives and their partitions. On a PC that's had Windows before, you'll see several entries: System, MSR, Primary, Recovery. Confusing, but they're all part of the old install.

Here's how I handle it on a single-drive PC:

1. Find **Drive 0** (your main drive). Check the sizes to be sure it's the right one.
2. Select each partition on it and click **Delete** until you've got one chunk of **Unallocated Space**.
3. Select the unallocated space and click **Next**.

Windows creates the partitions it needs automatically, formats them, and starts copying files.

**Be careful here.** If you've got more than one drive (say, a second HDD with your data), check which is which before deleting anything. Sizes are your best clue. When in doubt, unplug the extra drives before you start. Seriously, that's what I do.

If you want to leave other partitions alone, just delete the ones on the Windows drive, nothing else.

### Common problems at this stage

**"Windows can't be installed to this disk. The selected disk has an MBR partition table."** This means your PC booted in UEFI mode but the disk uses the old MBR style. Fix it by converting to GPT. This wipes the disk:

1. Press **Shift + F10** to open a command prompt.
2. Type `diskpart` and press Enter.
3. Type `list disk` and find your disk number.
4. Type `select disk 0` (swap in your number).
5. Type `clean` then `convert gpt`.
6. Type `exit` twice, then click Refresh in Setup.

Double-check that disk number before you hit `clean`. There's no undo.

**"We couldn't find any drives."** Setup can't see your storage, and it's a classic with newer laptops. Usually it's an Intel RST/VMD or RAID controller that needs a driver.

- Download the storage driver (often called Intel RST or VMD) from your PC manufacturer's support page, using another computer.
- Unzip it onto a second USB drive.
- In Setup, click **Load driver**, browse to it, and pick the one it finds.
- Your drive should appear.

Some BIOS setups let you switch the SATA mode from RAID/RST to AHCI. That also works, but if the old Windows was installed in RAID mode, changing it later can make that install unbootable. For a clean install, it doesn't matter.

**Windows 11 says "This PC can't run Windows 11."** Usually that's TPM 2.0 or Secure Boot. Check that TPM (it might be called PTT or fTPM) is enabled in your BIOS first. Don't reach for workarounds until you've checked the BIOS.

### The restarts

After files copy, the PC restarts a few times. When you see "Press any key to boot from CD or DVD," **don't press anything.** It'll boot from the new Windows install instead. Pulling out the USB after the first reboot is a clean way to avoid starting setup over by accident.

Then you'll hit the setup experience: region, keyboard, network, and account. Windows 11 Home pushes you to use a Microsoft account and an internet connection. If you'd rather create a local account, press **Shift + F10** at the network screen and run `OOBE\BYPASSNRO`. It restarts the setup and gives you an "I don't have internet" option. Microsoft has been tightening this over time, so it may not work on every build.

## Phase 4: Post-Install & Verification

You're at the desktop. Don't relax yet.

### 1. Run Windows Update

Go to *Settings → Windows Update* and click **Check for updates**. Install everything, restart, and check again. It often takes two or three rounds. Windows Update also pulls down a lot of drivers on its own, so doing this first saves you work.

### 2. Check Device Manager

Right-click Start and open **Device Manager**. You're looking for yellow warning triangles or items called "Unknown device." Those are missing drivers.

Common culprits: network adapters (Wi-Fi, especially), chipset, graphics, and audio. If Wi-Fi's missing, you'll need to download the driver on another device and transfer it by USB. Get drivers from your PC manufacturer's support page when you can. For graphics, go straight to Intel, AMD, or NVIDIA.

### 3. Confirm activation

Open *Settings → System → Activation*. It should say Windows is activated. If it isn't, wait until you're online and updated, then check again. If it still isn't, you may have picked the wrong edition during setup.

### 4. Do a quick stability check

- Open Task Manager and make sure CPU, memory, and disk usage settle down after the updates finish.
- Check that the display resolution and sound work.
- Restart once more and make sure it boots cleanly, with no USB prompt.
- If you changed the boot order or disabled Secure Boot, go back into the BIOS and put things right.

Then restore your files from backup and reinstall your apps. A fresh install is the best time to be picky about what you put back.

## Wrapping Up

That's the full process: build the USB, get the PC to boot from it, run a custom install, and check that everything works. Most failures come down to the same few things, like the wrong partition scheme, a missing storage driver, or a BIOS setting. Now you know where to look.

Got a weird error I didn't cover? Drop it in a comment or message me, and I'll help you figure it out.
