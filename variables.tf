variable "ports" {
    type = list(number)
    default = [22, 80, 443, 8080, 9000]
}

variable "user" {
    type = string
    default = "ubuntu"
}

variable "key_path" {
    type = string
}