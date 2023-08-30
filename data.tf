# data "aws_ami" "manager" {
#     filter {
#         name = "id"
#         values = ["ami-0d95f0df8213c9a83"]
#     }
# }

data "aws_vpc" "default" {
    default = true
}