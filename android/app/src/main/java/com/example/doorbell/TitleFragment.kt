package com.example.doorbell

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import com.example.doorbell.R
import com.example.doorbell.databinding.FragmentTitleBinding

class TitleFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = DataBindingUtil.inflate<FragmentTitleBinding>(
            inflater,
            R.layout.fragment_title, container, false
        )

        binding.buttonImages.setOnClickListener { view : View ->
            view.findNavController().navigate(R.id.action_titleFragment_to_imageGalleryFragment)
        }

        binding.buttonVideo.setOnClickListener {view : View ->
            view.findNavController().navigate(R.id.action_titleFragment_to_videoStreamFragment)
        }

        return binding.root
    }
}
