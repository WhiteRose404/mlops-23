provider "aws"{
    region = "eu-west-3"
}

resource "aws_security_group" "manager_bastion" {
    name = "manager_bastion"
    description = "Allow SSH inbound traffic"
    vpc_id = data.aws_vpc.default.id
    dynamic "ingress" {
        for_each = var.ports
        content {
            from_port = ingress.value
            to_port = ingress.value
            protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
        }
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "manager_bastion"
        owner = "ysf"
    }
}


resource "aws_instance" "manager_bastion" {
    # ami = data.aws_ami.manager.id
    ami = "ami-09da1b080297bcf34"
    # ami = "ami-05f59b7886887cd3f" # already has the config files
    instance_type = "t2.medium"
    key_name = "outside_use"
    vpc_security_group_ids = [aws_security_group.manager_bastion.id]
    iam_instance_profile = "admin-Role"

    provisioner "local-exec" {
        command = "echo '${templatefile("templates/hosts.yaml", { ip = self.public_ip, user= var.user, key_path= var.key_path } )}' > inventory/hosts.yaml && python3 config/add_hosts.py ${self.public_ip} ${var.user} ${var.key_path}"
    }
    tags = {
        Name = "manager_bastion"
        owner = "ysf"
    }
}