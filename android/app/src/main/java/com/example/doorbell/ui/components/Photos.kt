package com.example.doorbell.ui.components

import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.doorbell.R
import com.example.doorbell.model.PhotoModel
import com.example.doorbell.navigation.Screen
import com.example.doorbell.utils.getBitmapFromVectorDrawable
import com.example.doorbell.viewmodel.PhotosViewModel
import com.skydoves.landscapist.coil.CoilImage
import timber.log.Timber

@ExperimentalMaterial3Api
@Composable
fun PhotoInGrid(
    photo: PhotoModel,
    navController: NavHostController,
    photosViewModel: PhotosViewModel = viewModel()
) {
    Card(
        onClick = {
            navController.navigate(Screen.IndividualPhoto.route(photo))
        }
    ) {
        Photo(
            photo = photo,
            modifier = Modifier,
            contentScale = ContentScale.Fit
        )
    }
}

@Composable
fun Photo(
    photo: PhotoModel,
    modifier: Modifier,
    contentScale: ContentScale
) {
    CoilImage(
        imageModel = photo.imgSrcUrl,
        // Crop, Fit, Inside, FillHeight, FillWidth, None
        contentScale = contentScale,
        // shows a placeholder while loading the image.
        placeHolder = getBitmapFromVectorDrawable(
            LocalContext.current,
            R.drawable.broken_image
        ),
        // shows an error ImageBitmap when the request failed.
        error = getBitmapFromVectorDrawable(
            LocalContext.current,
            R.drawable.broken_image
        ),
        modifier = modifier
    )
}