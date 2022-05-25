package com.example.doorbell.video

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.doorbell.R
import com.example.doorbell.databinding.FragmentVideoStreamBinding
import timber.log.Timber

class VideoStreamFragment : Fragment() {
    private lateinit var viewModel: VideoViewModel
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = DataBindingUtil.inflate<FragmentVideoStreamBinding>(
            inflater,
            R.layout.fragment_video_stream, container, false
        )

        Timber.i("Called ViewModelProvider.get")
        viewModel = ViewModelProvider(this)[VideoViewModel::class.java]

        return binding.root
    }
}