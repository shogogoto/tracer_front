resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github-pool"
}

resource "google_iam_workload_identity_pool_provider" "example" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  attribute_mapping                  = {
    "google.subject" = "assertion.sub"
  }
  oidc {
    issuer_uri        = "https://sts.windows.net/azure-tenant-id"
  }
}
