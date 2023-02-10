# https://cloud.google.com/storage/docs/hosting-static-website#terraform

# Create new storage bucket in the US multi-region
# with coldline storage and settings for main_page_suffix and not_found_page
resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "google_storage_bucket" "static" {
  name          = "${random_id.bucket_prefix.hex}-static-website-bucket"
  location      = "asia-northeast1"
  storage_class = "STANDARD"
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
