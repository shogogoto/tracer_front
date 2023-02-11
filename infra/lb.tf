
resource "google_compute_backend_bucket" "static" {
  provider = google
  name = "static-web"
  description = var.description
  bucket_name = google_storage_bucket.static.name
  enable_cdn  = true
}

# --------------------------------
# http
# --------------------------------
resource "google_compute_url_map" "http" {
  provider        = google
  name            = "http-lb"
  description     = var.description
  default_service = google_compute_backend_bucket.static.id
}


resource "google_compute_target_http_proxy" "default" {
  provider    = google-beta
  name        = "http-proxy"
  description = var.description
  url_map     = google_compute_url_map.http.id
}

resource "google_compute_global_forwarding_rule" "http" {
  provider              = google
  name                  = "http-rule"
  target                = google_compute_target_http_proxy.default.id
  port_range            = "80"
  ip_protocol           = "TCP"
  ip_address            = google_compute_global_address.default.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
}


# --------------------------------
# https
# --------------------------------
# resource "google_compute_url_map" "https" {
#   provider        = google
#   name            = "https-lb"
#   description     = var.description
#   default_service = google_compute_backend_bucket.static.id
# }

# resource "google_compute_managed_ssl_certificate" "default" {
#   provider = google-beta
#   name = "static-web-cert"
#   description = var.description
#   managed {
#     domains = ["www.${var.domain_name}"]
#   }
# }

# resource "google_compute_target_https_proxy" "default" {
#   provider         = google
#   description      = var.description
#   name             = "https-proxy"
#   url_map          = google_compute_url_map.https.id
#   ssl_certificates = [google_compute_managed_ssl_certificate.default.name]
#   depends_on       = [google_compute_managed_ssl_certificate.default]
# }

# resource "google_compute_global_forwarding_rule" "default" {
#   provider              = google
#   name                  = "https-rule"
#   target                = google_compute_target_https_proxy.default.id
#   port_range            = "443"
#   ip_protocol           = "TCP"
#   ip_address            = google_compute_global_address.default.address
#   load_balancing_scheme = "EXTERNAL_MANAGED"
# }
