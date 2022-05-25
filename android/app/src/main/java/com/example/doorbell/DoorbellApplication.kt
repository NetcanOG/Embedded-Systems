package com.example.doorbell

import android.app.Application
import timber.log.Timber

class DoorbellApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        Timber.plant(Timber.DebugTree())
    }
}