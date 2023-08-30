from pathlib import Path
import sys


def add_address(lines):
    # retrieve the IP
    ip_address = sys.argv[1]
    for index in range(len(lines)):
        if "Host mehdiCloud" in lines[index]:
            # well check if this line inded is the hostname declaration
            # check also if the there is even a next line
            lines[index + 1] = f"    HostName {ip_address}\n"
            return;
    # if the host is not found
    # lines.append("\n")
    # lines.append("Host mehdiCloud\n")
    # lines.append("    HostName
    # do nothing lol


with open(f"{Path.home()}/.ssh/config", 'r') as file:
    lines = file.readlines();

add_address(lines);

with open(f"{Path.home()}/.ssh/config", 'w') as file:
    file.writelines(lines);