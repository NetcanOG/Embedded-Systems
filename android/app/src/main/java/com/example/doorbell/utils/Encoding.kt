package com.example.doorbell.utils

import java.net.URLEncoder
import java.nio.charset.StandardCharsets

fun encodeUrl(url: String) = URLEncoder.encode(url, StandardCharsets.UTF_8.toString())