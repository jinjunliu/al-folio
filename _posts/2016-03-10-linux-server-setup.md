---
layout: post
title: Installation and Setup of CentOS Linux Server
date: 2016-03-10
description: This post documents some considerations during the installation of CentOS and provides instructions for post-installation setup, including software installation.
tags:
  - Linux
  - CentOS
categories: Tech
giscus_comments: true
---

**Caution: this post was written in 2016, and some of the content may be out of date.**

## CentOS Installation

There are many Linux distributions, roughly categorized into CentOS/RHEL/Fedora and Ubuntu/Debian based on their package managers. Researchers tend to prefer CentOS. CentOS is a community rebuild of RHEL (Red Hat Enterprise Linux) and can use Red Hat's software packages while being completely free. The version I installed was CentOS 6.7, and the latest version at the time is 7.x. It is recommended to install the latest version if possible. However, due to my older server configuration, I could only install 6.7.

The installation process of CentOS is similar to that of most Linux systems, and there are many tutorials available online, so I won't go into detail here. However, as a Linux server suitable for scientific computing, there are a few things to note:

- Language and Keyboard: Choose English and English (US).
- Timezone: Select Asia/Shanghai and do not enable UTC time.
- Partitioning: Choose "Create Custom Layout" for manual partitioning. Generally, you need three partitions: `/`, `/home`, and `Swap`. The size of the `Swap` partition should be equal to the physical memory (RAM) size. The size of the `/` partition depends on your hard disk size, but it is recommended to be larger than 20GB. The size of the `/home` partition can be arbitrary but should not be too small.
- Installation Version: Choose "Software Development Workstation" as this version includes most of the software development environment, saving you the trouble of manual installation.
- During customization, select "Scientific support" under Base System and "Chinese Support" under Languages.

Once these settings are completed, you can proceed with the installation. Finally, uncheck "Enable Kdump." I want to explain here that Kdump is used to store the contents of memory on the hard disk when the system crashes, making it easier for administrators to analyze the cause of the crash based on the memory contents. However, for regular users, Kdump does not have much use because they usually cannot understand the memory contents.

## Post-Installation Setup

After the installation, several settings need to be made on the system.

### Modify Software Repositories

Change the software repository to the USTC (University of Science and Technology of China) mirror. This has at least two advantages:

1. Faster download speed within the university network.
2. Software installation or updates can be completed without an external internet connection.

Refer to: [https://lug.ustc.edu.cn/wiki/mirrors/help/centos](https://lug.ustc.edu.cn/wiki/mirrors/help/centos)

### Add Third-Party Repository EPEL

Refer to: [https://lug.ustc.edu.cn/wiki/mirrors/help/epel](https://lug.ustc.edu.cn/wiki/mirrors/help/epel)

### Set Automatic Network Connection on Startup

Click on the network icon in the top right corner, select the network, and check "Connect Automatically."

### Add Users

If the server is used by multiple people, in addition to the users created during the system installation, additional users need to be created. Assuming we want to add a user named "jack," the following commands can be used:

```bash
su -
adduser jack # Create a new account "jack"
passwd jack # Set the password for "jack"
```

### Add Regular User to the Root Group

This is done to grant root privileges to a regular user. This allows us to perform operations that require root privileges without switching to the root account. Assuming the account name is "jjliu" and we want to add it to the root user group, we need to modify the `/etc/sudoers` file. Use the following commands:

```bash
su -
echo 'jjliu ALL=(ALL) ALL' >> /etc/sudoers # Add the statement to the configuration file
tail -1 /etc/sudoers  # Check if it is correct
jjliu ALL=(ALL) ALL
```

However, on machines used by multiple users, it is generally not recommended to grant root privileges to regular accounts other than the administrator's account. So please refrain from making this setting.

### Initial Comprehensive Update

The command is:

```bash
sudo yum update
```

## Mounting Hard Drives

Generally, when installing an operating system, not all hard drives are mounted automatically. The remaining hard drives need to be mounted manually. First, let's check the drive letters of all the hard drives:

```bash
ls /dev/sd*
```

Assuming the output is as follows:

```bash
/dev/sda   /dev/sda2  /dev/sda4  /dev/sdb   /dev/sdc
/dev/sda1  /dev/sda3  /dev/sda5  /dev/sdb1  /dev/sdc1
```

From this, we can see that there are a total of 3 hard drives: sda, sdb, and sdc. sda has 5 partitions (sda1~sda5), while sdb and sdc have only one partition each (sdb1 and sdc1). If the partitions on sda are the ones created during the system installation, then we need to mount sdb1 and sdc1.

The mounting process is as follows:

```bash
sudo mkdir /d0 # Create the /d0 directory as the mount point for sdb1
sudo mkdir /d1 # Create the /d1 directory as the mount point for sdc1
sudo echo 'mount /dev/sdb1 /d0' >> /etc/rc.d/mount.sh
sudo echo 'mount /dev/sdc1 /d1' >> /etc/rc.d/mount.sh
sudo echo '/bin/sh /etc/rc.d/mount.sh' >> /etc/rc.d/rc.local # Set up automatic mounting at startup
sudo source /etc/rc.d/rc.local
df -h # Check the mounting status
...
/dev/sdb1       903G  364G  493G  43% /d0
/dev/sdc1       1.8T  583G  1.2T  34% /d1
...
```

Now, sdb1 and sdc1 are mounted on /d0 and /d1, respectively. If the server has multiple users, you need to create folders for each user under the respective mount points. Assuming the server has two users, jjliu and jack, the steps are as follows:

```bash
mkdir /d0/jjliu
sudo chown -R jjliu:jjliu jjliu # Change the owner and group of the jjliu folder to jjliu
sudo chmod 700 jjliu # Change the permissions of the jjliu folder to allow only the owner to access and modify
mkdir /d0/jack
sudo chown -R jack:jack jack # Change the owner and group of the jack folder to jack
sudo chmod 700 jack # Change the permissions of the jack folder to allow only the owner to access and modify
```

The same method can be applied to create personal folders under /d1.

## Installing screen

GNU Screen is a software for managing terminal sessions in Linux. It allows users to connect to multiple remote sessions simultaneously and switch between them freely. Screen can also be used to run programs in the background, ensuring that they continue running even if the server loses connection. Installing screen is straightforward:

```bash
sudo yum install screen
```

To create a new session, simply type `screen` in the terminal. To detach the session and run it in the background, use `Ctrl+A+D`. This way, if a program is running in the new session, it will continue running in the background even if the connection is lost. To return to the previously created session, first check the screen session number:

```bash
screen -ls
```

Assuming the output is as follows:

```bash
There is a screen on:
    2073.pts-0.JJLIU        (Detached)
1 Socket in /var/run/screen/S-jjliu.
```

This indicates that the screen session number is 2073. To return to the previous session, use the command `screen -r 2073`.

## Vim Editor Configuration

Vim (Vi Improved) is a commonly used text editor in Linux. By making certain configurations, we can make it more convenient and tailored to our preferences. Add the following lines to `~/.vimrc` (create the file if it doesn't exist):

```vim
set tabstop=4 " Set the length of the tab key to four spaces (default tab length is too long)
set nu! " Enable line numbering
set viminfo='1000,<800 " Solve the issue of only being able to paste 50 lines in Vim
```

## Command Line Terminal Color and Title Configuration

You can modify the color and title of the command line terminal to make it more convenient and comfortable to use. For RHEL/CentOS, use the following command:

```bash
echo "export PS1='\[\e]0;\w\a\]\n\[\e[1;32m\][\u@\h] \[\e[33m\]\w\]\e[0m\]\n\$ '" >> ~/.bashrc
. ~/.bashrc
```

For Debian/Ubuntu, use the following command:

```bash
echo "export PS1='\[\e]0;\[\e[1;32m\]${debian_chroot:+($debian_chroot)}\u@\h: \[\e[1;33m\]\w\e[0m\n\" >> ~/.bashrc
. ~/.bashrc
```

## References

-  http://blog.csdn.net/chen198746/article/details/9342483
