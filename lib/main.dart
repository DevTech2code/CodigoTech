import 'dart:async';

import 'package:codigotech/controllers/auth_controller.dart';
import 'package:codigotech/controllers/lookup_controller.dart';
import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/network/api_client.dart';
import 'package:codigotech/repositories/assets_repository.dart';
import 'package:codigotech/repositories/auth_repository.dart';
import 'package:codigotech/services/assets_remote_service.dart';
import 'package:codigotech/services/auth_remote_service.dart';
import 'package:codigotech/services/contacts_sheet_service.dart';
import 'package:codigotech/services/update_checker_service.dart';
import 'package:codigotech/views/intro_video_splash_page.dart';
import 'package:codigotech/views/login_page.dart';
import 'package:codigotech/views/lookup_page.dart';
import 'package:codigotech/views/widgets/update_available_dialog.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final prefs = await SharedPreferences.getInstance();
  final apiClient = ApiClient(baseUrl: ApiConstants.baseUrl);
  unawaited(apiClient.warmUp());

  final authRepository = AuthRepositoryImpl(
    remoteService: AuthRemoteServiceImpl(apiClient: apiClient),
    prefs: prefs,
  );

  final assetsRepository = AssetsRepositoryImpl(
    remoteService: AssetsRemoteServiceImpl(apiClient: apiClient),
    contactsSheetService: GoogleSheetsContactsService(),
  );

  runApp(
    CodigoTechApp(
      apiClient: apiClient,
      authRepository: authRepository,
      assetsRepository: assetsRepository,
    ),
  );
}

class CodigoTechApp extends StatefulWidget {
  const CodigoTechApp({
    super.key,
    required this.apiClient,
    required this.authRepository,
    required this.assetsRepository,
  });

  final ApiClient apiClient;
  final AuthRepository authRepository;
  final AssetsRepository assetsRepository;

  @override
  State<CodigoTechApp> createState() => _CodigoTechAppState();
}

class _CodigoTechAppState extends State<CodigoTechApp> {
  late final AuthController _authController;
  late final LookupController _lookupController;
  final GlobalKey<NavigatorState> _navigatorKey = GlobalKey<NavigatorState>();

  static const String _introVideoAssetPath =
      'assets/Animación_de_Logo_Tecnológico.mp4';
  bool _introCompleted = false;
  bool _hasCheckedForUpdates = false;

  @override
  void initState() {
    super.initState();

    _authController = AuthController(repository: widget.authRepository);
    _lookupController = LookupController(repository: widget.assetsRepository);
    _authController.initialize();

    if (!_showVideoSplashOnPlatform) {
      _scheduleUpdateCheck();
    }
  }

  @override
  void dispose() {
    _authController.dispose();
    _lookupController.dispose();
    widget.apiClient.dispose();
    super.dispose();
  }

  bool get _showVideoSplashOnPlatform {
    if (kIsWeb) {
      return false;
    }

    return defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS;
  }

  void _completeIntro() {
    if (!mounted || _introCompleted) {
      return;
    }

    setState(() {
      _introCompleted = true;
    });

    _scheduleUpdateCheck();
  }

  void _scheduleUpdateCheck() {
    if (_hasCheckedForUpdates) {
      return;
    }

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || _hasCheckedForUpdates) {
        return;
      }

      _checkForUpdates();
    });
  }

  Future<void> _checkForUpdates() async {
    _hasCheckedForUpdates = true;

    try {
      final updateChecker = GitHubUpdateCheckerService();
      final updateInfo = await updateChecker.checkForUpdate();

      if (!mounted || !updateInfo.hasUpdate) {
        return;
      }

      final context = _navigatorKey.currentContext;
      if (context == null || !context.mounted) {
        return;
      }

      await showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (_) => UpdateAvailableDialog(
          latestVersion: updateInfo.latestVersion,
          currentVersion: updateInfo.currentVersion,
          downloadUrl: updateInfo.downloadUrl,
          changelog: updateInfo.changelog,
        ),
      );
    } catch (_) {
      // Silently fail if update check fails
    }
  }

  Widget _buildAppHome() {
    return AnimatedBuilder(
      animation: _authController,
      builder: (context, _) {
        if (_authController.isBootstrapping) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (_authController.isAuthenticated) {
          return LookupPage(
            authController: _authController,
            lookupController: _lookupController,
          );
        }

        return LoginPage(controller: _authController);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final showIntro = _showVideoSplashOnPlatform && !_introCompleted;

    return MaterialApp(
      navigatorKey: _navigatorKey,
      title: 'CodigoTech',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0E5D63)),
        useMaterial3: true,
      ),
      home: showIntro
          ? IntroVideoSplashPage(
              assetPath: _introVideoAssetPath,
              playDuration: const Duration(seconds: 4),
              onFinished: _completeIntro,
            )
          : _buildAppHome(),
    );
  }
}
