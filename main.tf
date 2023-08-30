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
    ami = "ami-0d95f0df8213c9a83"
    instance_type = "t2.medium"
    key_name = "paris_default"
    vpc_security_group_ids = [aws_security_group.manager_bastion.id]
    iam_instance_profile = "admin-Role"

    provisioner "local-exec" {
        command = "python3 add_hosts.py ${self.public_ip}"
    }
    tags = {
        Name = "manager_bastion"
        owner = "ysf"
    }
}