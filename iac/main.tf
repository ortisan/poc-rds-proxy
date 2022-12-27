provider "aws" {
  region = "us-east-1"
}

module "cluster" {
  source         = "terraform-aws-modules/rds-aurora/aws"
  name           = "aurora-cluster"
  engine         = "aurora-postgresql"
  engine_version = "14.5"
  instance_class = "db.t3.medium"
  instances = {
    one = {}
  }

  vpc_id  = "vpc-08ccd18714a2e8437"
  subnets = ["subnet-01459f2806e7d9f24", "subnet-080509807e667e94e", "subnet-06c8a77208840d3c6"]

  allowed_security_groups = ["sg-01a74b78d530cd862"]
  allowed_cidr_blocks     = ["172.31.0.0/16"]

  storage_encrypted   = true
  apply_immediately   = true
  monitoring_interval = 10

  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

output "rds_database_name" {
  value = module.cluster.cluster_database_name
}

output "rds_cluster_endpoint" {
  value = module.cluster.cluster_endpoint
}

output "rds_cluster_cluster_port" {
  value = module.cluster.cluster_port
}