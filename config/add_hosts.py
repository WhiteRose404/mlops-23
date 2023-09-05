from pathlib import Path
import sys


def add_address(lines):
    # retrieve the IP
    ip_address = sys.argv[1]
    user = sys.argv[2]
    key_path = sys.argv[3]

    for index in range(len(lines)):
        if "Host bastion" in lines[index]:
            # well check if this line inded is the hostname declaration
            # check also if the there is even a next line
            # pop the rest of the lines
            while len(lines) > index - 1:
                lines.pop();
            break;
    
    lines.append(f"Host bastion\n");
    lines.append(f"    HostName {ip_address}\n");
    lines.append(f"    User {user}\n");
    lines.append(f"    IdentityFile {key_path}\n");
    lines.append("# Don't add anything below this line\n")
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