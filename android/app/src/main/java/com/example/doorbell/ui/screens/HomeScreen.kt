package com.example.doorbell.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.imageResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.doorbell.R
import com.example.doorbell.navigation.Screen

@ExperimentalMaterial3Api
@Composable
fun HomeBody(
    navController: NavHostController
) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Image(
            bitmap = ImageBitmap.imageResource(R.drawable.logo),
            modifier = Modifier.weight(8f),
            contentDescription = "Doorbell Icon"
        )
        Text(
            text = "Welcome to your Home!",
            style = MaterialTheme.typography.headlineLarge,
            modifier = Modifier.weight(3f).align(Alignment.CenterHorizontally)
        )
        Row(
            modifier = Modifier.fillMaxSize().padding(bottom = 128.dp).weight(5f),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            Button(
                onClick = { navController.navigate(Screen.Photos.route) },
                shape = RoundedCornerShape(16.dp)
            ) {
                Image(
                    bitmap = ImageBitmap.imageResource(R.drawable.photos),
                    contentDescription = "Photo Gallery Button",
                    contentScale = ContentScale.Inside
                )
            }
            Button(
                onClick = { navController.navigate(Screen.Videos.route) },
                shape = RoundedCornerShape(16.dp)
            ) {
                Image(
                    bitmap = ImageBitmap.imageResource(R.drawable.video_player),
                    contentDescription = "Video Stream Button",
                    contentScale = ContentScale.Inside,
                    modifier = Modifier.padding(10.dp)
                )
            }
        }
    }
}
