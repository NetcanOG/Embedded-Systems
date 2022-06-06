package com.example.doorbell.navigation

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.runtime.State
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.doorbell.model.PhotoModel
import com.example.doorbell.ui.screens.HomeBody
import com.example.doorbell.ui.screens.photos.PhotosBody
import com.example.doorbell.ui.screens.VideosBody
import com.example.doorbell.ui.screens.onboarding.OnboardingPager
import com.example.doorbell.ui.screens.photos.IndividualPhoto
import com.example.doorbell.viewmodel.PhotosViewModel
import com.google.accompanist.pager.ExperimentalPagerApi

@ExperimentalPagerApi
@ExperimentalMaterial3Api
@Composable
fun SetupNavGraph(
    navController: NavHostController,
    startDestination: String,
) {
    val photosViewModel: PhotosViewModel = viewModel()
    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        composable(Screen.Onboarding.route) {
            OnboardingPager(
                navController = navController
            )
        }
        composable(Screen.Home.route) {
            HomeBody(
                navController = navController
            )
        }
        composable(Screen.Photos.route) {
            PhotosBody(
                navController = navController,
                photosViewModel = photosViewModel
            )
        }
        composable(
            Screen.IndividualPhoto.route,
            arguments = listOf(
                navArgument("name") {
                    type = NavType.StringType
                },
                navArgument("timestamp") {
                    type = NavType.LongType
                },
                navArgument("img_url") {
                    type = NavType.StringType
                }
            )
        ) { backStackEntry ->
            backStackEntry.arguments?.getString("name")?.let { name ->
                backStackEntry.arguments?.getLong("timestamp")?.let { timestamp ->
                    backStackEntry.arguments?.getString("img_url")?.let { imgUrl ->
                        IndividualPhoto(
                            photo = PhotoModel(name, timestamp, imgUrl),
                            navController = navController,
                            photosViewModel = photosViewModel
                        )
                    }
                }
            }
        }
        composable(Screen.Videos.route) {
            VideosBody(
                navController = navController
            )
        }
    }
}
