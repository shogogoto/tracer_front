
resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

resource "google_compute_global_address" "default" {
  provider = google
  name = "tracer-address"
  ip_version = "IPV4"
}

# domain_nameと合わせないとnslookupでserver failedになった
resource "google_dns_managed_zone" "prod" {
  provider         = google
  name             = replace(var.domain_name, ".", "-")
  description      = var.description
  dns_name         = "${var.domain_name}."
  visibility       = "public"
  dnssec_config {
    state = "on"
  }

  cloud_logging_config {
    enable_logging = true
  }
}

resource "google_dns_record_set" "cname1" {
  name         = "www.${var.domain_name}."
  type         = "A"
  ttl          = 300
  depends_on   = [google_storage_bucket.static]
  managed_zone = google_dns_managed_zone.prod.name
  rrdatas      = [google_compute_global_address.default.address]
}

resource "google_dns_record_set" "cname2" {
  name         = "@.${var.domain_name}."
  type         = "A"
  ttl          = 300
  depends_on   = [google_storage_bucket.static]
  managed_zone = google_dns_managed_zone.prod.name
  rrdatas      = [google_compute_global_address.default.address]
}
