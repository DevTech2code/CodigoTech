import 'package:codigotech/controllers/auth_controller.dart';
import 'package:codigotech/controllers/lookup_controller.dart';
import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/network/api_client.dart';
import 'package:codigotech/repositories/assets_repository.dart';
import 'package:codigotech/repositories/auth_repository.dart';
import 'package:codigotech/services/assets_remote_service.dart';
import 'package:codigotech/services/auth_remote_service.dart';
import 'package:codigotech/services/contacts_sheet_service.dart';
import 'package:codigotech/views/login_page.dart';
import 'package:codigotech/views/lookup_page.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final prefs = await SharedPreferences.getInstance();
  final apiClient = ApiClient(baseUrl: ApiConstants.baseUrl);

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

  @override
  void initState() {
    super.initState();

    _authController = AuthController(repository: widget.authRepository);
    _lookupController = LookupController(repository: widget.assetsRepository);
    _authController.initialize();
  }

  @override
  void dispose() {
    _authController.dispose();
    _lookupController.dispose();
    widget.apiClient.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CodigoTech',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0E5D63)),
        useMaterial3: true,
      ),
      home: AnimatedBuilder(
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
      ),
    );
  }
}
