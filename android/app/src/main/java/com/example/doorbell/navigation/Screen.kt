package com.example.doorbell.navigation

import com.example.doorbell.model.PhotoModel
import com.example.doorbell.utils.encodeUrl

sealed class Screen(val route: String) {
    object Onboarding : Screen("onboarding")
    object Home : Screen("home")
    object Photos : Screen("photos")
    object IndividualPhoto : Screen("photos/{name}&{timestamp}&{img_url}") {
        fun route(photo: PhotoModel) = "photos/${photo.name}&${photo.timestamp}&${encodeUrl(photo.imgSrcUrl)}"
    }
    object Videos : Screen("video")
}
