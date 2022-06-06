package com.example.doorbell.ui.screens.photos

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.doorbell.model.PhotoModel
import com.example.doorbell.ui.components.BackScaffold
import com.example.doorbell.ui.components.Photo
import com.example.doorbell.viewmodel.PhotosViewModel
import kotlinx.datetime.Instant
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

@Composable
fun IndividualPhoto(
    photo: PhotoModel,
    navController: NavHostController,
    photosViewModel: PhotosViewModel
) {
    BackScaffold(
        title = photo.name,
        onClickBack = { navController.navigateUp() }
    ) {
        Column(
            modifier = Modifier.background(Color.DarkGray)
        ) {
            Photo(
                photo = photo,
                modifier = Modifier.weight(10f),
                contentScale = ContentScale.FillWidth
            )
            Surface(
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text(
                        text = Instant.fromEpochMilliseconds(photo.timestamp).toLocalDateTime(TimeZone.UTC).toString(),
                        fontSize = MaterialTheme.typography.labelLarge.fontSize
                    )
                    Button(
                        onClick = { photosViewModel.deletePhoto(photo, navController) },
                        modifier = Modifier.padding(start = 128.dp, end = 16.dp)
                    ) {
                        Text(
                            text = "Delete"
                        )
                    }
                }
            }

        }
    }
}
