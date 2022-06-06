package com.example.doorbell.network.api

import com.example.doorbell.model.PhotoModel
import com.example.doorbell.network.api.Constants.BASE_URL
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(RequestInterceptor())
        .build()

private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()

private val retrofit = Retrofit.Builder()
    .client(okHttpClient)
    .addConverterFactory(MoshiConverterFactory.create(moshi))
    .baseUrl(BASE_URL)
    .build()

interface DoorbellService {
    @GET("photos")
    suspend fun getPhotos(): MutableList<PhotoModel>

    @DELETE("photos/{name}")
    suspend fun deletePhoto(@Path("name") name: String)

    @POST("startCapture")
    suspend fun startVideo()

    @POST("stopCapture")
    suspend fun stopVideo()
}

object Api {
    val service: DoorbellService by lazy { retrofit.create(DoorbellService::class.java) }
}
