# What is Docker and What is Docker NOT

Docker is a containerization tool used to isolate applications in a time and resource efficient way.

In practice, Docker is similar to a virtual machine, but underneath it is completely different.

Docker is used to build, share and run containers. Often other tools are used for container orchestration (scaling/restarting/etc).

## Comparing Options to Isolate apps

![physical server vs. vm vs. containers](./images/vm-vs-container.svg)

### Physical Servers

At the end of the day, everything is running on physical hardware. But setting up a physical server for each application is not an efficient way to isolate apps. Setting up a new server is a costly, manual process that can take days or weeks depending on org structure and priority.

- ❌ Hardware can cost hundreds or thousands of dollars
- ❌ Takes a lot of time to acquire/configure a new server (days or weeks)
- ❌ Setting up a new physical server is a very manual process

### Virtual Machines

A VM is a full on operating system running on the virtualized hardware of the physical server. A hypervisor is used to virtualize the physical hardware. Virtual machines have a full on copy of the operating system. Starting up a VM can take minutes.

- ⚠ Can run multiple VM's on a single physical server
- ❌ Each VM requires its own copy of the OS (GBs)
- ⚠ Startup time takes minutes

### Containers

Containers...

- ✅ Can run multiple containers on a single OS
- ✅ Containers share the host machines kernel and libraries (read only) which makes the container itself small (MBs)
- ✅ Startup time takes seconds

# Why would I use docker
