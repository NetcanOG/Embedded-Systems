package com.example.doorbell.model

import com.squareup.moshi.Json

data class PhotoModel(
    @Json(name = "name") val name: String,
    @Json(name = "timestamp") val timestamp: Long,
    @Json(name = "img_src") val imgSrcUrl: String
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as PhotoModel

        if (name != other.name) return false
        if (imgSrcUrl != other.imgSrcUrl) return false

        return true
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + imgSrcUrl.hashCode()
        return result
    }
}