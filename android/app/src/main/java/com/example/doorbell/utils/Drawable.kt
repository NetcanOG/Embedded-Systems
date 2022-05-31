package com.example.doorbell.utils

import android.content.Context
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap
import androidx.core.content.ContextCompat
import androidx.core.graphics.drawable.toBitmap

fun getBitmapFromVectorDrawable(context: Context, drawableId: Int): ImageBitmap =
    ContextCompat.getDrawable(context, drawableId)!!.let {
        it.toBitmap().asImageBitmap()
    }
