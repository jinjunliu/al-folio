---
layout: post
title: Example of Using Wget
date: 2015-12-27
description: This post provides examples of using Wget to download data from FTP sites.
tags:
  - Linux
  - Wget
categories: Tech
giscus_comments: true
---

## Introduction

`Wget` (short for GNU Wget) is a free software that allows you to download files using the HTTP, HTTPS, and FTP protocols. It is a non-interactive command-line tool, making it easy to invoke from scripts or terminals without requiring X-window support. For detailed information, refer to the [Wget official website](http://www.gnu.org/software/wget/wget.html). Wget is particularly useful for batch downloading data.

## Installing Wget on Linux

Most Linux distributions come with Wget pre-installed. If it's not installed, you can use the following commands to install it:

For Ubuntu/Debian:

```bash
sudo apt-get install wget
```

For CentOS/RHEL/Fedora:

```bash
sudo yum install wget
```

## Using Wget

The usage of Wget is `wget [options]... [URL]...`:

```bash
Usage: wget [OPTION]... [URL]...
```

You can use the `wget -h` command to view the available options.

## Examples of Using Wget

Downloading all files from a file list
--------------------------------------

For example, suppose you have a file list named `filelist.txt` with the following content:

```bash
ftp://example.com/1.jpg
ftp://example.com/2.jpg
ftp://example.com/3.jpg
ftp://example.com/4.jpg
......
```

To download all the files listed in this file, enter the following command in the terminal:

```bash
wget -c -N -i filelist.txt
```

This command will download all the files listed in the file list. The `-c` and `-N` options ensure that if the download is interrupted, you can resume it by running the command again.

Downloading one or multiple directories
---------------------------------------

For example, if you want to download data from the following FTP address: ftp://n5eil01u.ecs.nsidc.org/SAN/AMSA/AE\_L2A.003/, and upon opening it, you find the following directory structure:

```bash
......
2006.01.01/     13/6/28 上午12:00:00
2006.01.02/     13/6/28 上午12:00:00
2006.01.03/     13/6/28 上午12:00:00
2006.01.04/     13/6/28 上午12:00:00
2006.01.05/     13/6/28 上午12:00:00
2006.01.06/     13/6/28 上午12:00:00
2006.01.07/     13/6/28 上午12:00:00
2006.01.08/     13/6/28 上午12:00:00
2006.01.09/     13/6/28 上午12:00:00
2006.01.10/     13/6/28 上午12:00:00
2006.01.11/     13/6/28 上午12:00:00
2006.01.12/     13/6/28 上午12:00:00
......
```

To download all the files in the directories with the format "2006*" and the file format "hdf" for the year 2006, use the following command in the terminal:

```bash
wget -c -N -r -nd -np -k -L -p -A hdf ftp://n5eil01u.ecs.nsidc.org/SAN/AMSA/AE_L2A.003/2006*
```

This command will download all the files in the directories with the format "2006*" and the file format "hdf" for the year 2006, and save them in the current directory.

Here is the explanation of the options used:

|  Option | Description | 
| ------ | --------- | 
|  -c  |   Resume downloading partially downloaded files | 
| -N   |  Only download files that are newer than the local copies |
|  -r   |  Recursive download, download all files in the specified webpage directory (including subdirectories) |
|  -nd  |  Do not create a hierarchy of directories when recursively downloading, download all files to the current directory |
|  -np  |  Do not ascend to the parent directory when recursively downloading |
|  -k   |  Convert absolute links to relative links |
|  -L   |  Do not follow links to other hosts when recursively downloading |
|  -p   |  Download all files necessary to display the webpage |
|  -A   |  Specify a comma-separated list of file name suffixes to accept |

## Using Wget on Windows

To use Wget on Windows, download `wget.exe` (for 32-bit or 64-bit systems) or `wget64.exe` (for 64-bit systems) from [Wget for Windows](https://eternallybored.org/misc/wget/). Place `wget.exe` in the directory `C:\Windows\System32`. If you downloaded `wget64.exe`, rename it to `wget.exe`.

In the directory where you want to download files, hold the `Shift` key and right-click. Then select "Open command window here." This will allow you to use Wget in the Windows terminal, using the same commands as in Linux.

## References

- http://blog.csdn.net/endall/article/details/1571220
- http://blog.chinaunix.net/uid-16318340-id-2748668.html
