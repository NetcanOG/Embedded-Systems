package com.example.doorbell.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavHostController
import com.example.doorbell.model.PhotoModel
import com.example.doorbell.network.api.Api
import kotlinx.coroutines.launch
import timber.log.Timber

private enum class ApiStatus { LOADING, ERROR, DONE }

class PhotosViewModel : ViewModel() {
    private val status = MutableLiveData<ApiStatus>()
    private val _photos = MutableLiveData(listOf<PhotoModel>())
    val photos: LiveData<List<PhotoModel>>
        get() = _photos

    init {
        Timber.d("init PhotosViewModel")
    }

    fun getPhotos() {
        viewModelScope.launch {
            status.value = ApiStatus.LOADING
            try {
                _photos.value = Api.service.getPhotos()
                status.value = ApiStatus.DONE
            } catch (e: Exception) {
                Timber.d(e)
                status.value = ApiStatus.ERROR
                _photos.value = listOf()
            }
        }
    }

    fun deletePhoto(
        photo: PhotoModel,
        navController: NavHostController
    ) {
        viewModelScope.launch {
            try {
                Api.service.deletePhoto(photo.name)
                val index = _photos.value?.indexOf(photo)

                if (index != null && index >= 0) {
                    _photos.value = _photos.value?.minus(photo)
                    Timber.d("DELETE")
                }

                navController.navigateUp()
            } catch (e: Exception) {
                Timber.d(e)
            }
        }
    }
}