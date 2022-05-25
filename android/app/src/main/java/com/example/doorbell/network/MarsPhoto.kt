package com.example.doorbell.network

import com.squareup.moshi.Json

data class MarsPhoto(
    // used to map img_src from the JSON to imgSrcUrl in our class
    @Json(name = "img_src") val imgSrcUrl: String
)