resource "aws_db_proxy" "rds_proxy" {
  name                   = "rds-proxy"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 1800
  require_tls            = true
  role_arn               = aws_iam_role.rds_proxy.arn
  vpc_security_group_ids = ["sg-01a74b78d530cd862"]
  vpc_subnet_ids         = ["subnet-01459f2806e7d9f24", "subnet-080509807e667e94e", "subnet-06c8a77208840d3c6"]

  auth {
    auth_scheme = "SECRETS"
    description = "example"
    iam_auth    = "DISABLED"
    secret_arn  = aws_secretsmanager_secret.rds_proxy.arn
  }
}