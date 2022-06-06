package com.example.doorbell.ui.screens.onboarding

import androidx.annotation.DrawableRes
import com.example.doorbell.R

enum class OnboardingPage(
    @DrawableRes
    val image: Int,
    val title: String,
    val description: String,
) {
    First(
        image = R.drawable.logo,
        title = "Doorbell Cam",
        description = "Welcome to Doorbell Cam, this app allows you to monitor your doorbell camera"
    ),
    Second(
        image = R.drawable.notifications,
        title = "Notifications",
        description = "You'll be notified if anyone rings your bell or any motion is detected at the door"
    ),
    Third(
        image = R.drawable.photos,
        title = "Photos",
        description = "You can access a gallery with photos taken at your door when motion is detected"
    ),
    Fourth(
        image = R.drawable.videos,
        title = "Video Feed",
        description = "You can get a video feed of your doorbell camera at any time"
    );

    companion object {
        fun all() = listOf(
            First,
            Second,
            Third,
            Fourth
        )
    }
}