---
layout: post
title: "Safe Mode and System Restore in Windows: How to Boot Safely and Undo a Bad Change"
category: troubleshooting
tags: [windows, safe-mode, system-restore, restore-point, msconfig, troubleshooting]
description: "A simple guide to starting Windows in Safe Mode with Shift + Restart or msconfig, creating a restore point, and using System Restore to roll your PC back to a time when it worked."
---

## Goal

Fix a PC that started acting up after a driver, update, or program install, without losing your files and without reinstalling Windows.

You'll learn two tools for this:

- **Safe Mode** starts Windows with only the basics. It helps you find out whether the problem comes from Windows itself or from something you added.
- **System Restore** takes your PC back to an earlier date when everything worked. Think of it as an "undo" button for system changes.

You don't need any technical background. If you can click and type, you can follow along.

---

## When Should You Use These?

Try them if:

- Your PC started crashing or freezing after a new driver, update, or program.
- The screen flickers, or apps keep closing on their own.
- Windows is slow, or shows a blue screen now and then.
- You think a virus or a bad startup program is causing trouble, and you want to clean it up.

---

## Part 1: Start Safe Mode with Shift + Restart

This is the easiest way, and it works when you can still reach the desktop.

1. Click **Start**, then click the **Power** button.
2. Hold down the **Shift** key and click **Restart**. Keep holding Shift until a blue screen appears.
3. Go to **Troubleshoot → Advanced options → Startup Settings → Restart**.
4. When the PC restarts, you'll see a numbered list. Press the number for the mode you want:
   - **4** for Safe Mode
   - **5** for Safe Mode with Networking (you get internet, handy for downloading a driver)
   - **6** for Safe Mode with Command Prompt

![Shift + Restart option on the Start menu](/assets/images/posts/safe-mode/01-shift-restart.png)

![Advanced options screen with Startup Settings](/assets/images/posts/safe-mode/02-advanced-options-startup-settings.png)

![Startup Settings list with the Safe Mode options](/assets/images/posts/safe-mode/03-startup-settings-list.png)

**How do you know you're in Safe Mode?** The screen looks plain. The resolution is low, icons are big, the background is black, and the words "Safe Mode" appear in the corners.

![Safe Mode screen with the corner text visible](/assets/images/posts/safe-mode/04-safe-mode-screen.png)

Now test your problem. If it's gone in Safe Mode, the cause is most likely a driver or program you installed. That's useful to know, and it tells you System Restore will probably help.

To leave Safe Mode with this method, just restart the PC normally.

---

## Part 2: Start Safe Mode with msconfig

This is a second way, done from inside Windows.

1. Press **Win + R**, type `msconfig`, and press Enter.
2. Click the **Boot** tab.
3. Under **Boot options**, tick **Safe boot** and choose **Minimal**.
4. Click **Apply**, then **OK**, then **Restart**.

![msconfig Boot tab with Safe boot and Minimal selected](/assets/images/posts/safe-mode/05-msconfig-safe-boot.png)

What the options mean:

| Option | What you get |
|---|---|
| Minimal | Normal Safe Mode |
| Alternate shell | Safe Mode with Command Prompt |
| Network | Safe Mode with Networking |

**Important:** with this method, Windows will keep starting in Safe Mode every single time until you switch it off. When you're finished, open `msconfig` again, go to the **Boot** tab, untick **Safe boot**, and restart.

**Heads up:** if your drive is encrypted with BitLocker, changing boot settings can make Windows ask for your recovery key. Make sure you know where it is first.

---

## Part 3: Create a Restore Point

A restore point is a saved snapshot of your Windows settings, drivers, and installed programs. It does **not** copy your documents, photos, or other personal files.

Windows makes some restore points on its own. But it's smart to make one yourself before you install a driver, a big program, or change something risky.

1. Click **Start** and type **Create a restore point**. Open the result.
2. In the **System Protection** tab, look at your C: drive. If it says **Off**, click it, then click **Configure**, choose **Turn on system protection**, and click **OK**.
3. Click **Create**.
4. Type a name you'll recognize later, like `Before graphics driver update`, and click **Create**.
5. Wait for the message that says the restore point was created.

![System Properties, System Protection tab](/assets/images/posts/safe-mode/06-system-protection-tab.png)

![Turning on system protection for drive C](/assets/images/posts/safe-mode/07-turn-on-protection.png)

![Naming the new restore point](/assets/images/posts/safe-mode/08-create-restore-point.png)

---

## Part 4: Restore Your PC to an Earlier Point

Now the fix itself.

1. Click **Start**, type **Create a restore point**, open it, and click **System Restore**. A faster way: press **Win + R**, type `rstrui.exe`, and press Enter.
2. Click **Next**. You'll see a list of restore points with their dates and descriptions.
3. Tick **Show more restore points** if you can't find the one you need.
4. Pick a restore point from **before** the problem began.
5. Click **Scan for affected programs**. This shows which programs and drivers will be removed or brought back. Take a moment to read it.
6. Click **Next**, then **Finish**, then **Yes**.
7. Your PC will restart and restore itself. **Don't turn it off.** It can take anywhere from 10 to 30 minutes.

![System Restore welcome screen](/assets/images/posts/safe-mode/09-system-restore-start.png)

![List of restore points with dates and descriptions](/assets/images/posts/safe-mode/10-restore-point-list.png)

![Scan for affected programs results](/assets/images/posts/safe-mode/11-affected-programs.png)

![Final confirmation before the restore starts](/assets/images/posts/safe-mode/12-restore-confirm.png)

When you sign in again, Windows tells you whether the restore worked.

![System Restore completed message](/assets/images/posts/safe-mode/13-restore-complete.png)

**Your personal files stay where they are.** Programs and drivers you installed *after* the restore point will be removed, so you may need to install them again.

---

## What If Windows Won't Start at All?

You can still use System Restore. Here's how:

1. Turn the PC on, and as soon as you see the Windows logo, hold the power button to force it off. Do this two or three times in a row. Windows will then open its recovery screen by itself.
2. Go to **Troubleshoot → Advanced options → System Restore**.
3. Pick your account, enter the password, and follow the same steps as in Part 4.

No luck? You can also boot from a Windows USB drive and choose **Repair your computer**. I show how to make that USB in [How to Create a Bootable USB and Install Windows]({% post_url 2026-10-20-create-bootable-usb-install-windows %}).

You can also run System Restore from inside Safe Mode. The steps are exactly the same.

---

## Changed Your Mind? Undo the Restore

Before it starts, System Restore makes a new restore point of its own. If you don't like the result, open System Restore again and choose **Undo System Restore**.

---

## Tips

- Make a restore point **before** you install drivers, big programs, or Windows updates you're unsure about.
- Keep System Protection **turned on** for your C: drive.
- Get drivers from your PC maker's website, not from "driver updater" tools.
- Change one thing at a time, so you know what caused any problem.
- **System Restore is not a backup.** It won't bring back deleted files. Keep a separate backup of your important data.
- If you used msconfig for Safe Mode, remember to untick **Safe boot** afterwards.

---

## Quick Reference

| What you want | How to do it |
|---|---|
| Safe Mode from Windows | Hold **Shift**, click **Restart**, then Troubleshoot, Advanced options, Startup Settings, Restart, press **4** |
| Safe Mode with msconfig | **Win + R**, `msconfig`, Boot tab, Safe boot, Minimal |
| Turn off msconfig Safe Mode | `msconfig`, Boot tab, untick Safe boot, restart |
| Create a restore point | Search "Create a restore point", then **Create** |
| Open System Restore | **Win + R**, `rstrui.exe` |
| Undo a restore | Run System Restore again, choose **Undo System Restore** |

---

## Quick Summary

Safe Mode helps you find the cause. System Restore helps you fix it. Use them together: start in Safe Mode to check whether the problem is gone, then roll back to a restore point from before things went wrong. And next time, make a restore point first. It takes less than a minute.
