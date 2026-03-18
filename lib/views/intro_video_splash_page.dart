import 'dart:async';

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class IntroVideoSplashPage extends StatefulWidget {
  const IntroVideoSplashPage({
    super.key,
    required this.assetPath,
    required this.onFinished,
    this.playDuration = const Duration(seconds: 4),
  });

  final String assetPath;
  final VoidCallback onFinished;
  final Duration playDuration;

  @override
  State<IntroVideoSplashPage> createState() => _IntroVideoSplashPageState();
}

class _IntroVideoSplashPageState extends State<IntroVideoSplashPage> {
  late final VideoPlayerController _controller;
  Timer? _finishTimer;
  bool _isVideoReady = false;
  bool _hasFinished = false;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset(widget.assetPath);
    _initializeVideo();
    _finishTimer = Timer(widget.playDuration, _finish);
  }

  Future<void> _initializeVideo() async {
    try {
      await _controller.initialize();
      await _controller.setLooping(true);
      await _controller.setVolume(25);
      
      if (!mounted) {
        return;
      }
      
      await _controller.play();

      if (!mounted) {
        return;
      }

      setState(() {
        _isVideoReady = true;
      });
    } catch (error) {
      debugPrint('IntroVideoSplashPage error: $error');
      if (!mounted) {
        return;
      }

      setState(() {
        _isVideoReady = false;
      });
    }
  }

  void _finish() {
    if (_hasFinished) {
      return;
    }

    _hasFinished = true;
    widget.onFinished();
  }

  @override
  void dispose() {
    _finishTimer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          const DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF081423), Color(0xFF112C46)],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),
          if (_isVideoReady && _controller.value.isInitialized)
            Center(
              child: AspectRatio(
                aspectRatio: _controller.value.aspectRatio,
                child: VideoPlayer(_controller),
              ),
            )
          else
            const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.white54),
              ),
            ),
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0x00000000), Color(0x66000000)],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),
          SafeArea(
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 56,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.45),
                        borderRadius: BorderRadius.circular(999),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'CodigoTech',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.3,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
