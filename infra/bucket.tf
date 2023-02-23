resource "google_storage_bucket" "static" {
  name          = "react-app-shogogoto"
  location      = "asia-northeast1"
  storage_class = "STANDARD"
  force_destroy = true
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# Make bucket public by granting allUsers READER access
resource "google_storage_bucket_access_control" "public_rule" {
  bucket = google_storage_bucket.static.id
  role   = "READER"
  entity = "allUsers"
}
