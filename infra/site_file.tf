# https://cloud.google.com/storage/docs/hosting-static-website#terraform

# Upload a simple index.html page to the bucket
resource "google_storage_bucket_object" "indexpage" {
  name         = "index.html"
  content      = "<html><body>Hello World!</body></html>"
  content_type = "text/html"
  bucket       = google_storage_bucket.static.id
}

resource "google_storage_object_access_control" "indexacl" {
  object = google_storage_bucket_object.indexpage.output_name
  bucket = google_storage_bucket.static.name
  role   = "READER"
  entity = "allUsers"
}


# Upload a simple 404 / error page to the bucket
resource "google_storage_bucket_object" "errorpage" {
  name         = "404.html"
  content      = "<html><body>404!</body></html>"
  content_type = "text/html"
  bucket       = google_storage_bucket.static.id
}


resource "google_storage_object_access_control" "errorpageacl" {
  object = google_storage_bucket_object.errorpage.output_name
  bucket = google_storage_bucket.static.name
  role   = "READER"
  entity = "allUsers"
}
