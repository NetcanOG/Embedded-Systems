package com.example.doorbell.ui.screens.photos

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.doorbell.model.PhotoModel
import com.example.doorbell.ui.components.BackScaffold
import com.example.doorbell.ui.components.PhotoInGrid
import com.example.doorbell.viewmodel.PhotosViewModel
import com.example.doorbell.viewmodel.SwipeRefreshViewModel
import com.google.accompanist.swiperefresh.SwipeRefresh
import com.google.accompanist.swiperefresh.rememberSwipeRefreshState

@ExperimentalMaterial3Api
@Composable
fun PhotosBody(
    navController: NavHostController,
    photosViewModel: PhotosViewModel
) {
    photosViewModel.getPhotos()
    val photos: List<PhotoModel> by photosViewModel.photos.observeAsState(listOf())

    val viewModel: SwipeRefreshViewModel = viewModel()
    val isRefreshing by viewModel.isRefreshing.collectAsState()

    BackScaffold(
        title = "Photos",
        onClickBack = { navController.navigateUp() },
    ) { innerPadding ->
        SwipeRefresh(
            state = rememberSwipeRefreshState(isRefreshing),
            onRefresh = { viewModel.refresh(photosViewModel) },
        ) {
            LazyVerticalGrid(
                contentPadding = PaddingValues(
                    top = innerPadding.calculateTopPadding() + 8.dp,
                    start = 8.dp,
                    end = 8.dp,
                    bottom = 8.dp
                ),
                columns = GridCells.Adaptive(96.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                items(items = photos) { photo ->
                    PhotoInGrid(
                        photo = photo,
                        navController = navController,
                        photosViewModel = photosViewModel
                    )
                }
            }
        }

    }
}
