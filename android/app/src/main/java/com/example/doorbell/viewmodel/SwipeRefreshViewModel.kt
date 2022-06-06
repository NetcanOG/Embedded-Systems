package com.example.doorbell.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class SwipeRefreshViewModel : ViewModel() {
    private val _isRefreshing = MutableStateFlow(false)

    val isRefreshing: StateFlow<Boolean>
        get() = _isRefreshing.asStateFlow()

    fun refresh(photosViewModel: PhotosViewModel) {
        viewModelScope.launch {
            _isRefreshing.emit(true)
            photosViewModel.getPhotos()
            _isRefreshing.emit(false)
        }
    }
}