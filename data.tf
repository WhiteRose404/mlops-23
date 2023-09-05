data "aws_ami" "manager" {
    most_recent = true
    filter {
        name = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
    }
}

data "aws_vpc" "default" {
    default = true
}